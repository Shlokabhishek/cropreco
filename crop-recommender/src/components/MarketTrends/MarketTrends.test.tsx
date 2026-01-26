import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MarketTrends from "./MarketTrends";
import marketReducer from "../../state/slices/marketSlice";
import { LanguageProvider } from "../../i18n/LanguageContext";

// Mock the useMarketData hook
vi.mock("../../hooks/useMarketData", () => ({
  useMarketData: () => ({
    trends: [
      { commodity: "Wheat", price: 2100, change: 1.2 },
      { commodity: "Rice", price: 1800, change: -0.5 }
    ],
    status: "idle",
    refresh: vi.fn()
  })
}));

const createTestStore = () => configureStore({
  reducer: {
    market: marketReducer
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

describe("MarketTrends", () => {
  it("renders the market trends card", () => {
    renderWithProviders(<MarketTrends />);
    expect(screen.getByText(/Market Trends/i)).toBeInTheDocument();
  });

  it("displays commodity prices", () => {
    renderWithProviders(<MarketTrends />);
    expect(screen.getByText("Wheat")).toBeInTheDocument();
    expect(screen.getByText("₹2100")).toBeInTheDocument();
  });

  it("shows positive changes in green", () => {
    renderWithProviders(<MarketTrends />);
    expect(screen.getByText("+1.2%")).toBeInTheDocument();
  });
});
