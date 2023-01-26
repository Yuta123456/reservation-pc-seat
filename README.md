# 開発環境
## Next立ち上げ 
- `npm run dev`
## データベース立ち上げ
- `docker compose up -d`
## データベースマイグレーション
- マイグレーションは、DBを`schema.prisma`に合わせるSQLを発行するための手順（？）
- マイグレーションの`.sql`ファイルの名前をinitに指定。package.jsonを参照
- TODO: 引数に名前を渡すように変更したい
- `npm run migrate:dev`
    - もし `seed`で落ちた場合は、修正後に`npx prisma db seed`を実行
- GUIで確認したい場合は `npm run prisma-studio`
