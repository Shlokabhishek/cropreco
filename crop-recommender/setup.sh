#!/bin/bash

# Crop Recommender Setup Script

echo "🌾 Crop Recommender - Setup Script"
echo "=================================="
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..
echo ""

# Setup environment files
echo "⚙️  Setting up environment files..."

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created frontend .env file"
    fi
fi

if [ ! -f "server/.env" ]; then
    if [ -f "server/.env.example" ]; then
        cp server/.env.example server/.env
        echo "✅ Created backend .env file"
        echo ""
        echo "⚠️  IMPORTANT: Edit server/.env and set your JWT_SECRET"
    fi
fi
echo ""

echo "=================================="
echo "🎉 Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Edit server/.env and set JWT_SECRET to a secure random string"
echo "2. (Optional) Add OPENWEATHER_API_KEY in server/.env for live weather"
echo "3. Run 'npm run dev:all' to start both frontend and backend"
echo ""
echo "Or run them separately:"
echo "  - Backend: npm run dev:server"
echo "  - Frontend: npm run dev"
echo ""
