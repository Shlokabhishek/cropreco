import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CropRecommendation = {
	name: string;
	yield: number;
	estimatedRevenue: number;
	estimatedCost: number;
	profit: number;
	fertilizerCost: number;
	pesticideCost: number;
	laborCost: number;
	seedCost: number;
	score: number;
	season?: string;
	livePrice?: number;
	priceSource?: string;
};

export type CropState = {
	recommendations: CropRecommendation[];
	status: "idle" | "loading" | "failed";
	lastUpdated?: string;
};

const initialState: CropState = {
	recommendations: [],
	status: "idle",
	lastUpdated: undefined
};

const cropSlice = createSlice({
	name: "crop",
	initialState,
	reducers: {
		setRecommendations(state, action: PayloadAction<CropRecommendation[]>) {
			state.recommendations = action.payload;
			state.lastUpdated = new Date().toISOString();
		},
		setCropStatus(state, action: PayloadAction<CropState["status"]>) {
			state.status = action.payload;
		},
		clearRecommendations(state) {
			state.recommendations = [];
			state.lastUpdated = undefined;
			state.status = "idle";
		}
	}
});

export const { setRecommendations, setCropStatus, clearRecommendations } = cropSlice.actions;
export default cropSlice.reducer;
