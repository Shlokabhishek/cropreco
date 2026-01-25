import { useWeatherData } from "../../hooks/useWeatherData";
import Card from "../shared/Card";
import Button from "../shared/Button";
import "./WeatherTrends.css";

const WeatherTrends = () => {
  const { forecast, status, refresh, location } = useWeatherData();

  return (
    <Card title="🌤️ Live Weather Trends">
      {!location ? (
        <p className="weather__empty">Please enter your location in the profile to see live weather.</p>
      ) : status === "loading" ? (
        <p className="weather__loading">Loading weather for {location}...</p>
      ) : status === "failed" ? (
        <div className="weather__error">
          <p>Failed to fetch weather data for {location}.</p>
          <Button label="Retry" onClick={refresh} />
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
        <p className="weather__empty">No weather data available.</p>
      )}
    </Card>
  );
};

export default WeatherTrends;