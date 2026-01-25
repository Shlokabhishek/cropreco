# Quick Reference - Crop Recommender Backend

## 🚀 Quick Start

```bash
# 1. Setup (first time only)
setup.bat              # Windows
./setup.sh             # Linux/Mac

# 2. Start the app
npm run dev:all        # Both frontend & backend

# 3. Access
Frontend: http://localhost:5173
Backend:  http://localhost:3001
```

## 📡 API Endpoints

### Base URL: `http://localhost:3001/api`

#### Authentication
```bash
POST /auth/register     # Register: { email, password, name }
POST /auth/login        # Login: { email, password } → returns token
```

#### Crops
```bash
GET  /crops                    # All crops
GET  /crops/:name              # Specific crop
POST /crops/recommend          # Recommendations (auth) → { state, acreage, soilType, season }
GET  /crops/history/user       # History (auth)
```

#### Weather
```bash
GET /weather/current?location=Mumbai            # Current weather
GET /weather/forecast?location=Mumbai&days=7    # Forecast
```

#### Market
```bash
GET /market/prices/:commodity              # Prices: ?state=Maharashtra&days=30
GET /market/commodities                    # All commodities
GET /market/trends?commodities=rice,wheat  # Price trends
GET /market/comparison/:commodity          # Compare states
```

#### User
```bash
GET    /users/profile              # Get profile (auth)
POST   /users/profile/farmer       # Update profile (auth)
GET    /users/history/crops        # Crop history (auth)
POST   /users/history/crops        # Add history (auth)
DELETE /users/history/crops/:id    # Delete history (auth)
```

## 🔑 Environment Variables

### Frontend `.env`
```bash
VITE_API_BASE=http://localhost:3001/api
```

### Backend `server/.env`
```bash
PORT=3001
JWT_SECRET=your-super-secret-key-change-this
OPENWEATHER_API_KEY=optional-get-from-openweathermap.org
FRONTEND_URL=http://localhost:5173
```

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Frontend only
npm run dev:server       # Backend only
npm run dev:all          # Both

# Installation
npm install              # Frontend deps
npm run server:install   # Backend deps

# Build
npm run build            # Frontend
npm run build:server     # Backend

# Testing
npm test                 # Run tests
```

## 📂 Project Structure

```
crop-recommender/
├── src/                      # Frontend
│   ├── components/
│   ├── services/api.ts      # ← Backend integration
│   └── state/
├── server/                   # Backend
│   ├── src/
│   │   ├── index.ts         # Server entry
│   │   ├── routes/          # API endpoints
│   │   ├── config/          # Database
│   │   └── middleware/      # Auth & errors
│   ├── data/                # SQLite DB (auto-created)
│   └── package.json
└── package.json
```

## 🗄️ Database Tables

```sql
users              # id, email, password_hash, name
farmer_profiles    # user_id, state, acreage, soil_type, budget
crop_history       # user_id, crop_name, season, year, yield, revenue
market_prices      # commodity, price, state, date, source
recommendations    # user_id, crop_name, score, estimated_yield
```

## 🔐 Authentication Flow

```javascript
// 1. Register/Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { token } = await response.json();

// 2. Store token
localStorage.setItem('authToken', token);

// 3. Use token
fetch('/api/crops/recommend', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## 🐛 Troubleshooting

### Backend won't start
```bash
cd server
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database issues
```bash
rm server/data/*.db    # Delete and restart
npm run dev:server     # Will recreate tables
```

### CORS errors
- Check `FRONTEND_URL` in `server/.env` matches frontend
- Ensure both servers are running

### Port already in use
```bash
# Change PORT in server/.env
PORT=3002

# Update VITE_API_BASE in root .env
VITE_API_BASE=http://localhost:3002/api
```

## 📊 Testing with cURL

```bash
# Health check
curl http://localhost:3001/health

# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Weather
curl "http://localhost:3001/api/weather/current?location=Mumbai"

# Market
curl "http://localhost:3001/api/market/prices/rice"
```

## 🚀 Deployment Checklist

- [ ] Set strong `JWT_SECRET` in production
- [ ] Add `OPENWEATHER_API_KEY` for live weather
- [ ] Update `VITE_API_BASE` to production backend URL
- [ ] Update `FRONTEND_URL` to production frontend URL
- [ ] Set `NODE_ENV=production`
- [ ] Consider PostgreSQL instead of SQLite
- [ ] Enable HTTPS (automatic on most platforms)

## 📚 Documentation

- [BACKEND_IMPLEMENTATION.md](BACKEND_IMPLEMENTATION.md) - Complete overview
- [BACKEND_SETUP.md](BACKEND_SETUP.md) - Setup guide
- [server/README.md](server/README.md) - API documentation
- [DEPLOY.md](DEPLOY.md) - Deployment guide
- [README.md](README.md) - Main README

## 🎯 Next Steps

1. Run `setup.bat` or `./setup.sh`
2. Edit `server/.env` - set `JWT_SECRET`
3. Run `npm run dev:all`
4. Open http://localhost:5173
5. Register a user and test!

---

**Need help?** Check the full documentation in the files above.
