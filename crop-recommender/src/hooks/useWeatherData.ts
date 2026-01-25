import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { setForecast, setWeatherStatus } from "../state/slices/weatherSlice";
import { fetchLiveWeather } from "../services/weather";

export const useWeatherData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { forecast, status } = useSelector((state: RootState) => state.weather);
  const location = useSelector((state: RootState) => state.user.profile.location);

  const refresh = useCallback(async () => {
    if (!location) {
      dispatch(setForecast([]));
      return;
    }

    dispatch(setWeatherStatus("loading"));
    try {
      const weatherData = await fetchLiveWeather(location);
      if (weatherData) {
        dispatch(setForecast(weatherData));
        dispatch(setWeatherStatus("idle"));
      } else {
        dispatch(setWeatherStatus("failed"));
      }
    } catch (error) {
      console.error("Weather fetch error:", error);
      dispatch(setWeatherStatus("failed"));
    }
  }, [dispatch, location]);

  useEffect(() => {
    if (location) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return { forecast, status, refresh, location };
};

export default useWeatherData;