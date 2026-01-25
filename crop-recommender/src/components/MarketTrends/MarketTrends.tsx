import { useMarketData } from "../../hooks/useMarketData";
import Card from "../shared/Card";
import "./MarketTrends.css";

const MarketTrends = () => {
  const { trends, status } = useMarketData();

  return (
    <Card title="📈 Market Trends">
      {status === "loading" ? (
        <p className="market__loading">Loading...</p>
      ) : trends.length > 0 ? (
        <div className="market__list">
          {trends.map((trend, idx) => (
            <div key={idx} className="market__item">
              <span className="market__commodity">{trend.commodity}</span>
              <div className="market__details">
                <span className="market__price">₹{trend.price}</span>
                <span
                  className={`market__change ${
                    trend.change >= 0 ? "market__change--positive" : "market__change--negative"
                  }`}
                >
                  {trend.change >= 0 ? "+" : ""}
                  {trend.change.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="market__empty">No market data available.</p>
      )}
    </Card>
  );
};

export default MarketTrends;