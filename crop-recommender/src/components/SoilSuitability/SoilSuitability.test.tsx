import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SoilSuitability from "./SoilSuitability";
import { LanguageProvider } from "../../i18n/LanguageContext";

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe("SoilSuitability", () => {
  it("renders the soil suitability card", () => {
    renderWithProviders(<SoilSuitability />);
    expect(screen.getByText(/Soil Suitability/i)).toBeInTheDocument();
  });

  it("shows placeholder message", () => {
    renderWithProviders(<SoilSuitability />);
    expect(screen.getByText(/Soil analysis coming soon/i)).toBeInTheDocument();
  });
});
