# 世界杯赛程时间

2026 FIFA 世界杯赛程信息站，基于 Next.js 15 + TypeScript + Tailwind CSS 构建。

## 快速开始

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
├── app/
│   ├── layout.tsx          # 根布局（导航 + ThemeProvider）
│   ├── page.tsx            # 首页（赛程总览 + 倒计时）
│   ├── groups/page.tsx     # 小组赛积分榜
│   ├── bracket/page.tsx    # 淘汰赛对阵图
│   └── about/page.tsx      # 关于
├── components/
│   ├── MatchCard.tsx       # 比赛卡片
│   ├── Countdown.tsx       # 倒计时
│   ├── GroupTable.tsx      # 积分榜表格
│   ├── Bracket.tsx         # 对阵图（client）
│   ├── Filters.tsx         # 筛选器（client）
│   ├── MatchesClient.tsx   # 赛程列表（含筛选逻辑，client）
│   ├── TimezoneToggle.tsx  # 时区切换
│   ├── Navigation.tsx      # 顶部导航
│   └── ThemeProvider.tsx   # 深色模式 Provider
├── data/
│   ├── matches.ts          # ⭐ 赛程数据（此处补全）
│   └── groups.ts           # ⭐ 小组球队数据（此处补全）
├── lib/
│   └── utils.ts            # 工具函数（时间格式化、筛选等）
└── types/
    └── index.ts            # TypeScript 类型定义
```

## 如何补全赛程数据

### 添加比赛（data/matches.ts）

```ts
{
  id: 'm9',               // 唯一 ID，格式 m + 序号
  matchNo: 9,             // 官方比赛编号 1–104
  date: '2026-06-14T00:00:00Z',  // UTC 时间，ISO 8601 格式
  stage: 'group',         // 'group' | 'round32' | 'round16' | 'quarter' | 'semi' | 'third' | 'final'
  group: 'B',             // 小组赛填 'A'–'L'，淘汰赛留空
  homeTeam: '巴西',
  awayTeam: '意大利',
  homeFlag: '🇧🇷',
  awayFlag: '🇮🇹',
  venue: 'MetLife Stadium，新泽西',
  status: 'scheduled',    // 'scheduled' | 'live' | 'finished'
  // homeScore: 2,        // 比赛结束后填写
  // awayScore: 1,
}
```

### 比赛编号规划（1–104）

| 阶段     | 场次 | 编号      | 日期         |
|----------|------|-----------|--------------|
| 小组赛   | 72   | m1–m72    | 6/11–6/27    |
| 32 强    | 16   | m73–m88   | 6/28–7/3     |
| 16 强    | 8    | m89–m96   | 7/4–7/7      |
| 1/4 决赛 | 4    | m97–m100  | 7/9–7/11     |
| 半决赛   | 2    | m101–m102 | 7/14–7/15    |
| 季军赛   | 1    | m103      | 7/18         |
| 决赛     | 1    | m104      | 7/19         |

### 更新积分榜（data/groups.ts）

比赛结束后，更新对应球队的 `played / won / drawn / lost / gf / ga / pts` 字段，积分榜将自动排序。

### 更新小组球队（data/groups.ts）

如需修正球队分配，直接编辑 `GROUP_DATA` 数组中对应小组的 `teams` 字段。

## 技术栈

- **框架**：Next.js 15（App Router）
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **深色模式**：next-themes
- **时区处理**：浏览器原生 `Intl.DateTimeFormat`（无外部依赖）
- **部署**：Vercel（零配置）

## 部署到 Vercel

```bash
npx vercel
```

或直接连接 GitHub 仓库，Vercel 会自动检测 Next.js 并部署。
