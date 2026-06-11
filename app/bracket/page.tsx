import type { Metadata } from 'next'
import { MATCHES } from '@/data/matches'
import Bracket from '@/components/Bracket'

export const metadata: Metadata = {
  title: '淘汰赛对阵',
  description: '2026 FIFA 世界杯淘汰赛对阵图，从32强到决赛的完整赛程。',
}

const TIMELINE = [
  { stage: '32强', date: '6/28–7/3', matches: 16 },
  { stage: '16强', date: '7/4–7/7', matches: 8 },
  { stage: '1/4决赛', date: '7/9–7/11', matches: 4 },
  { stage: '半决赛', date: '7/14–7/15', matches: 2 },
  { stage: '季军赛', date: '7/18', matches: 1 },
  { stage: '决赛', date: '7/19', matches: 1 },
]

const knockoutMatches = MATCHES.filter(
  (m) =>
    m.stage === 'round32' ||
    m.stage === 'round16' ||
    m.stage === 'quarter' ||
    m.stage === 'semi' ||
    m.stage === 'third' ||
    m.stage === 'final',
)

export default function BracketPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          淘汰赛对阵图
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
          32 强 → 16 强 → 1/4 决赛 → 半决赛 → 决赛，共 32 场
        </p>
      </section>

      {/* Timeline */}
      <div className="overflow-x-auto">
        <div className="inline-flex gap-0 min-w-max">
          {TIMELINE.map((item, idx) => (
            <div key={item.stage} className="flex items-center">
              <div className="px-3 py-2.5 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-center min-w-[90px]">
                <div className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                  {item.stage}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {item.date}
                </div>
                <div className="text-xs text-green-600 dark:text-green-500 mt-0.5">
                  {item.matches} 场
                </div>
              </div>
              {idx < TIMELINE.length - 1 && (
                <div className="w-6 flex items-center justify-center text-gray-200 dark:text-gray-700">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bracket */}
      <div className="border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6 bg-gray-50/50 dark:bg-gray-900/30">
        <Bracket matches={knockoutMatches} />
      </div>

      {/* Note */}
      <div className="rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10 p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>赛制说明：</strong>本届首次 48 队参赛，淘汰赛从 32 强开始（往届为 16 强起步）。
          32 支球队 = 各组前 2 名（24 队）+ 最佳 8 个第三名（8 队）。
          决赛于 2026 年 7 月 19 日在新泽西 MetLife Stadium 举行。
        </p>
      </div>
    </div>
  )
}
