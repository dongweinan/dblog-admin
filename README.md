# dblog-admin

dblog 博客系统的后台管理端，基于 Next.js App Router 构建，提供博客内容管理界面和 RESTful API。

## 技术栈

| 类别         | 技术                                                       |
| ------------ | ---------------------------------------------------------- |
| 框架         | [Next.js 16](https://nextjs.org/) (App Router)             |
| 运行时       | [React 19](https://react.dev/)                             |
| 语言         | [TypeScript 5](https://www.typescriptlang.org/)            |
| 样式         | [Tailwind CSS v4](https://tailwindcss.com/)                |
| 代码检查     | [ESLint 9](https://eslint.org/)                            |
| 构建工具     | [Turbopack](https://turbo.build/pack) (开发模式)           |

## 项目结构

```
dblog-admin/
├── app/                      # App Router 根目录
│   ├── layout.tsx            # 根布局（字体、全局元数据）
│   ├── page.tsx              # 首页 / 仪表盘
│   ├── globals.css           # 全局样式 & Tailwind 配置
│   ├── favicon.ico           # 网站图标
│   ├── api/                  # [待创建] API 路由 (route.ts)
│   │   └── posts/            # 博客文章 CRUD API
│   ├── admin/                # [待创建] 后台管理页面
│   │   ├── layout.tsx        # 后台管理布局（侧边栏 + 顶栏）
│   │   ├── page.tsx          # 仪表盘首页
│   │   ├── posts/            # 文章管理
│   │   ├── categories/       # 分类管理
│   │   └── settings/         # 系统设置
│   └── lib/                  # [待创建] 共享工具库
│       ├── db.ts             # 数据库连接
│       ├── auth.ts           # 认证逻辑
│       └── utils.ts          # 通用工具函数
├── public/                   # 静态资源
├── next.config.ts            # Next.js 配置
├── tsconfig.json             # TypeScript 配置
├── eslint.config.mjs          # ESLint 配置
├── package.json              # 依赖与脚本
└── .gitignore                # Git 忽略规则
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

## 可用脚本

| 命令           | 说明                        |
| -------------- | -------------------------- |
| `npm run dev`  | 启动 Turbopack 开发服务器    |
| `npm run build`| 生产构建                    |
| `npm run start`| 启动生产服务器               |
| `npm run lint` | 运行 ESLint 代码检查         |

## Next.js 16 关键特性

本项目基于 Next.js 16，与旧版本有以下重要差异：

- **Route Handlers**：API 路由使用 `app/api/xxx/route.ts` 文件（非 pages/api），导出 `GET`/`POST`/`PUT`/`DELETE` 等 HTTP 方法函数。
- **Server Functions**：数据变更使用 `'use server'` 指令标记的 Server Functions，配合 `<form action>` 或 `startTransition` 调用。
- **缓存行为**：`fetch` 请求**默认不缓存**。如需缓存使用 `'use cache'` 指令或 Cache Components。
- **Turbopack**：开发模式下默认使用 Turbopack 构建，速度更快。
- **LayoutProps**：TypeScript 布局组件的 props 类型使用 `LayoutProps<"/">` 模式。
- **Tailwind CSS v4**：使用 `@import "tailwindcss"` + `@theme` 语法，不再需要 `tailwind.config.ts`。

## 部署

```bash
npm run build
npm run start
```

也可以部署到 [Vercel](https://vercel.com) 或其他支持 Next.js 的平台。