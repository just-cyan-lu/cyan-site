# cyan-site

> 陆思源的个人网站 — 摄影 · 代码 · 创意

**域名：** `cyan.lu`（待 DNS 配置）

---

## 🛠 技术栈

| 技术 | 用途 |
|------|------|
| React 18 + TypeScript | 核心框架 |
| Vite | 构建工具 |
| React Router | 路由管理 |
| Framer Motion | 动画 |
| Emotion | CSS-in-JS 样式 |

---

## 🚀 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器（http://localhost:5173）
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 🌐 部署

```bash
# 构建 + 上传到服务器
pnpm build && node /home/claw/.openclaw/workspace/scripts/upload_cyan.js
```

部署脚本会通过 SFTP 将 `dist/` 内容同步到服务器 `/data/website_cyan/`，并自动重载 nginx。

---

## 📁 项目结构

```
cyan-site/
├── public/
│   └── favicon.svg          # 网站图标
├── src/
│   ├── App.tsx              # 根组件 + 路由
│   ├── main.tsx             # 入口文件
│   ├── pages/
│   │   └── Home.tsx         # 主页（单页）
│   └── styles/
│       └── global.css       # 全局样式 + CSS 变量
├── index.html               # HTML 模板
├── SPEC.md                  # 项目规格文档
└── package.json
```

---

## 🎨 设计语言

**概念：凝固 / Freezed** — 迷恋"瞬间定格"的质感

- 深色极简背景（#111118）
- 暖金强调色（#e8c547）
- 薄荷点缀（#4ecdc4）
- 胶片颗粒叠加层
- 大字体衬线标题 + 无衬线正文

---

## 🌐 部署

`pnpm build` 生成的 `dist/` 目录可部署到任意静态托管：

- **Vercel** — `vercel --prod`
- **Netlify** — 直连拖拽
- **Cloudflare Pages** — 连接 GitHub 自动部署

---

## 📝 维护记录

| 日期 | 内容 |
|------|------|
| 2026-04-28 | 项目初始化，v1.0 MVP 主页上线 |
