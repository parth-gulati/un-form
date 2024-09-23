#!/bin/bash

# Change directory to where the script is located
cd "$(dirname "$0")"

# Check if the 'build' directory exists
if [ ! -d "build" ]; then
    echo "The 'build' directory does not exist. Please ensure it is in the same folder as this script."
    read -p "Press Enter to continue..." # Pause equivalent
    exit 1
fi

# Check for python or python3 and start the HTTP server
if command -v python &>/dev/null; then
    echo "Starting the HTTP server with python..."
    python -m http.server 8000 --directory build &
elif command -v python3 &>/dev/null; then
    echo "Starting the HTTP server with python3..."
    python3 -m http.server 8000 --directory build &
else
    echo "Neither python nor python3 is installed. Please install Python."
    exit 1
fi

# Open the default web browser to the server URL
if command -v xdg-open &>/dev/null; then
    xdg-open http://localhost:8000
elif command -v open &>/dev/null; then
    open http://localhost:8000
else
    echo "Please open http://localhost:8000 manually."
fi

echo "Server is running. You should see the site open in your browser."
read -p "Press Enter to stop the server..."
