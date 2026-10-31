import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * 部署形态说明：
 *
 * 本仓库名为 Zhangkm233.github.io，属于 GitHub Pages 的「用户站点」。
 * 用户站点会被发布到域名根路径（https://zhangkm233.github.io/），
 * 而不是 https://zhangkm233.github.io/Zhangkm233.github.io/。
 *
 * 因此 base 必须是 '/'，否则所有静态资源都会指向不存在的子路径，
 * 导致线上页面白屏（资源请求被 404 兜底为 index.html）。
 *
 * 若将来改为「项目站点」（仓库名不是 <user>.github.io），
 * 才需要把 base 改成 '/<仓库名>/'。
 */
export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
})
