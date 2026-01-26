import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import FarmerProfile from "./FarmerProfile";
import userReducer from "../../state/slices/userSlice";
import cropReducer from "../../state/slices/cropSlice";
import { LanguageProvider } from "../../i18n/LanguageContext";

const createTestStore = () => configureStore({
  reducer: {
    user: userReducer,
    crop: cropReducer
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

describe("FarmerProfile", () => {
  it("renders the profile form", () => {
    renderWithProviders(<FarmerProfile />);
    expect(screen.getByText(/Farmer Profile/i)).toBeInTheDocument();
  });

  it("has location input", () => {
    renderWithProviders(<FarmerProfile />);
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
  });

  it("has state selector", () => {
    renderWithProviders(<FarmerProfile />);
    expect(screen.getByText(/State/i)).toBeInTheDocument();
  });

  it("has budget input", () => {
    renderWithProviders(<FarmerProfile />);
    expect(screen.getByText(/Budget/i)).toBeInTheDocument();
  });
});
