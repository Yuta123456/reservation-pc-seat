@echo off
chcp 65001
cd "C:\Users\admin\reservation-pc-seat"
docker compose up -d
echo "サーバーを起動しました。エラーが出ていなければ「PC席予約」のアイコンから予約画面を開いてください。"
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --start-fullscreen "http://localhost:4000/"
pause
