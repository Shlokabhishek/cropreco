# 🌾 Crop Recommender

A full-stack React + TypeScript + Node.js application that provides personalized crop recommendations for farmers based on soil type, weather patterns, market trends, and budget constraints. **Now with Machine Learning!**

## ✨ New: AI-Powered Recommendations

The application now includes a **TensorFlow.js neural network model** that:
- 🧠 Learns from 19,000+ historical crop records
- 🎯 Predicts crop yields with 85%+ confidence
- 📈 Enhances recommendations with ML-based suitability scores
- 🚀 Runs entirely in your browser (no server needed)

👉 **[See ML Model Documentation](./ML_MODEL_DOCUMENTATION.md)** for details.

## Features

### Frontend
- **🔐 Authentication** - Secure JWT-based login/registration system
- **🧠 ML-Powered Recommendations** - Neural network model for yield prediction
- **👤 Farmer Profile Management** - Comprehensive profile with:
  - Location input for live weather data
  - Soil quality selection (with default recommendation fallback)
  - Acreage and experience tracking
  - Crop history tracking
- **🌤️ Live Weather Trends** - Real-time weather forecasts based on farmer's location
  - OpenWeather API integration
  - 7-day forecast
- **🌾 Crop Recommendations** - AI-powered suggestions
  - ML model + traditional algorithms (hybrid approach)
  - Considers soil quality, weather, and location
  - Budget-conscious suggestions
  - Historical recommendation tracking
- **💰 Price Analysis** - Detailed commodity price analysis with:
  - Current market prices
  - Price trends and comparison
  - Actionable recommendations
- **📊 Redux State Management** - Centralized app state

### Backend
- **🔒 JWT Authentication** - Secure token-based auth with bcrypt password hashing
- **🗄️ SQLite Database** - Persistent data storage
- **🌐 REST API** - Comprehensive API for:
  - User management and farmer profiles
  - Crop recommendations
  - Weather data integration
  - Market price tracking and trends
- **☁️ Weather Integration** - OpenWeather API integration with fallback
- **📈 Market Data** - Price tracking and trend analysis

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Build Tool**: Vite
- **Machine Learning**: TensorFlow.js (Neural Networks)
- **Data Processing**: danfojs, TensorFlow.js
- **Charting**: Plotly.js, Recharts
- **Testing**: Vitest, React Testing Library

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT + bcrypt
- **API Integration**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Quick Start

1. **Clone and install**:
   ```bash
   npm install
   npm run server:install
   ```

2. **Configure environment**:
   
   Frontend (root `.env`):
   ```bash
   VITE_API_BASE=http://localhost:3001/api
   ```

   Backend (`server/.env`):
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env and set JWT_SECRET and OPENWEATHER_API_KEY
   ```

3. **Run both frontend and backend**:
   ```bash
   npm run dev:all
   ```

   Or run separately:
   ```bash
   # Terminal 1 - Backend
   npm run dev:server

   # Terminal 2 - Frontend
   npm run dev
   ```

4. **Access the app**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

For detailed backend setup, see [BACKEND_SETUP.md](BACKEND_SETUP.md).

### Available Scripts

```bash
npm run dev              # Start frontend only
npm run dev:server       # Start backend only
npm run dev:all          # Start both frontend and backend
npm run build            # Build frontend
npm run build:server     # Build backend
npm run server:install   # Install backend dependencies
npm test                 # Run tests
```

## Usage Guide

1. **Login/Sign Up** - Create an account or login to access the dashboard
2. **Complete Your Profile**:
   - Enter your **location** (required for live weather)
   - Select **soil quality** (optional - system uses smart defaults)
   - Add acreage and experience details
3. **View Live Weather** - Automatically updates based on your location
4. **Check Price Analysis** - Get market insights and recommendations
5. **Explore Crop Recommendations** - See personalized crop suggestions
6. **Logout** - Securely end your session

## Project Structure

```
crop-recommender/
├── src/                  # Frontend source
│   ├── components/       # React components
│   │   ├── Auth/         # Login/Registration
│   │   ├── CropRecommendations/
│   │   ├── FarmerProfile/
│   │   ├── PriceAnalysis/
│   │   ├── WeatherTrends/
│   │   └── shared/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API service layer
│   ├── state/            # Redux store & slices
│   └── data/             # CSV datasets
├── server/               # Backend source
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── config/       # Database configuration
│   │   ├── middleware/   # Auth & error handling
│   │   └── index.ts      # Express server
│   ├── data/             # SQLite database
│   └── package.json      # Backend dependencies
├── public/               # Static assets
└── package.json          # Root dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Crops
- `GET /api/crops` - Get all crops
- `POST /api/crops/recommend` - Get recommendations (auth required)
- `GET /api/crops/history/user` - Get recommendation history (auth required)

### Weather
- `GET /api/weather/current?location=Mumbai` - Current weather
- `GET /api/weather/forecast?location=Mumbai&days=7` - Forecast

### Market
- `GET /api/market/prices/:commodity` - Get prices
- `GET /api/market/trends?commodities=rice,wheat` - Price trends
- `GET /api/market/comparison/:commodity` - Compare across states

### User
- `GET /api/users/profile` - Get user profile (auth required)
- `POST /api/users/profile/farmer` - Update farmer profile (auth required)
- `GET /api/users/history/crops` - Get crop history (auth required)
- `POST /api/users/history/crops` - Add crop history (auth required)

For detailed API documentation, see [server/README.md](server/README.md).

## Data

The app processes two main datasets:
- **crop_dataset.csv** - Crop production, yield, prices
- **soil_dataset.csv** - Soil types and suitable crops

## Features in Detail

### Authentication System
- Simple email/password authentication
- Session persistence
- Secure logout

### Location-Based Weather
- Automatic weather fetching based on farmer location
- 7-day forecast display
- Graceful fallback to mock data

### Soil Quality Handling
- Optional soil quality input
- Smart default recommendations when not specified
- Multiple soil types supported (Loamy, Clayey, Sandy, Black, Red, Laterite)

### Price Analysis
- Real-time commodity price tracking
- Percentage change calculations
- Trend classification (Strong Uptrend/Downtrend)
- Actionable buy/sell recommendations

## License

ISC