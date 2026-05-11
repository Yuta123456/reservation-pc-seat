@echo off
chcp 65001
cd "C:\Users\admin\reservation-pc-seat"
echo "サーバーを終了します。"
docker compose stop
echo "サーバーを起動します。"
docker compose up -d
echo "サーバーを再起動しました。エラーが出ていなければ「PC席予約」のアイコンから予約画面を開いてください。"
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --start-fullscreen "http://localhost:4000/"
pause
