import type { Metadata } from 'next'
import { GROUP_DATA } from '@/data/groups'
import GroupTable from '@/components/GroupTable'

export const metadata: Metadata = {
  title: '小组赛',
  description: '2026 FIFA 世界杯12个小组（A–L）积分榜，每组4支球队，共48支球队。',
}

export default function GroupsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          小组赛积分榜
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          A–L 共 12 个小组，每组 4 队，组内循环赛制
        </p>
      </section>

      {/* Advancement rule */}
      <div className="rounded-xl border border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/10 p-4">
        <h2 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-2">
          📋 晋级规则（2026 新赛制）
        </h2>
        <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-none">
          <li>· 每组前 <strong>2 名</strong>直接晋级 32 强，共 24 队</li>
          <li>· 12 个小组中排名第 3 且成绩<strong>最好的 8 支球队</strong>也晋级 32 强</li>
          <li>· 共 32 支球队进入淘汰赛，从 32 强开始（有别于往届 16 强起步）</li>
          <li>· 小组第三名晋级评定标准：积分 → 净胜球 → 进球数 → 纪律分 → 抽签</li>
        </ul>
      </div>

      {/* Groups grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {GROUP_DATA.map((group) => (
          <GroupTable key={group.id} group={group} showAdvancement />
        ))}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center pt-4">
        小组赛：2026年6月11日 – 6月27日 · 积分数据赛后更新
      </p>
    </div>
  )
}
