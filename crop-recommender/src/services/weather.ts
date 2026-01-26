// Weather service

export type WeatherData = {
  temperature: number;
  humidity: number;
  rainfall: number;
  condition: string;
};

export type ForecastDay = {
  day: string;
  temperatureC: number;
  condition: string;
};

// OpenWeather API (or similar) integration
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";

// Mock weather data generator
export function generateMockWeather(_location: string): WeatherData {
  return {
    temperature: 20 + Math.random() * 15,
    humidity: 40 + Math.random() * 40,
    rainfall: Math.random() * 100,
    condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][Math.floor(Math.random() * 4)]
  };
}

export function generateMockForecast(days: number = 7): ForecastDay[] {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const conditions = ["Sunny", "Cloudy", "Light Rain", "Heavy Rain", "Partly Cloudy"];
  
  return Array.from({ length: days }, (_, i) => ({
    day: dayNames[i % 7],
    temperatureC: Math.round(18 + Math.random() * 12),
    condition: conditions[Math.floor(Math.random() * conditions.length)]
  }));
}

// Live weather fetching
export async function fetchLiveWeather(location: string): Promise<ForecastDay[] | null> {
  try {
    // If API key is available, use real API
    if (WEATHER_API_KEY) {
      // Example: OpenWeatherMap API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (response.ok) {
        const data = await response.json();
        // Process API response to match our format
        const forecast = data.list.slice(0, 7).map((item: any) => ({
          day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          temperatureC: Math.round(item.main.temp),
          condition: item.weather[0].main
        }));
        return forecast;
      }
    }
    
    // Fallback to mock data
    console.log('Using mock weather data for:', location);
    return generateMockForecast(7);
  } catch (error) {
    console.error('Weather API error:', error);
    // Return mock data on error
    return generateMockForecast(7);
  }
}

// Real API integration (stub for future use)
export async function fetchRealWeather(location: string): Promise<WeatherData | null> {
  try {
    // TODO: Integrate with real weather API (OpenWeather, WeatherAPI, etc.)
    console.log("Fetching weather for:", location);
    return generateMockWeather(location);
  } catch (error) {
    console.error("Weather API error:", error);
    return null;
  }
}