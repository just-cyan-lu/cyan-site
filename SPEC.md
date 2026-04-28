# cyan-site — 陆思源的个人网站

> 域名：`cyan.lu`（待配置）
> 技术栈：React + Vite + TypeScript
> 定位：个人品牌站 / 摄影作品集 / 创意实验田

---

## 技术方案

### 核心依赖
- **Vite** — 极速构建工具
- **React 18** + **TypeScript** — 类型安全的前端框架
- **React Router** — 路由管理（为多页面预留）
- **Framer Motion** — 丝滑动画
- **Emotion** — CSS-in-JS（组件级样式）

### 项目规范
- 代码风格：ESLint + Prettier
- Git 规范：Conventional Commits（`feat:` `fix:` `docs:` `chore:`）
- 分支策略：`main` 为稳定分支，`dev` 为开发分支

---

## 页面规划

### v1.0 — MVP 单页静态站
- [x] `/` — 主页（个人介绍 + 核心作品入口）
- [ ] `/gallery` — 摄影作品集（规划中）
- [ ] `/blog` — 博客（规划中）

### 主页结构
1. **Hero** — 全屏视觉，大字标题，微动画背景
2. **About** — 个人简介，文字精简
3. **Photography** — 摄影作品展示入口
4. **Contact** — 联系方式（可选）

---

## 设计语言

### 视觉方向：「凝固 / Freezed」
- 迷恋"瞬间定格"的质感——按下快门的那一刻，整个世界凝固
- 深色极简背景 + 高饱和点缀色
- 胶片颗粒感 + 几何线条

### 配色
| 用途 | 色值 |
|------|------|
| 主色（深） | `#0a0a0f` |
| 背景 | `#111118` |
| 卡片 | `#1a1a24` |
| 主强调 | `#e8c547`（暖金） |
| 次强调 | `#4ecdc4`（薄荷） |
| 正文 | `#e8e8f0` |
| 文字次级 | `#8888a0` |

### 字体
- 标题：**Noto Serif SC**（中文衬线，有质感）
- 正文：**Noto Sans SC**（中文无衬线，干净）
- 英文/数字：**Space Grotesk**（几何感）

---

## 开发指南

### 本地开发
```bash
pnpm install
pnpm dev        # 开发模式 localhost:5173
pnpm build      # 生产构建
pnpm preview    # 预览构建结果
```

### 部署
- 构建产物在 `dist/`，可部署到任意静态托管（Vercel / Netlify / Cloudflare Pages）
- CI/CD：GitHub Actions（推送 `main` 自动部署）

---

## 维护记录

| 日期 | 内容 |
|------|------|
| 2026-04-28 | 项目初始化，v1.0 MVP 主页上线 |
