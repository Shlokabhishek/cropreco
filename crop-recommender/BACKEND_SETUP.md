# Getting Started with Backend

This guide will help you set up and run the backend server for the Crop Recommender system.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

Or from the root directory:
```bash
npm run server:install
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cd server
   cp .env.example .env
   ```

2. Edit the `.env` file and update the values:
   - `JWT_SECRET`: Change to a secure random string for production
   - `OPENWEATHER_API_KEY`: (Optional) Get a free key from [OpenWeatherMap](https://openweathermap.org/api)

### Step 3: Start the Backend Server

From the server directory:
```bash
npm run dev
```

Or from the root directory:
```bash
npm run dev:server
```

The server will start on `http://localhost:3001`.

### Step 4: Start Frontend (in another terminal)

From the root directory:
```bash
npm run dev
```

Or run both frontend and backend together:
```bash
npm run dev:all
```

## API Documentation

Once the server is running, you can test the endpoints:

### Health Check
```bash
curl http://localhost:3001/health
```

### Register a User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"farmer@example.com","password":"password123","name":"John Farmer"}'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"farmer@example.com","password":"password123"}'
```

### Get Weather Data
```bash
curl "http://localhost:3001/api/weather/current?location=Mumbai"
```

### Get Market Prices
```bash
curl "http://localhost:3001/api/market/prices/rice"
```

### Get Crop Recommendations (requires auth token)
```bash
curl -X POST http://localhost:3001/api/crops/recommend \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"state":"Maharashtra","acreage":10,"soilType":"loamy","season":"kharif"}'
```

## Database

The server uses SQLite for data storage. The database file is created automatically at:
```
server/data/crop_recommender.db
```

### Database Tables

- **users**: User accounts
- **farmer_profiles**: Farmer information (state, acreage, soil type, etc.)
- **crop_history**: Historical crop data per user
- **market_prices**: Market price tracking
- **recommendations**: Saved crop recommendations

## Troubleshooting

### Port Already in Use

If port 3001 is already in use, change it in `server/.env`:
```
PORT=3002
```

And update the frontend's `.env`:
```
VITE_API_BASE=http://localhost:3002/api
```

### Database Issues

If you encounter database errors, delete the database file and restart:
```bash
rm server/data/crop_recommender.db
npm run dev:server
```

### CORS Errors

If you encounter CORS errors, make sure:
1. Frontend is running on `http://localhost:5173`
2. Backend is running on `http://localhost:3001`
3. Both servers are running

## Production Deployment

### Build the Backend

```bash
cd server
npm run build
```

### Run Production Server

```bash
NODE_ENV=production npm start
```

### Environment Variables for Production

Make sure to set these in your production environment:
- `NODE_ENV=production`
- `JWT_SECRET`: Use a secure random string
- `PORT`: Your desired port
- `FRONTEND_URL`: Your frontend domain (for CORS)
- `OPENWEATHER_API_KEY`: Your OpenWeather API key

## Features

✅ JWT-based authentication
✅ User registration and login
✅ Farmer profile management
✅ Crop recommendations based on soil, weather, location
✅ Real-time weather data integration
✅ Market price tracking and trends
✅ Crop history tracking
✅ SQLite database with automatic initialization

## Next Steps

- Add more crop data to the CSV files
- Integrate with government market APIs
- Add more weather data sources
- Implement admin panel for data management
- Add email verification
- Implement password reset functionality
