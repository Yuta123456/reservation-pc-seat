@echo off
cd "C:\Users\admin\reservation-pc-seat"
echo "building reservation system"
docker compose build
echo "starting reservation system"
docker compose up -d
echo "Done!!"
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --start-fullscreen "http://localhost:4000/"
pause
