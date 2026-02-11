import { useWeatherData } from "../../hooks/useWeatherData";
import { useLanguage } from "../../i18n/LanguageContext";
import Card from "../shared/Card";
import Button from "../shared/Button";
import "./WeatherTrends.css";

const WeatherTrends = () => {
  const { forecast, status, refresh, location } = useWeatherData();
  const { t, formatMessage } = useLanguage();

  return (
    <Card title={t.liveWeatherTrends}>
      {!location ? (
        <p className="weather__empty">{t.weatherEmpty}</p>
      ) : status === "loading" ? (
        <p className="weather__loading">{formatMessage("weatherLoading", { location })}</p>
      ) : status === "failed" ? (
        <div className="weather__error">
          <p>{formatMessage("weatherError", { location })}</p>
          <Button label={t.retry} onClick={refresh} />
        </div>
      ) : forecast.length > 0 ? (
        <>
          <div className="weather__location">
            <span className="weather__location-icon">📍</span>
            <span className="weather__location-text">{location}</span>
          </div>
          <div className="weather__list">
            {forecast.map((day, idx) => (
              <div key={idx} className="weather__item">
                <span className="weather__day">{day.day}</span>
                <span className="weather__temp">{day.temperatureC}°C</span>
                <span className="weather__condition">{day.condition}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="weather__empty">{t.weatherNoData}</p>
      )}
    </Card>
  );
};

export default WeatherTrends;