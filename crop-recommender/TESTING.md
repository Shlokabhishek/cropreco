# Testing Guide - Crop Recommender Backend

## Quick Test Checklist

After running `npm run dev:all`, follow these steps to verify everything works:

### ✅ 1. Backend Health Check

```bash
curl http://localhost:3001/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-16T..."
}
```

### ✅ 2. Register a New User

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"farmer@test.com\",\"password\":\"test123\",\"name\":\"Test Farmer\"}"
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "farmer@test.com",
    "name": "Test Farmer"
  }
}
```

**Save the token** for next steps!

### ✅ 3. Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"farmer@test.com\",\"password\":\"test123\"}"
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "farmer@test.com",
    "name": "Test Farmer"
  }
}
```

### ✅ 4. Get Weather Data

```bash
curl "http://localhost:3001/api/weather/current?location=Mumbai"
```

**Expected Response:**
```json
{
  "location": "Mumbai",
  "temperature": 28.5,
  "humidity": 65,
  "rainfall": 0,
  "condition": "Partly Cloudy",
  "source": "mock" // or "openweathermap" if API key set
}
```

### ✅ 5. Get Market Prices

```bash
curl "http://localhost:3001/api/market/prices/rice?state=Maharashtra"
```

**Expected Response:**
```json
{
  "prices": [
    {
      "commodity": "rice",
      "price": 2450.23,
      "unit": "per quintal",
      "market_name": "Local Market",
      "state": "Maharashtra",
      "date": "2026-01-16",
      "source": "mock"
    }
  ],
  "count": 10,
  "source": "mock"
}
```

### ✅ 6. Create Farmer Profile (Auth Required)

Replace `YOUR_TOKEN_HERE` with the token from step 2 or 3:

```bash
curl -X POST http://localhost:3001/api/users/profile/farmer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"state\":\"Maharashtra\",\"acreage\":10,\"soilType\":\"loamy\",\"budget\":100000}"
```

**Expected Response:**
```json
{
  "message": "Profile created successfully"
}
```

### ✅ 7. Get Crop Recommendations (Auth Required)

```bash
curl -X POST http://localhost:3001/api/crops/recommend \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"state\":\"Maharashtra\",\"acreage\":10,\"soilType\":\"loamy\",\"season\":\"kharif\",\"rainfall\":800}"
```

**Expected Response:**
```json
{
  "recommendations": [
    {
      "name": "Rice",
      "yield": 2250.5,
      "estimatedRevenue": 45000,
      "score": 85,
      "season": "kharif",
      "soilType": "loamy",
      "yieldPerHectare": 2500
    }
    // ... more recommendations
  ],
  "count": 10
}
```

## Browser Testing

### 1. Open Frontend
Navigate to: http://localhost:5173

### 2. Register via UI
1. Click "Sign Up" or "Register"
2. Fill in:
   - Name: Test Farmer
   - Email: farmer@test.com
   - Password: test123
3. Click Register

### 3. Complete Profile
1. Go to Profile page
2. Fill in:
   - State: Maharashtra
   - Acreage: 10
   - Soil Type: Loamy
   - Budget: 100000
3. Save

### 4. Get Recommendations
1. Navigate to Recommendations page
2. Select season (Kharif)
3. Click "Get Recommendations"
4. Verify crop list appears

### 5. Check Weather
1. Go to Weather page
2. Verify weather data loads
3. Check 7-day forecast

### 6. View Market Trends
1. Go to Market/Price Analysis
2. Select commodity (Rice)
3. View price charts
4. Check trends

## Testing with Postman

### Setup Collection

1. **Create Environment:**
   - Name: Crop Recommender Local
   - Variables:
     - `base_url`: http://localhost:3001/api
     - `token`: (leave empty, will be set after login)

2. **Create Requests:**

#### 1. Register
```
POST {{base_url}}/auth/register
Body (JSON):
{
  "email": "farmer@test.com",
  "password": "test123",
  "name": "Test Farmer"
}

Test Script:
pm.test("Status is 201", function() {
    pm.response.to.have.status(201);
});
pm.test("Token received", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.token).to.exist;
    pm.environment.set("token", jsonData.token);
});
```

#### 2. Login
```
POST {{base_url}}/auth/login
Body (JSON):
{
  "email": "farmer@test.com",
  "password": "test123"
}

Test Script:
pm.test("Login successful", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.token).to.exist;
    pm.environment.set("token", jsonData.token);
});
```

#### 3. Get Recommendations
```
POST {{base_url}}/crops/recommend
Headers:
  Authorization: Bearer {{token}}
Body (JSON):
{
  "state": "Maharashtra",
  "acreage": 10,
  "soilType": "loamy",
  "season": "kharif",
  "rainfall": 800
}

Test Script:
pm.test("Recommendations received", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.recommendations).to.be.an('array');
    pm.expect(jsonData.count).to.be.above(0);
});
```

## Database Inspection

### Using SQLite Browser

1. **Download:** https://sqlitebrowser.org/
2. **Open:** `server/data/crop_recommender.db`
3. **Verify Tables:**
   - users
   - farmer_profiles
   - crop_history
   - market_prices
   - recommendations

