import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import WeatherTrends from "./WeatherTrends";
import weatherReducer from "../../state/slices/weatherSlice";
import userReducer from "../../state/slices/userSlice";
import { LanguageProvider } from "../../i18n/LanguageContext";

// Mock the useWeatherData hook
vi.mock("../../hooks/useWeatherData", () => ({
  useWeatherData: () => ({
    forecast: [
      { day: "Mon", temperatureC: 25, condition: "Sunny" },
      { day: "Tue", temperatureC: 28, condition: "Cloudy" }
    ],
    status: "idle",
    refresh: vi.fn(),
    location: "Bangalore"
  })
}));

const createTestStore = () => configureStore({
  reducer: {
    weather: weatherReducer,
    user: userReducer
  }
});

const renderWithProviders = (component: React.ReactNode) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <LanguageProvider>
        {component}
      </LanguageProvider>
    </Provider>
  );
};

describe("WeatherTrends", () => {
  it("renders the weather card", () => {
    renderWithProviders(<WeatherTrends />);
    expect(screen.getByText(/Live Weather Trends/i)).toBeInTheDocument();
  });

  it("displays location", () => {
    renderWithProviders(<WeatherTrends />);
    expect(screen.getByText("Bangalore")).toBeInTheDocument();
  });

  it("shows forecast days", () => {
    renderWithProviders(<WeatherTrends />);
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("25°C")).toBeInTheDocument();
  });
});
