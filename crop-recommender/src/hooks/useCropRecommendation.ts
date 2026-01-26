import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { setCropStatus, setRecommendations } from "../state/slices/cropSlice";
import { parseCSVData, recommendCrops, fetchLiveMarketPrices, recommendFarmingType, identifyCropsToAvoid, CropToAvoid } from "../services/recommender";

export const useCropRecommendation = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { recommendations, status } = useSelector((state: RootState) => state.crop);
	const profile = useSelector((state: RootState) => state.user.profile);
	const hasInitializedRef = useRef(false);
	const [cropsToAvoid, setCropsToAvoid] = useState<CropToAvoid[]>([]);

	// Get farming type recommendations based on profile
	const farmingTypes = recommendFarmingType({
		state: profile.state,
		acreage: profile.acreage,
		soilType: profile.soilType,
		budget: profile.budget,
		season: profile.season
	});

	const refresh = useCallback(async () => {
		dispatch(setCropStatus("loading"));
		try {
			// Fetch the CSV data from public folder
			const response = await fetch('/data/crop_dataset.csv');
			if (!response.ok) {
				throw new Error(`Failed to fetch CSV file: ${response.status}`);
			}
			
			const csvText = await response.text();
			console.log("CSV loaded, size:", csvText.length);
			
			// Parse CSV data
			const cropData = parseCSVData(csvText);
			console.log("Parsed crops:", cropData.length);
			
			if (cropData.length === 0) {
				console.error("No crop data parsed from CSV");
				dispatch(setCropStatus("failed"));
				return;
			}
			
			// Get unique crop names for live price fetching
			const uniqueCrops = [...new Set(cropData.map(c => c.crop))];
			console.log("Unique crops:", uniqueCrops.length);
			
			// Fetch live market prices in parallel
			let livePrices: Record<string, { price: number; source: string }> = {};
			try {
				livePrices = await fetchLiveMarketPrices(uniqueCrops);
				console.log("Live prices fetched:", Object.keys(livePrices).length);
			} catch (priceError) {
				console.log("Live price fetch failed, using fallback prices");
			}
			
			const profileData = {
				state: profile.state,
				acreage: profile.acreage,
				soilType: profile.soilType,
				budget: profile.budget,
				season: profile.season,
				multipleCrops: profile.multipleCrops
			};
			
			// Get recommendations with live prices
			const recommended = recommendCrops(cropData, profileData, livePrices);
			
			console.log("Recommendations generated:", recommended.length);
			
			if (recommended.length === 0) {
				console.error("No recommendations generated after all fallbacks");
			}
			
			// Identify crops to avoid
			const avoidCrops = identifyCropsToAvoid(cropData, profileData, livePrices, recommended);
			console.log("Crops to avoid identified:", avoidCrops.length);
			setCropsToAvoid(avoidCrops);
			
			dispatch(setRecommendations(recommended));
			dispatch(setCropStatus("idle"));
		} catch (error) {
			console.error("Failed to load crop recommendations:", error, error instanceof Error ? error.stack : "");
			dispatch(setCropStatus("failed"));
		}
	}, [dispatch, profile]);

	// Initial load - run once when component mounts
	useEffect(() => {
		if (!hasInitializedRef.current) {
			hasInitializedRef.current = true;
			console.log("Initial recommendations fetch triggered");
			refresh();
		}
	}, [refresh]);

	// Re-fetch when profile changes
	useEffect(() => {
		if (hasInitializedRef.current && recommendations.length === 0 && status === "idle") {
			console.log("Re-fetching recommendations due to profile change");
			refresh();
		}
	}, [profile.state, profile.season, profile.acreage, profile.budget, recommendations.length, status, refresh]);

	return { recommendations, status, refresh, farmingTypes, cropsToAvoid };
};

export default useCropRecommendation;
