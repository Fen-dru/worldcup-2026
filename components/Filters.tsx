'use client'

import type { FilterState, Stage } from '@/types'
import { getTodayKey, getTomorrowKey } from '@/lib/utils'
import clsx from 'clsx'

type Props = {
  onFilterChange: (filters: FilterState) => void
  current: FilterState
}

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

const STAGES: { value: Stage | ''; label: string }[] = [
  { value: '', label: '全部' },
  { value: 'group', label: '小组赛' },
  { value: 'round32', label: '32强' },
  { value: 'round16', label: '16强' },
  { value: 'quarter', label: '1/4决赛' },
  { value: 'semi', label: '半决赛' },
  { value: 'third', label: '季军赛' },
  { value: 'final', label: '决赛' },
]

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150',
        active
          ? 'bg-green-600 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
      )}
    >
      {children}
    </button>
  )
}

export default function Filters({ onFilterChange, current }: Props) {
  const todayKey = getTodayKey()
  const tomorrowKey = getTomorrowKey()

  const update = (patch: Partial<FilterState>) => {
    onFilterChange({ ...current, ...patch })
  }

  return (
    <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
      {/* Date row */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-gray-400 dark:text-gray-500 w-10 flex-shrink-0">日期</span>
        <FilterChip
          active={current.date === undefined}
          onClick={() => update({ date: undefined })}
        >
          全部
        </FilterChip>
        <FilterChip
          active={current.date === todayKey}
          onClick={() => update({ date: todayKey })}
        >
          今天
        </FilterChip>
        <FilterChip
          active={current.date === tomorrowKey}
          onClick={() => update({ date: tomorrowKey })}
        >
          明天
        </FilterChip>
      </div>

      {/* Group row */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-gray-400 dark:text-gray-500 w-10 flex-shrink-0">小组</span>
        <FilterChip
          active={current.group === undefined}
          onClick={() => update({ group: undefined })}
        >
          全部
        </FilterChip>
        {GROUPS.map((g) => (
          <FilterChip
            key={g}
            active={current.group === g}
            onClick={() => update({ group: g })}
          >
            {g}组
          </FilterChip>
        ))}
      </div>

      {/* Stage row */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-gray-400 dark:text-gray-500 w-10 flex-shrink-0">阶段</span>
        {STAGES.map(({ value, label }) => (
          <FilterChip
            key={value}
            active={current.stage === value}
            onClick={() => update({ stage: value })}
          >
            {label}
          </FilterChip>
        ))}
      </div>
    </div>
  )
}
