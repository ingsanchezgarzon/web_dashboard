@echo off
cd /d "%~dp0"
echo Starting AI Ecosystem Web Dashboard...

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

call npm run dev
pause
