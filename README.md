made with Roo code
[Slowly birds 友の会の活動記録サイトを Roo Code とかいうAIに作ってもらう](https://youtu.be/t5Fvqq2mH3c)

# Slowly Birds 友の会 ログビューワー
Slackエクスポートデータを閲覧するためのWebアプリケーションです。

## 開発環境のセットアップ

```bash
# 依存パッケージのインストール
npm install

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

### フレームワーク・ライブラリ
- React v18
- TypeScript v5.7
- Vite v6
- React Router v7

### UI・スタイリング
- Chakra UI v2
- Emotion
- Framer Motion

### ユーティリティ
- dayjs
- emoji-mart
- emoji-regex

### 開発ツール
- ESLint v9
- TypeScript ESLint
