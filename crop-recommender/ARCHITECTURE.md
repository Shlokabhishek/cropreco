# Crop Recommender - System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                     http://localhost:5173                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REACT FRONTEND (Vite)                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Components: Auth, Profile, Recommendations, Weather...   │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │  State Management (Redux): auth, crop, market, user...   │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │  Services: api.ts (Backend Integration)                  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ REST API (JWT Auth)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EXPRESS.JS BACKEND API                        │
│                   http://localhost:3001/api                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Middleware: CORS, Auth (JWT), Error Handler             │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │  Routes:                                                  │  │
│  │    • /auth       → Registration, Login                   │  │
│  │    • /crops      → Recommendations, History              │  │
│  │    • /weather    → Current, Forecast                     │  │
│  │    • /market     → Prices, Trends, Comparison            │  │
│  │    • /users      → Profile, Crop History                 │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
           │                    │                    │
           │                    │                    │
           ▼                    ▼                    ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  SQLite Database │  │  CSV Datasets    │  │  External APIs   │
│                  │  │                  │  │                  │
│ • users          │  │ • crop_dataset   │  │ • OpenWeather    │
│ • farmer_profiles│  │ • soil_dataset   │  │   API            │
│ • crop_history   │  │                  │  │                  │
│ • market_prices  │  │                  │  │                  │
│ • recommendations│  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

## Data Flow

### 1. User Authentication Flow

```
User → Register/Login → Frontend (api.ts) → POST /api/auth/login
                                                      ↓
                                          Backend validates credentials
                                                      ↓
                                          Generate JWT token (7 days)
                                                      ↓
                                          Return { token, user }
                                                      ↓
Frontend stores token in localStorage ← ← ← ← ← ← ← ←┘
                                                      
All subsequent requests include: Authorization: Bearer <token>
```

### 2. Crop Recommendation Flow

```
User Profile Input → Frontend State (Redux)
     ↓
Frontend calls: POST /api/crops/recommend
     {
       state: "Maharashtra",
       acreage: 10,
       soilType: "loamy",
       season: "kharif",
       rainfall: 800
     }
     ↓
Backend (cropRoutes.ts)
     ↓
Read crop_dataset.csv
     ↓
Filter by state, season, soil type
     ↓
Score each crop based on:
  • Rainfall match
  • Soil type compatibility
  • Yield potential
  • Market price
     ↓
Calculate estimates:
  • Estimated yield
  • Estimated revenue
  • Profit potential
     ↓
Sort by score, return top 10
     ↓
Save top 3 to recommendations table
     ↓
Return recommendations to frontend
     ↓
Display in CropRecommendations component
```

### 3. Weather Data Flow

```
User Location → Frontend
     ↓
GET /api/weather/current?location=Mumbai
     ↓
Backend (weatherRoutes.ts)
     ↓
Check OPENWEATHER_API_KEY
     ↓
If API key exists:
  → Call OpenWeather API
  → Parse response
  → Return formatted data
     ↓
If no API key:
  → Generate mock weather data
  → Return mock data
     ↓
Frontend receives weather data
     ↓
Display in WeatherTrends component
```

### 4. Market Price Flow

```
Commodity Selection → Frontend
     ↓
GET /api/market/prices/rice?state=Maharashtra&days=30
     ↓
Backend (marketRoutes.ts)
     ↓
Query market_prices table
     ↓
Filter by commodity, state, date range
     ↓
If no data found:
  → Generate mock prices
     ↓
Return price history
     ↓
Frontend processes data
     ↓
Calculate trends (uptrend, downtrend, stable)
     ↓
Display charts in PriceAnalysis component
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   SECURITY LAYERS                       │
│                                                         │
│  1. Frontend                                            │
│     • Token stored in localStorage                      │
│     • Auto-logout on token expiration                   │
│     • Redirect to login for protected routes            │
│                                                         │
│  2. Network                                             │
│     • CORS configured (only frontend origin allowed)    │
│     • HTTPS in production (enforced by hosting)         │
│                                                         │
│  3. Backend Middleware                                  │
│     • JWT verification on protected routes              │
│     • Token expiration check (7 days)                   │
│     • Error handling (no sensitive data leaks)          │
│                                                         │
│  4. Database                                            │
│     • Parameterized queries (SQL injection protection)  │
│     • Bcrypt password hashing (salt rounds: 10)         │
│     • Foreign key constraints                           │
│     • User data isolation (userId in queries)           │
│                                                         │
│  5. Environment                                         │
│     • Secrets in .env (not committed)                   │
│     • JWT_SECRET required for production                │
│     • API keys protected                                │
└─────────────────────────────────────────────────────────┘
```

## Database Schema

```sql
┌─────────────────────────────────────────────────────────┐
│                     DATABASE SCHEMA                     │
└─────────────────────────────────────────────────────────┘

users
├── id (PRIMARY KEY, AUTOINCREMENT)
├── email (UNIQUE, NOT NULL)
├── password_hash (NOT NULL)
├── name (NOT NULL)
└── created_at (DEFAULT CURRENT_TIMESTAMP)
     │
     │ 1:1
     ▼
farmer_profiles
├── id (PRIMARY KEY)
├── user_id (FOREIGN KEY → users.id)
├── state (NOT NULL)
├── district
├── acreage (NOT NULL)
├── soil_type (NOT NULL)
├── budget
├── phone
├── created_at
└── updated_at
     │
     │ 1:many
     ▼
crop_history
├── id (PRIMARY KEY)
├── user_id (FOREIGN KEY → users.id)
├── crop_name (NOT NULL)
├── season (NOT NULL)
├── year (NOT NULL)
├── yield_actual
├── revenue
├── notes
└── created_at
     │
     │ 1:many
     ▼
recommendations
├── id (PRIMARY KEY)
├── user_id (FOREIGN KEY → users.id)
├── crop_name (NOT NULL)
├── score (NOT NULL)
├── estimated_yield
├── estimated_revenue
├── season
├── parameters (JSON)
└── created_at

market_prices (independent table)
├── id (PRIMARY KEY)
├── commodity (NOT NULL)
├── price (NOT NULL)
├── unit (DEFAULT 'per quintal')
├── market_name
├── state
├── date (NOT NULL)
├── source (DEFAULT 'government')
└── created_at
```

