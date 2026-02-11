import { useMarketData } from "../../hooks/useMarketData";
import { useLanguage } from "../../i18n/LanguageContext";
import Card from "../shared/Card";
import "./PriceAnalysis.css";

const PriceAnalysis = () => {
  const { trends, status } = useMarketData();
  const { t } = useLanguage();

  const getTrendAnalysis = (change: number) => {
    if (change > 5) return { text: t.strongUptrend, class: "trend-strong-up" };
    if (change > 0) return { text: t.uptrend, class: "trend-up" };
    if (change < -5) return { text: t.strongDowntrend, class: "trend-strong-down" };
    if (change < 0) return { text: t.downtrend, class: "trend-down" };
    return { text: t.stable, class: "trend-stable" };
  };

  const getRecommendation = (change: number) => {
    if (change > 5) return t.sellExcellent;
    if (change > 0) return t.sellGood;
    if (change < -5) return t.holdOff;
    if (change < 0) return t.considerHolding;
    return t.marketStable;
  };

  return (
    <Card title={t.priceAnalysis}>
      {status === "loading" ? (
        <p className="price__loading">{t.priceAnalysisLoading}</p>
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
                    <span className="price__label">{t.currentPrice}</span>
                    <span className="price__value">₹{trend.price.toLocaleString()}</span>
                  </div>
                  <div className="price__stat">
                    <span className="price__label">{t.priceChange}</span>
                    <span className={`price__change ${trend.change >= 0 ? "positive" : "negative"}`}>
                      {trend.change >= 0 ? "+" : ""}{trend.change.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="price__recommendation">
                  <strong>{t.recommendation}:</strong> {recommendation}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="price__empty">{t.priceAnalysisEmpty}</p>
      )}
    </Card>
  );
};

export default PriceAnalysis;