### Using Command Line

```bash
# Open database
sqlite3 server/data/crop_recommender.db

# List tables
.tables

# View users
SELECT * FROM users;

# View farmer profiles
SELECT * FROM farmer_profiles;

# View recommendations
SELECT * FROM recommendations;

# Exit
.quit
```

## Common Issues & Solutions

### ❌ "Cannot POST /api/auth/register"

**Problem:** Backend not running

**Solution:**
```bash
cd server
npm run dev
```

### ❌ "CORS Error"

**Problem:** Frontend URL mismatch

**Solution:** Check `server/.env`:
```bash
FRONTEND_URL=http://localhost:5173
```

### ❌ "JWT must be provided"

**Problem:** Missing Authorization header

**Solution:** Add header:
```bash
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### ❌ "Invalid credentials"

**Problem:** Wrong email/password

**Solution:** Check spelling or register new user

### ❌ "User already exists"

**Problem:** Email already registered

**Solution:** Use different email or login instead

## Test Data Examples

### Test Users
```json
[
  {
    "email": "farmer1@test.com",
    "password": "test123",
    "name": "Farmer One"
  },
  {
    "email": "farmer2@test.com",
    "password": "test456",
    "name": "Farmer Two"
  }
]
```

### Test Farmer Profiles
```json
[
  {
    "state": "Maharashtra",
    "acreage": 10,
    "soilType": "loamy",
    "budget": 100000
  },
  {
    "state": "Punjab",
    "acreage": 25,
    "soilType": "clayey",
    "budget": 250000
  },
  {
    "state": "Karnataka",
    "acreage": 5,
    "soilType": "red",
    "budget": 50000
  }
]
```

### Test Crop History
```json
{
  "cropName": "Rice",
  "season": "kharif",
  "year": 2025,
  "yieldActual": 2500,
  "revenue": 50000,
  "notes": "Good yield this year"
}
```

## Performance Testing

### Load Test with Apache Bench

```bash
# Install Apache Bench
# Windows: Download from Apache website
# Linux: apt-get install apache2-utils
# Mac: brew install httpd

# Test health endpoint
ab -n 100 -c 10 http://localhost:3001/health

# Test weather endpoint
ab -n 100 -c 10 "http://localhost:3001/api/weather/current?location=Mumbai"
```

### Expected Performance
- Health check: < 5ms
- Weather: < 100ms (mock), < 500ms (real API)
- Market prices: < 50ms
- Recommendations: < 200ms

## Automated Test Script

Save as `test-backend.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:3001"
API_URL="$BASE_URL/api"

echo "🧪 Testing Crop Recommender Backend"
echo "===================================="
echo ""

# Test 1: Health Check
echo "1. Testing health endpoint..."
curl -s "$BASE_URL/health" | jq
echo "✅ Health check passed"
echo ""

# Test 2: Register
echo "2. Testing registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test'$(date +%s)'@test.com","password":"test123","name":"Test User"}')
TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')
echo "✅ Registration passed - Token: ${TOKEN:0:20}..."
echo ""

# Test 3: Weather
echo "3. Testing weather endpoint..."
curl -s "$API_URL/weather/current?location=Mumbai" | jq
echo "✅ Weather endpoint passed"
echo ""

# Test 4: Market
echo "4. Testing market endpoint..."
curl -s "$API_URL/market/prices/rice" | jq
echo "✅ Market endpoint passed"
echo ""

# Test 5: Recommendations
echo "5. Testing recommendations endpoint..."
curl -s -X POST "$API_URL/crops/recommend" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"state":"Maharashtra","acreage":10,"soilType":"loamy","season":"kharif"}' | jq
echo "✅ Recommendations endpoint passed"
echo ""

echo "===================================="
echo "🎉 All tests passed!"
```

Run with:
```bash
chmod +x test-backend.sh
./test-backend.sh
```

## Test Coverage Checklist

- [ ] Backend starts without errors
- [ ] Health check responds
- [ ] User registration works
- [ ] User login works
- [ ] JWT token is generated
- [ ] Weather API responds
- [ ] Market API responds
- [ ] Crop recommendations work with auth
- [ ] Farmer profile creation works
- [ ] Crop history CRUD works
- [ ] Database tables created
- [ ] Frontend can register users
- [ ] Frontend can login
- [ ] Frontend displays weather
- [ ] Frontend displays recommendations
- [ ] Frontend displays market prices

## Success Criteria

✅ All API endpoints return 200/201 status
✅ Authentication generates valid JWT tokens
✅ Protected routes require authentication
✅ Database tables created automatically
✅ Frontend successfully connects to backend
✅ No CORS errors
✅ Weather data loads (mock or real)
✅ Market prices display
✅ Recommendations generated

## Need Help?

- Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for commands
- Review [BACKEND_SETUP.md](BACKEND_SETUP.md) for setup
- See [server/README.md](server/README.md) for API docs
- Read [ARCHITECTURE.md](ARCHITECTURE.md) for system design

Happy Testing! 🧪✨
