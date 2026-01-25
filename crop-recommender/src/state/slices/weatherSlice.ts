import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Forecast = {
	day: string;
	temperatureC: number;
	condition: string;
};

type WeatherState = {
	forecast: Forecast[];
	status: "idle" | "loading" | "failed";
};

const initialState: WeatherState = {
	forecast: [],
	status: "idle"
};

const weatherSlice = createSlice({
	name: "weather",
	initialState,
	reducers: {
		setForecast(state, action: PayloadAction<Forecast[]>) {
			state.forecast = action.payload;
		},
		setWeatherStatus(state, action: PayloadAction<WeatherState["status"]>) {
			state.status = action.payload;
		},
		clearForecast(state) {
			state.forecast = [];
			state.status = "idle";
		}
	}
});

export const { setForecast, setWeatherStatus, clearForecast } = weatherSlice.actions;
export default weatherSlice.reducer;
