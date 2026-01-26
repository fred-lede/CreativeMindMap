import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import packageJson from './package.json'

// 處理 author 可能是物件或字串的情況
const authorName = typeof packageJson.author === 'object' ? packageJson.author.name : packageJson.author;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    // 注入版本號
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageJson.version),
    // 注入作者名稱
    'import.meta.env.VITE_APP_AUTHOR': JSON.stringify(authorName)
  }
})