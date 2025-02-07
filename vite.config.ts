import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/slowly-birds-viewer/',
  server: {
    fs: {
      // プロジェクトルートの外のファイルへのアクセスを許可
      allow: ['..']
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 静的アセットのファイル名にハッシュを含める
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // publicディレクトリの処理を設定
    copyPublicDir: true
  }
})
