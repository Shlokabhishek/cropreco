@echo off
REM Crop Recommender Setup Script for Windows

echo ===================================
echo Crop Recommender - Setup Script
echo ===================================
echo.

REM Check Node.js installation
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js version: %NODE_VERSION%
echo.

REM Install frontend dependencies
echo [*] Installing frontend dependencies...
call npm install
if %ERRORLEVEL% EQU 0 (
    echo [OK] Frontend dependencies installed
) else (
    echo [X] Failed to install frontend dependencies
    exit /b 1
)
echo.

REM Install backend dependencies
echo [*] Installing backend dependencies...
cd server
call npm install
if %ERRORLEVEL% EQU 0 (
    echo [OK] Backend dependencies installed
) else (
    echo [X] Failed to install backend dependencies
    exit /b 1
)
cd ..
echo.

REM Setup environment files
echo [*] Setting up environment files...

if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env >nul
        echo [OK] Created frontend .env file
    )
)

if not exist "server\.env" (
    if exist "server\.env.example" (
        copy server\.env.example server\.env >nul
        echo [OK] Created backend .env file
        echo.
        echo [!] IMPORTANT: Edit server\.env and set your JWT_SECRET
    )
)
echo.

echo ===================================
echo Setup Complete!
echo ===================================
echo.
echo Next steps:
echo 1. Edit server\.env and set JWT_SECRET to a secure random string
echo 2. (Optional) Add OPENWEATHER_API_KEY in server\.env for live weather
echo 3. Run 'npm run dev:all' to start both frontend and backend
echo.
echo Or run them separately:
echo   - Backend: npm run dev:server
echo   - Frontend: npm run dev
echo.
pause
