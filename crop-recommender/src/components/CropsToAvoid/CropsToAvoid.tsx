import { useLanguage } from "../../i18n/LanguageContext";
import { CropToAvoid, AvoidReason } from "../../services/recommender";
import Card from "../shared/Card";
import "./CropsToAvoid.css";

interface CropsToAvoidProps {
  cropsToAvoid: CropToAvoid[];
  isLoading?: boolean;
}

const CropsToAvoid: React.FC<CropsToAvoidProps> = ({ cropsToAvoid, isLoading }) => {
  const { t } = useLanguage();

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getReasonText = (reason: AvoidReason): string => {
    const reasonMap: Record<AvoidReason, keyof typeof t> = {
      lowMarketPrice: "lowMarketPrice",
      highInputCost: "highInputCost",
      unsuitableSeason: "unsuitableSeason",
      unsuitableSoil: "unsuitableSoil",
      lowYield: "lowYield",
      negativeProfitMargin: "negativeProfitMargin",
      oversupplyWarning: "oversupplyWarning",
      weatherRisk: "weatherRisk"
    };
    return t[reasonMap[reason]] || reason;
  };

  const getReasonIcon = (reason: AvoidReason): string => {
    const iconMap: Record<AvoidReason, string> = {
      lowMarketPrice: "📉",
      highInputCost: "💰",
      unsuitableSeason: "📅",
      unsuitableSoil: "🏜️",
      lowYield: "📊",
      negativeProfitMargin: "❌",
      oversupplyWarning: "📦",
      weatherRisk: "🌧️"
    };
    return iconMap[reason] || "⚠️";
  };

  if (isLoading) {
    return (
      <Card title={t.cropsToAvoid}>
        <div className="avoid__loading">
          <div className="avoid__spinner"></div>
          <p>{t.loading}</p>
        </div>
      </Card>
    );
  }

  if (cropsToAvoid.length === 0) {
    return (
      <Card title={t.cropsToAvoid}>
        <div className="avoid__empty">
          <p>✅ {t.noData}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title={t.cropsToAvoid}>
      <p className="avoid__subtitle">
        {t.avoidCropsTitle}
      </p>
      
      <div className="avoid__list">
        {cropsToAvoid.map((crop, idx) => (
          <div 
            key={idx} 
            className={`avoid__card avoid__card--${crop.riskLevel}`}
          >
            <div className="avoid__header-row">
              <h3 className="avoid__name">
                ⚠️ {crop.name}
                {crop.season && <span className="avoid__season"> ({crop.season})</span>}
              </h3>
              <div className={`avoid__risk-badge avoid__risk-badge--${crop.riskLevel}`}>
                {crop.riskLevel === "high" ? t.highRisk : t.mediumRisk}
              </div>
            </div>

            <div className="avoid__loss">
              <span className="avoid__loss-label">{t.lossRisk}:</span>
              <span className="avoid__loss-value">{formatCurrency(crop.estimatedLoss)}</span>
            </div>

            <div className="avoid__reasons">
              <h4 className="avoid__reasons-title">{t.avoidReason}:</h4>
              <ul className="avoid__reasons-list">
                {crop.reasons.map((reason, i) => (
                  <li key={i} className="avoid__reason-item">
                    <span className="avoid__reason-icon">{getReasonIcon(reason)}</span>
                    <span className="avoid__reason-text">{getReasonText(reason)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="avoid__alternatives">
              <h4 className="avoid__alternatives-title">💡 {t.bestCrops}:</h4>
              <div className="avoid__alternatives-tags">
                {crop.alternativeCrops.map((alt, i) => (
                  <span key={i} className="avoid__alternative-tag">{alt}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CropsToAvoid;
