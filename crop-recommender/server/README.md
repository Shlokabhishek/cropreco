# Crop Recommender Backend

Backend API server for the Crop Recommendation System.

## Features

- **Authentication**: JWT-based user registration and login
- **Crop Recommendations**: AI-powered crop suggestions based on soil, weather, and location
- **Weather Integration**: Real-time weather data and forecasts
- **Market Prices**: Historical and current market price tracking
- **User Profiles**: Farmer profile management with crop history

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT + bcrypt
- **API Integration**: Axios for external APIs

## Setup

1. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys (OpenWeather API key is optional).

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Crops
- `GET /api/crops` - Get all crops
- `GET /api/crops/:name` - Get crop by name
- `POST /api/crops/recommend` - Get crop recommendations (requires auth)
- `GET /api/crops/history/user` - Get user recommendation history (requires auth)

### Weather
- `GET /api/weather/current?location=Mumbai` - Get current weather
- `GET /api/weather/forecast?location=Mumbai&days=7` - Get weather forecast

### Market
- `GET /api/market/prices/:commodity` - Get commodity prices
- `GET /api/market/commodities` - Get all commodities
- `GET /api/market/trends?commodities=rice,wheat` - Get price trends
- `GET /api/market/comparison/:commodity` - Compare prices across states
- `POST /api/market/prices` - Add market price (admin)

### User Profile
- `GET /api/users/profile` - Get user profile (requires auth)
- `POST /api/users/profile/farmer` - Create/update farmer profile (requires auth)
- `GET /api/users/history/crops` - Get crop history (requires auth)
- `POST /api/users/history/crops` - Add crop history (requires auth)
- `DELETE /api/users/history/crops/:id` - Delete crop history (requires auth)

## Database Schema

The SQLite database includes:
- `users` - User accounts
- `farmer_profiles` - Farmer-specific information
- `crop_history` - Historical crop data per user
- `market_prices` - Market price tracking
- `recommendations` - Saved recommendations

## Development

- `npm run dev` - Start with hot reload
- `npm run build` - Compile TypeScript
- `npm test` - Run tests

## Environment Variables

- `PORT` - Server port (default: 3001)
- `JWT_SECRET` - Secret key for JWT tokens
- `OPENWEATHER_API_KEY` - OpenWeather API key (optional)
- `FRONTEND_URL` - Frontend URL for CORS

## License

ISC
