import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 项目站点：base 需指向仓库名
export default defineConfig({
  plugins: [vue()],
  base: '/Zhangkm233.github.io/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
})