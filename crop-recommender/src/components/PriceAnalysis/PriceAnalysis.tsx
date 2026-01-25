import { useMarketData } from "../../hooks/useMarketData";
import Card from "../shared/Card";
import "./PriceAnalysis.css";

const PriceAnalysis = () => {
  const { trends, status } = useMarketData();

  const getTrendAnalysis = (change: number) => {
    if (change > 5) return { text: "Strong Uptrend", class: "trend-strong-up" };
    if (change > 0) return { text: "Uptrend", class: "trend-up" };
    if (change < -5) return { text: "Strong Downtrend", class: "trend-strong-down" };
    if (change < 0) return { text: "Downtrend", class: "trend-down" };
    return { text: "Stable", class: "trend-stable" };
  };

  const getRecommendation = (change: number) => {
    if (change > 5) return "Excellent time to sell - prices rising sharply";
    if (change > 0) return "Good time to sell - prices increasing";
    if (change < -5) return "Hold off selling - prices falling significantly";
    if (change < 0) return "Consider holding - prices declining";
    return "Market stable - monitor for changes";
  };

  return (
    <Card title="💰 Price Analysis">
      {status === "loading" ? (
        <p className="price__loading">Loading analysis...</p>
      ) : trends.length > 0 ? (
        <div className="price__analysis">
          {trends.map((trend, idx) => {
            const analysis = getTrendAnalysis(trend.change);
            const recommendation = getRecommendation(trend.change);
            
            return (
              <div key={idx} className="price__item">
                <div className="price__header">
                  <h4 className="price__commodity">{trend.commodity}</h4>
                  <span className={`price__trend ${analysis.class}`}>
                    {analysis.text}
                  </span>
                </div>
                <div className="price__details">
                  <div className="price__stat">
                    <span className="price__label">Current Price</span>
                    <span className="price__value">₹{trend.price.toLocaleString()}</span>
                  </div>
                  <div className="price__stat">
                    <span className="price__label">Change</span>
                    <span className={`price__change ${trend.change >= 0 ? "positive" : "negative"}`}>
                      {trend.change >= 0 ? "+" : ""}{trend.change.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="price__recommendation">
                  <strong>Recommendation:</strong> {recommendation}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="price__empty">No price data available.</p>
      )}
    </Card>
  );
};

export default PriceAnalysis;
