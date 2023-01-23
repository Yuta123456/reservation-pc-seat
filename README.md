# 開発環境
## Next立ち上げ 
- `npm run dev`
## データベース立ち上げ
- `docker compose up -d`
## データベースマイグレーション
- マイグレーションは、DBを`schema.prisma`に合わせるSQLを発行するための手順（？）
- `npx prisma migrate dev --name init`
