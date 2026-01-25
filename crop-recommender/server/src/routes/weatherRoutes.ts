import { Router, Request, Response } from 'express';
import axios from 'axios';
import { AppError } from '../middleware/errorHandler';

export const router = Router();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || '';

// Get current weather for a location
router.get('/current', async (req: Request, res: Response) => {
  const { location, lat, lon } = req.query;

  if (!location && (!lat || !lon)) {
    throw new AppError('Location name or coordinates (lat, lon) required', 400);
  }

  if (!OPENWEATHER_API_KEY) {
    // Return mock data if no API key
    return res.json({
      location: location || `${lat},${lon}`,
      temperature: 25 + Math.random() * 10,
      humidity: 50 + Math.random() * 30,
      rainfall: Math.random() * 50,
      condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
      windSpeed: Math.random() * 20,
      pressure: 1000 + Math.random() * 30,
      source: 'mock'
    });
  }

  try {
    let url: string;
    if (location) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location as string)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    }

    const response = await axios.get(url);
    const data = response.data;

    res.json({
      location: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      rainfall: data.rain?.['1h'] || 0,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      source: 'openweathermap'
    });
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new AppError('Location not found', 404);
    }
    throw new AppError('Failed to fetch weather data', 500);
  }
});

// Get weather forecast
router.get('/forecast', async (req: Request, res: Response) => {
  const { location, lat, lon, days = 7 } = req.query;

  if (!location && (!lat || !lon)) {
    throw new AppError('Location name or coordinates (lat, lon) required', 400);
  }

  if (!OPENWEATHER_API_KEY) {
    // Return mock forecast
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const conditions = ['Sunny', 'Cloudy', 'Light Rain', 'Heavy Rain', 'Partly Cloudy'];
    
    const forecast = Array.from({ length: Number(days) }, (_, i) => ({
      day: dayNames[i % 7],
      date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
      temperatureC: Math.round(18 + Math.random() * 12),
      humidity: 50 + Math.random() * 30,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      rainfall: Math.random() * 20
    }));

    return res.json({
      location: location || `${lat},${lon}`,
      forecast,
      source: 'mock'
    });
  }

  try {
    let url: string;
    if (location) {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location as string)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    }

    const response = await axios.get(url);
    const data = response.data;

    // Group by day
    const forecastByDay: any = {};
    data.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!forecastByDay[date]) {
        forecastByDay[date] = {
          date,
          temperatures: [],
          humidity: [],
          conditions: [],
          rainfall: 0
        };
      }
      forecastByDay[date].temperatures.push(item.main.temp);
      forecastByDay[date].humidity.push(item.main.humidity);
      forecastByDay[date].conditions.push(item.weather[0].main);
      forecastByDay[date].rainfall += item.rain?.['3h'] || 0;
    });

    const forecast = Object.values(forecastByDay).slice(0, Number(days)).map((day: any) => ({
      date: day.date,
      day: new Date(day.date).toLocaleDateString('en', { weekday: 'short' }),
      temperatureC: Math.round(day.temperatures.reduce((a: number, b: number) => a + b, 0) / day.temperatures.length),
      humidity: Math.round(day.humidity.reduce((a: number, b: number) => a + b, 0) / day.humidity.length),
      condition: day.conditions[0],
      rainfall: Math.round(day.rainfall * 10) / 10
    }));

    res.json({
      location: data.city.name,
      forecast,
      source: 'openweathermap'
    });
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new AppError('Location not found', 404);
    }
    throw new AppError('Failed to fetch weather forecast', 500);
  }
});
