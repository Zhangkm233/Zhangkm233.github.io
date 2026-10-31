# 3KkM · 个人游戏作品集

基于 **Vite + Vue 3** 构建的独立游戏制作人作品集网站，展示 Unity / C# 游戏开发项目。

线上地址：<https://zhangkm233.github.io/>

## 技术栈

- Vue 3（组合式 API，`<script setup>`）
- Vue Router 4（hash 模式，适配 GitHub Pages）
- Vite 5 构建
- 原生 CSS 设计令牌（无 UI 框架、无 CSS 预处理器）

## 本地开发

```bash
npm install
npm run dev
```

访问终端提示的地址（默认 `http://localhost:5173/Zhangkm233.github.io/`）。

> 需要 **Node.js 18+**（Vite 5 的最低要求）。

## 生产构建

```bash
npm run build     # 产物输出到 dist/
npm run preview   # 本地预览构建结果
```

## 部署到 GitHub Pages

已配置 GitHub Actions 自动部署（[.github/workflows/deploy.yml](.github/workflows/deploy.yml)）。

首次部署前需在仓库中开启 Pages：

1. 进入仓库 **Settings → Pages**
2. **Source** 选择 **GitHub Actions**

之后每次 push 到 `main` 分支，会自动构建并部署。

## 项目结构

```
├── .github/workflows/deploy.yml   # 自动部署工作流
├── public/
│   ├── fonts/                     # 展示字体（得意黑，仅用于标题）
│   ├── images/                    # 游戏截图（WebP / AVIF）
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/styles/
│   │   ├── main.css               # 设计令牌 + 全局样式
│   │   └── font.css               # @font-face 定义
│   ├── components/
│   │   ├── NavBar.vue             # 固定导航 + 主题切换 + 移动端菜单
│   │   ├── ProjectCard.vue        # 项目卡片
│   │   ├── BiliEmbed.vue          # B 站播放器（点击后加载）
│   │   ├── Lightbox.vue           # 图片放大预览
│   │   ├── BackToTop.vue
│   │   └── FooterBar.vue
│   ├── composables/useTheme.js    # 亮 / 暗主题（持久化到 localStorage）
│   ├── data/projects.js           # 项目数据（新增项目在此添加）
│   ├── router/index.js            # 路由配置
│   ├── views/
│   │   ├── HomeView.vue           # 首页：Hero / 项目网格 / 关于 / 联系
│   │   └── ProjectView.vue        # 详情页：目录 / 正文 / 画廊 / 上下篇
│   └── main.js                    # 应用入口 + v-reveal 指令
└── vite.config.js                 # Vite 配置（base 指向仓库名）
```

## 新增游戏项目

在 [src/data/projects.js](src/data/projects.js) 的 `projects` 数组中追加一个对象，首页网格与详情页会自动渲染。

```js
{
  id: 7,                          // 唯一数字，用作 /project/:id
  title: '项目名',
  subtitle: '一句话定位',
  category: '卡牌策略',            // 需在 categories 数组中登记才会出现筛选按钮
  date: '2026年',
  role: '主程，Unity 客户端开发',
  tools: 'Unity, C#',
  tags: ['标签一', '标签二'],
  cover: img('/images/xxx.webp'),
  cardDescription: '卡片简介',
  description: `<p>富文本介绍</p><h2>小标题</h2><p>正文</p>`,
  heroMedia: { type: 'image', src: img('/images/xxx.webp') },
  // 或 { type: 'bilibili', bvid: 'BV1xxxxxxxxx' }
  gallery: [{ src: img('/images/xxx.webp'), alt: '说明', fullWidth: false }],
  highlights: [{ icon: '📦', title: '亮点', description: '说明' }],
  links: { steam: 'https://store.steampowered.com/app/xxx/' },
  // links 支持 steam / github / download，留空的按钮不会渲染
  featured: false                 // 为 true 时出现在首页 Hero 的「最新作品」卡片
}
```

**注意事项**

- `description` 中的每个 `<h2>` 会自动生成详情页右侧目录。
- 图片建议先转成 WebP（质量 80 左右），单张控制在 300KB 以内。
- `category` 决定首页筛选分组；新增分类需同步加到文件末尾的 `categories` 数组。

## 设计约定

- **字体**：正文使用系统 UI 字体保证长文可读性；得意黑仅用于标题（`--font-display`）。
- **颜色 / 间距 / 圆角 / 动效**：全部定义在 [main.css](src/assets/styles/main.css) 的 `:root` 令牌中，不要在组件里写死数值。
- **亮暗主题**：通过 `<html data-theme="light|dark">` 切换，令牌在 `[data-theme='light']` 中覆盖。
- **无障碍**：交互元素使用语义标签，提供 `aria-label`、键盘焦点样式与跳过导航链接；动效尊重 `prefers-reduced-motion`。
