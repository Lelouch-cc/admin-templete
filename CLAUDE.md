# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 对话语言规则 (Communication Language Rules)

**重要**: 始终使用中文与用户对话，包括代码解释、错误信息和技术讨论。

## 项目架构 (Project Architecture)

这是一个基于 Next.js 15 的管理后台模板项目，使用以下技术栈：

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4 + class-variance-authority
- **UI 组件**: Shadcn/ui (配置在 components.json)
- **状态管理**: Zustand
- **HTTP 客户端**: Axios
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
5. **HTTP 请求**: 使用统一的 Axios 服务层处理 API 调用

## API 集成架构 (API Integration Architecture)

**Axios 配置层次**:

```
src/lib/axios.ts          # Axios 实例配置，拦截器
src/lib/api.ts            # 通用 API 服务类
src/types/api.ts          # API 相关类型定义
src/services/            # 具体业务 API 服务
```

**使用方式**:

- 基础 URL: 通过 `NEXT_PUBLIC_API_BASE_URL` 环境变量配置
- 认证: 自动添加 Bearer Token，401 时自动跳转登录
- 错误处理: 统一的响应拦截和错误处理
- 服务封装: 按业务模块创建服务类 (如 `userService`)

**示例用法**:

```typescript
import userService from "@/services/user";

// 登录
const { data } = await userService.login({ username, password });

// 获取用户列表
const response = await userService.getUserList({ page: 1, limit: 10 });
```

## 字体配置 (Font Configuration)

项目使用 Vercel 的 Geist 字体族：

- Geist Sans: 主要字体
- Geist Mono: 等宽字体
- 通过 CSS 变量 `--font-geist-sans` 和 `--font-geist-mono` 配置
