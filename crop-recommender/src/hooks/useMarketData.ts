import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { setMarketStatus, setTrends } from "../state/slices/marketSlice";

const mockTrends = [
	{ commodity: "Wheat", price: 2100, change: 1.2 },
	{ commodity: "Corn", price: 1750, change: -0.4 },
	{ commodity: "Soybean", price: 2400, change: 0.9 }
];

export const useMarketData = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { trends, status } = useSelector((state: RootState) => state.market);

	const refresh = useCallback(() => {
		dispatch(setMarketStatus("loading"));
		setTimeout(() => {
			dispatch(setTrends(mockTrends));
			dispatch(setMarketStatus("idle"));
		}, 200);
	}, [dispatch]);

	useEffect(() => {
		if (trends.length === 0 && status !== "loading") {
			refresh();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { trends, status, refresh };
};

export default useMarketData;
