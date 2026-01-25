import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MarketTrend = {
	commodity: string;
	price: number;
	change: number;
};

type MarketState = {
	trends: MarketTrend[];
	status: "idle" | "loading" | "failed";
};

const initialState: MarketState = {
	trends: [],
	status: "idle"
};

const marketSlice = createSlice({
	name: "market",
	initialState,
	reducers: {
		setTrends(state, action: PayloadAction<MarketTrend[]>) {
			state.trends = action.payload;
		},
		setMarketStatus(state, action: PayloadAction<MarketState["status"]>) {
			state.status = action.payload;
		},
		clearTrends(state) {
			state.trends = [];
			state.status = "idle";
		}
	}
});

export const { setTrends, setMarketStatus, clearTrends } = marketSlice.actions;
export default marketSlice.reducer;
