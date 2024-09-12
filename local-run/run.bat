@echo off
setlocal

REM Change directory to where the batch file is located
cd /d "%~dp0"

REM Check if the 'build' directory exists
if not exist build (
    echo The 'build' directory does not exist. Please ensure it is in the same folder as this batch file.
    pause
    exit /b 1
)

REM Start the HTTP server
echo Starting the HTTP server...
start python -m http.server 8000 --directory build

REM Open the default web browser to the server URL
start http://localhost:8000

echo Server is running. You should see the site open in your browser.
pause
