import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CropRecommendations from "./CropRecommendations";
import cropReducer from "../../state/slices/cropSlice";
import userReducer from "../../state/slices/userSlice";
import { LanguageProvider } from "../../i18n/LanguageContext";

// Mock the useCropRecommendation hook
vi.mock("../../hooks/useCropRecommendation", () => ({
  useCropRecommendation: () => ({
    recommendations: [],
    status: "idle",
    refresh: vi.fn(),
    farmingTypes: []
  })
}));

const createTestStore = () => configureStore({
  reducer: {
    crop: cropReducer,
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

describe("CropRecommendations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with title", () => {
    renderWithProviders(<CropRecommendations />);
    expect(screen.getByText(/Recommended Crops/i)).toBeInTheDocument();
  });

  it("renders refresh button", () => {
    renderWithProviders(<CropRecommendations />);
    expect(screen.getByRole("button", { name: /Refresh Prices/i })).toBeInTheDocument();
  });
});
