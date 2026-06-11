import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于',
  description: '关于世界杯赛程时间 —— 2026 FIFA 世界杯赛程信息站，数据来源及时区处理说明。',
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h2>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          关于本站
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          世界杯赛程时间 — 2026 FIFA 世界杯专题信息站
        </p>
      </header>

      <div className="space-y-8 divide-y divide-gray-100 dark:divide-gray-800 [&>section]:pt-8 first:[&>section]:pt-0">
        <Section title="项目介绍">
          <p>
            本站是一个专为 2026 FIFA 世界杯打造的极简赛程信息站，提供完整赛程查询、小组积分榜及淘汰赛对阵图。
          </p>
          <p>
            2026 年世界杯由美国、加拿大、墨西哥三国联合主办，是史上首次 48 队参赛的世界杯，
            共举办 104 场比赛，比往届增加约 40%。
          </p>
          <p>
            本站使用 <strong className="text-gray-800 dark:text-gray-200">Next.js 15 + TypeScript + Tailwind CSS</strong> 构建，
            全静态部署于 Vercel，无后端、无数据库，数据本地存储。
          </p>
        </Section>

        <Section title="数据来源">
          <p>赛程数据参考以下来源整理：</p>
          <ul className="list-disc list-inside space-y-1 text-gray-500 dark:text-gray-400">
            <li>FIFA 官方网站公告</li>
            <li>Wikipedia 2026 FIFA World Cup 词条</li>
            <li>各主办城市官方新闻稿</li>
          </ul>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            ⚠️ 数据仅供参考，实际比赛时间和场次安排以 FIFA 官方公告为准。
            部分淘汰赛对阵数据为占位符，将在小组赛结束后更新。
          </p>
        </Section>

        <Section title="时区处理">
          <p>
            本站提供<strong className="text-gray-800 dark:text-gray-200">本地时间</strong>与
            <strong className="text-gray-800 dark:text-gray-200">北京时间（UTC+8）</strong>两种显示模式，
            可通过赛程页右上角的时间切换器进行切换。
          </p>
          <p>
            时区转换使用浏览器内置的 <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono">Intl.DateTimeFormat</code> API 实现，
            无需额外依赖库，确保时区显示准确。
          </p>
          <p>
            所有原始时间数据以 <strong className="text-gray-800 dark:text-gray-200">UTC 格式</strong>存储，
            客户端渲染时自动转换为用户本地时间或北京时间。
          </p>
        </Section>

        <Section title="晋级规则说明">
          <p>
            <strong className="text-gray-800 dark:text-gray-200">小组赛阶段（72场）：</strong>
            12 个小组（A–L），每组 4 支球队，各踢 3 场循环赛（每组 6 场）。
          </p>
          <p>
            <strong className="text-gray-800 dark:text-gray-200">32 强晋级：</strong>
            每组前 2 名自动晋级（共 24 队），加上 12 个小组中排名第三且成绩最好的 8 支球队，
            共 32 支球队进入淘汰赛。
          </p>
          <p>
            <strong className="text-gray-800 dark:text-gray-200">第三名比较标准（依次）：</strong>
          </p>
          <ol className="list-decimal list-inside space-y-1 text-gray-500 dark:text-gray-400">
            <li>积分</li>
            <li>净胜球</li>
            <li>进球数</li>
            <li>纪律分（黄牌/红牌）</li>
            <li>FIFA 排名</li>
            <li>抽签</li>
          </ol>
          <p>
            <strong className="text-gray-800 dark:text-gray-200">淘汰赛阶段（32场）：</strong>
            32强 → 16强 → 1/4决赛 → 半决赛 → 季军赛 + 决赛。
            与往届不同，本届淘汰赛从 32 强开始而非 16 强。
          </p>
        </Section>

        <Section title="如何补全赛程数据">
          <p>
            项目代码中的 <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono">data/matches.ts</code> 文件包含完整的数据结构。
            当前仅填充了揭幕战（A组、D组部分场次）及淘汰赛占位数据。
          </p>
          <p>按以下步骤补全剩余赛程：</p>
          <ol className="list-decimal list-inside space-y-1 text-gray-500 dark:text-gray-400">
            <li>参照已有条目格式，在 <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono">MATCHES</code> 数组中添加条目</li>
            <li>小组赛共 72 场，比赛编号 m1–m72</li>
            <li>确保 <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono">date</code> 字段使用 ISO 8601 UTC 格式</li>
            <li>更新 <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono">data/groups.ts</code> 中的球队分配</li>
          </ol>
        </Section>
      </div>
    </div>
  )
}
