# プロジェクト概要
ラーニングコモンズのPC予約席のシステムになります。

# 技術スタック
- Next.js
- ChakraUI
- Docker
- supabase 
  - 認証
  - 外部DB
- prisma
- swr
- recoil
# 開発環境
## Next立ち上げ 
- `npm run dev`
## データベース立ち上げ
- `docker compose up -d`
- この時、localhost:4000にはビルド済みのものが立つ。もしビルド済みのものが無い場合はエラーを吐く可能性あり
## データベースマイグレーション
- マイグレーションは、DBを`schema.prisma`に合わせるSQLを発行するための手順（？）
- マイグレーションの`.sql`ファイルの名前をinitに指定。package.jsonを参照
- TODO: 引数に名前を渡すように変更したい
- `npm run migrate:dev`
    - もし `seed`で落ちた場合は、修正後に`npx prisma db seed`を実行
- GUIで確認したい場合は `npm run prisma-studio`
- `SyntaxError: Cannot use import statement outside a module`で落ちる場合には `package.json`に `"type": "module"`を追加し実行。その後に元に戻すことを忘れずに
- `npx prisma generate` 型を良い感じに

# 本番環境（ラーニングコモンズ内での立ち上げ）
Docker上でビルドさせようと思ったが、中々処理が重い可能性があるので、localでビルドしてから`.next`ディレクトリをサーブする感じで。
- `npx next build`
- `docker compose up -d --build`

## 失敗しそうなところ
- Docker Desktopが立ち上がっていない
- dockerを立ち上げるときに何かしらエラーがおこっている（Docker Desktopのログをみる）

### この辺は分からないならやらなくていい
- prisma generateが走っていない（TypeScript用の型が無い）
- primsa migrateが走っていない（DBの整合性）
- Dockerfileがnode:latestなのでversionの何かで落ちる。prisma clientのbinaryTargets
