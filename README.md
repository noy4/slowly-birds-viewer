# Slowly Birds 友の会 ログビューワー

Slackエクスポートデータを閲覧するためのWebアプリケーションです。

## 開発環境のセットアップ

```bash
# 依存パッケージのインストール
npm install

# データの変換
npm run convert-data

# 開発サーバーの起動
npm run dev
```

## ビルド

```bash
# 本番用ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## デプロイ

mainブランチにプッシュすると、GitHub Actionsによって自動的にGitHub Pagesにデプロイされます。

## 技術スタック

- React
- TypeScript
- Vite
- Chakra UI
- React Router
- dayjs
