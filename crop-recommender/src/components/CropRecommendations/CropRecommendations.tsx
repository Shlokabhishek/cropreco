import { useState } from "react";
import { useCropRecommendation } from "../../hooks/useCropRecommendation";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Card from "../shared/Card";
import Button from "../shared/Button";
import "./CropRecommendations.css";

const CropRecommendations = () => {
  const { recommendations, status, refresh, farmingTypes } = useCropRecommendation();
  const profile = useSelector((state: RootState) => state.user.profile);
  const [activeTab, setActiveTab] = useState<"crops" | "farming">("crops");
  
  console.log("CropRecommendations render:", { 
    status, 
    count: recommendations.length,
    profile: { state: profile.state, acreage: profile.acreage, budget: profile.budget }
  });

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleRefresh = () => {
    console.log("Manual refresh triggered");
    refresh();
  };

  return (
    <Card title="🌾 Recommended Crops">
      <div className="crop__header">
        <p className="crop__subtitle">
          Based on {profile.state}, {profile.acreage} acres, ₹{profile.budget.toLocaleString('en-IN')} budget
          {profile.multipleCrops && <span className="crop__subtitle-badge"> 🌱 Multiple Crops Mode</span>}
        </p>
        <Button label="🔄 Refresh Prices" onClick={handleRefresh} disabled={status === "loading"} />
      </div>
      
      {/* Tab Switcher */}
      <div className="crop__tabs">
        <button 
          className={`crop__tab ${activeTab === "crops" ? "crop__tab--active" : ""}`}
          onClick={() => setActiveTab("crops")}
        >
          🌱 Crop Recommendations
        </button>
        <button 
          className={`crop__tab ${activeTab === "farming" ? "crop__tab--active" : ""}`}
          onClick={() => setActiveTab("farming")}
        >
          🚜 Farming Types
        </button>
      </div>
      
      {activeTab === "farming" ? (
        <div className="farming__list">
          {farmingTypes.slice(0, 3).map((farming, idx) => (
            <div key={idx} className="farming__card">
              <div className="farming__header-row">
                <h3 className="farming__name">
                  {idx + 1}. {farming.type}
                </h3>
                <div className={`farming__score ${farming.suitability >= 0.7 ? "farming__score--high" : farming.suitability >= 0.5 ? "farming__score--medium" : "farming__score--low"}`}>
                  {(farming.suitability * 100).toFixed(0)}% Match
                </div>
              </div>
              
              <p className="farming__description">{farming.description}</p>
              
              <div className="farming__details">
                <div className="farming__section">
                  <h4 className="farming__section-title">✅ Benefits</h4>
                  <ul className="farming__benefits">
                    {farming.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="farming__section">
                  <h4 className="farming__section-title">⚠️ Challenges</h4>
                  <ul className="farming__challenges">
                    {farming.challenges.map((challenge, i) => (
                      <li key={i}>{challenge}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="farming__section">
                  <h4 className="farming__section-title">🌾 Best Crops</h4>
                  <div className="farming__crops-tags">
                    {farming.recommendedCrops.map((crop, i) => (
                      <span key={i} className="farming__crop-tag">{crop}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : status === "loading" ? (
        <div className="crop__loading">
          <div className="crop__spinner"></div>
          <p>Fetching live market prices and analyzing best crops...</p>
        </div>
      ) : status === "failed" ? (
        <div className="crop__error">
          <p>Failed to load recommendations. Please try again.</p>
          <Button label="Retry" onClick={handleRefresh} />
        </div>
      ) : recommendations.length > 0 ? (
        <div className="crop__list">
          {recommendations.map((crop, idx) => (
            <div key={idx} className="crop__card">
              <div className="crop__header-row">
                <h3 className="crop__name">
                  {idx + 1}. {crop.name}
                  {crop.season && <span className="crop__season"> ({crop.season.trim()})</span>}
                </h3>
                <div className="crop__score">
                  Score: <strong>{(crop.score * 100).toFixed(0)}%</strong>
                </div>
              </div>
              
              {/* Intercropping Badge */}
              {crop.farmingType && (
                <div className="crop__intercropping-badge">
                  🌱 {crop.farmingType}
                </div>
              )}
              
              {/* Live Price Badge */}
              <div className="crop__price-badge">
                <span className="crop__live-indicator">●</span>
                <span className="crop__live-price">
                  {formatCurrency(crop.livePrice || 0)}/quintal
                </span>
                <span className="crop__price-source">
                  ({crop.priceSource || "MSP"})
                </span>
              </div>
              
              <div className="crop__metrics">
                <div className="crop__metric">
                  <span className="crop__metric-label">Expected Yield</span>
                  <span className="crop__metric-value">{crop.yield.toFixed(2)} tonnes</span>
                </div>
                <div className="crop__metric crop__metric--profit">
                  <span className="crop__metric-label">Estimated Profit</span>
                  <span className={`crop__metric-value ${crop.profit >= 0 ? 'crop__profit' : 'crop__loss'}`}>
                    {formatCurrency(crop.profit)}
                  </span>
                </div>
              </div>

              <div className="crop__financials">
                <div className="crop__financial-row">
                  <span>Revenue</span>
                  <span className="crop__revenue">{formatCurrency(crop.estimatedRevenue)}</span>
                </div>
                <div className="crop__financial-row crop__total-cost">
                  <span>Total Cost</span>
                  <span>{formatCurrency(crop.estimatedCost)}</span>
                </div>
                
                <details className="crop__breakdown">
                  <summary className="crop__breakdown-toggle">View Cost Breakdown</summary>
                  <div className="crop__breakdown-content">
                    <div className="crop__breakdown-item">
                      <span>Fertilizer</span>
                      <span>{formatCurrency(crop.fertilizerCost)}</span>
                    </div>
                    <div className="crop__breakdown-item">
                      <span>Pesticide</span>
                      <span>{formatCurrency(crop.pesticideCost)}</span>
                    </div>
                    <div className="crop__breakdown-item">
                      <span>Labor</span>
                      <span>{formatCurrency(crop.laborCost)}</span>
                    </div>
                    <div className="crop__breakdown-item">
                      <span>Seeds</span>
                      <span>{formatCurrency(crop.seedCost)}</span>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="crop__empty">
          <p>No recommendations available for {profile.state}.</p>
          <p className="crop__empty-hint">Try adjusting your budget or selecting a different state.</p>
          <Button label="Refresh" onClick={handleRefresh} />
        </div>
      )}
    </Card>
  );
};

export default CropRecommendations;