## API Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    API STRUCTURE                        │
│                                                         │
│  /api                                                   │
│  ├── /auth            (Public)                          │
│  │   ├── POST /register                                 │
│  │   └── POST /login                                    │
│  │                                                      │
│  ├── /crops           (Mixed)                           │
│  │   ├── GET  /              (Public)                   │
│  │   ├── GET  /:name         (Public)                   │
│  │   ├── POST /recommend     (Protected) 🔒            │
│  │   └── GET  /history/user  (Protected) 🔒            │
│  │                                                      │
│  ├── /weather         (Public)                          │
│  │   ├── GET /current?location=X                        │
│  │   └── GET /forecast?location=X&days=7                │
│  │                                                      │
│  ├── /market          (Mixed)                           │
│  │   ├── GET  /prices/:commodity     (Public)           │
│  │   ├── GET  /commodities           (Public)           │
│  │   ├── GET  /trends                (Public)           │
│  │   ├── GET  /comparison/:commodity (Public)           │
│  │   └── POST /prices                (Admin) 🔒         │
│  │                                                      │
│  └── /users           (All Protected) 🔒                │
│      ├── GET    /profile                                │
│      ├── POST   /profile/farmer                         │
│      ├── GET    /history/crops                          │
│      ├── POST   /history/crops                          │
│      └── DELETE /history/crops/:id                      │
│                                                         │
│  🔒 = Requires JWT token in Authorization header        │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack Details

### Frontend Stack
```
React 18.3.1
├── UI Framework
├── Component-based architecture
├── Hooks for state management
│
TypeScript 5.9.3
├── Type safety
├── Better IDE support
├── Compile-time error checking
│
Redux Toolkit 1.9.7
├── Centralized state management
├── Auth, crop, market, user, weather slices
│
Vite 7.3.1
├── Fast dev server
├── Optimized builds
├── Hot module replacement
│
TensorFlow.js 4.22.0
├── ML-powered recommendations
├── Client-side processing
│
Recharts 3.6.0 / Plotly.js 3.3.1
├── Data visualization
├── Market trends charts
└── Weather forecasts
```

### Backend Stack
```
Node.js (18+)
├── Runtime environment
├── Async I/O
│
Express.js 4.18.2
├── REST API framework
├── Middleware support
├── Routing
│
TypeScript 5.9.3
├── Type-safe backend code
│
SQLite3 5.1.7
├── Embedded database
├── Zero configuration
├── File-based storage
│
jsonwebtoken 9.0.2
├── JWT token generation
├── Token verification
│
bcrypt 5.1.1
├── Password hashing
├── Secure authentication
│
Axios 1.6.8
├── HTTP client
├── External API calls
│
csv-parse 5.5.5
├── CSV data processing
└── Crop dataset parsing
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  PRODUCTION SETUP                       │
│                                                         │
│  User Browser                                           │
│       ↓                                                 │
│  Vercel CDN (Frontend)                                  │
│    • Static files cached                                │
│    • Edge network                                       │
│    • Automatic HTTPS                                    │
│       ↓                                                 │
│  Railway/Render (Backend API)                           │
│    • Node.js server                                     │
│    • Environment variables                              │
│    • Automatic scaling                                  │
│       ↓                                                 │
│  SQLite / PostgreSQL                                    │
│    • Persistent storage                                 │
│    • Automatic backups (PostgreSQL)                     │
│                                                         │
│  External Services:                                     │
│    • OpenWeather API (weather data)                     │
└─────────────────────────────────────────────────────────┘
```

## Performance Considerations

```
┌─────────────────────────────────────────────────────────┐
│                   OPTIMIZATION                          │
│                                                         │
│  Frontend                                               │
│    • Code splitting (React.lazy)                        │
│    • Redux memoization                                  │
│    • Debounced API calls                                │
│    • Local caching                                      │
│                                                         │
│  Backend                                                │
│    • Database indexes on:                               │
│      - market_prices.commodity                          │
│      - market_prices.date                               │
│      - crop_history.user_id                             │
│      - recommendations.user_id                          │
│    • Parameterized queries (prepared statements)        │
│    • Response compression (gzip)                        │
│                                                         │
│  Database                                               │
│    • SQLite: Good for < 10K users                       │
│    • PostgreSQL: Recommended for scale                  │
│    • Consider Redis for caching                         │
└─────────────────────────────────────────────────────────┘
```

## Future Enhancements

```
1. Advanced Features
   ├── Real-time notifications (WebSocket)
   ├── Multi-language support (i18n)
   ├── Mobile app (React Native)
   └── Offline mode (PWA)

2. Security
   ├── Rate limiting (express-rate-limit)
   ├── Input validation (express-validator)
   ├── Security headers (helmet.js)
   └── 2FA authentication

3. Data
   ├── Government API integration
   ├── ML model training pipeline
   ├── Historical data analytics
   └── Predictive modeling

4. Infrastructure
   ├── Redis caching layer
   ├── PostgreSQL migration
   ├── Load balancing
   └── Monitoring (Sentry, LogRocket)
```

---

For implementation details, see:
- [BACKEND_IMPLEMENTATION.md](BACKEND_IMPLEMENTATION.md)
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
