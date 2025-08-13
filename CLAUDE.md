# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 对话语言规则 (Communication Language Rules)

**重要**: 始终使用中文与用户对话，包括代码解释、错误信息和技术讨论。

## 项目架构 (Project Architecture)

这是一个基于 Next.js 15 的管理后台模板项目，使用以下技术栈：
- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4 + class-variance-authority
- **UI组件**: Shadcn/ui (配置在 components.json)
- **状态管理**: Zustand
- **HTTP客户端**: Axios
- **图标**: Lucide React

## 开发命令 (Development Commands)

```bash
# 启动开发服务器 (使用 Turbopack)
npm run dev

# 构建项目
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 目录结构规范 (Directory Structure)

```
src/
├── app/                    # Next.js App Router 页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局组件
│   └── page.tsx          # 首页组件
├── lib/                   # 工具函数库
│   └── utils.ts          # 通用工具函数 (包含 cn 类名合并函数)
└── components/            # 组件目录 (通过别名 @/components 访问)
    └── ui/               # UI 基础组件 (Shadcn/ui)
```

## 关键配置说明 (Configuration Details)

- **路径别名**: 使用 `@/*` 指向 `./src/*`，在 tsconfig.json 中配置
- **Shadcn/ui**: 采用 "new-york" 风格，启用 CSS 变量，图标库使用 Lucide
- **Tailwind CSS**: 版本 4，配置在 postcss.config.mjs
- **ESLint**: 自定义规则关闭了 `react-hooks/exhaustive-deps` 和 `@next/next/no-img-element`

## 开发规范 (Development Guidelines)

1. **组件开发**: 使用 Shadcn/ui 组件系统，新组件放在 `@/components/ui`
2. **样式处理**: 使用 `cn()` 函数合并 Tailwind 类名 (来自 `@/lib/utils`)
3. **类型安全**: 严格的 TypeScript 配置，启用所有严格检查
4. **状态管理**: 使用 Zustand 进行全局状态管理
5. **HTTP 请求**: 使用 Axios 处理 API 调用

## 字体配置 (Font Configuration)

项目使用 Vercel 的 Geist 字体族：
- Geist Sans: 主要字体
- Geist Mono: 等宽字体
- 通过 CSS 变量 `--font-geist-sans` 和 `--font-geist-mono` 配置