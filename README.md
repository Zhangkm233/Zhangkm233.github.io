# 个人作品集网站

基于 **Vite + Vue 3** 构建的个人独立游戏作品集网站，展示 Unity 游戏开发项目。

## 技术栈

- Vue 3（组合式 API）
- Vue Router（hash 模式）
- Vite 构建
- 得意黑（SmileySans-Oblique）字体

## 本地开发

```bash
npm install
npm run dev
```

访问 `http://localhost:5173/Zhangkm233.github.io/`

## 生产构建

```bash
npm run build
```

产物输出到 `dist/` 目录。

## 部署到 GitHub Pages

项目已配置 GitHub Actions 自动部署（`.github/workflows/deploy.yml`）。

**首次部署前需在仓库设置中开启 Pages**：
1. 进入仓库 Settings → Pages
2. Source 选择 **GitHub Actions**

之后每次 `git push` 到 `main` 分支，GitHub Actions 会自动构建并部署。

## 项目结构

```
├── .github/workflows/deploy.yml   # 自动部署工作流
├── public/
│   ├── fonts/                     # 字体文件
│   └── images/                    # 游戏截图
├── src/
│   ├── assets/styles/             # 全局样式与字体定义
│   ├── components/                # 公共组件
│   ├── data/projects.js           # 项目数据（新增项目在此添加）
│   ├── router/                    # 路由配置
│   └── views/                     # 页面视图
└── vite.config.js                 # Vite 配置（base 指向仓库名）
```

## 新增游戏项目

在 `src/data/projects.js` 的 `projects` 数组中追加一个对象即可，首页与详情页会自动渲染。