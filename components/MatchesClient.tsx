'use client'

import { useState, useMemo } from 'react'
import type { Match, FilterState } from '@/types'
import Filters from '@/components/Filters'
import MatchCard from '@/components/MatchCard'
import TimezoneToggle from '@/components/TimezoneToggle'
import { groupMatchesByDate, formatDateLabel } from '@/lib/utils'

type Props = {
  matches: Match[]
}

export default function MatchesClient({ matches }: Props) {
  const [filters, setFilters] = useState<FilterState>({ stage: '' })
  const [useBeijing, setUseBeijing] = useState(false)

  const filtered = useMemo(() => {
    return matches.filter((m) => {
      if (filters.stage && m.stage !== filters.stage) return false
      if (filters.group && m.group !== filters.group) return false
      return true
    })
  }, [matches, filters])

  const grouped = useMemo(() => groupMatchesByDate(filtered), [filtered])

  const dateKeys = useMemo(
    () =>
      Object.keys(grouped).sort((a, b) => {
        const da = new Date(a.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3'))
        const db = new Date(b.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3'))
        return da.getTime() - db.getTime()
      }),
    [grouped],
  )

  const dateFiltered = useMemo(() => {
    if (!filters.date) return dateKeys
    return dateKeys.filter((k) => k === filters.date)
  }, [dateKeys, filters.date])

  const totalMatches = dateFiltered.reduce(
    (sum, k) => sum + grouped[k].length,
    0,
  )

  return (
    <div className="space-y-6">
      <Filters onFilterChange={setFilters} current={filters} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          共 <span className="font-semibold text-gray-900 dark:text-white">{totalMatches}</span> 场比赛
        </p>
        <TimezoneToggle useBeijing={useBeijing} onChange={setUseBeijing} />
      </div>

      {dateFiltered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <p className="text-4xl mb-3">⚽</p>
          <p className="text-sm">没有符合筛选条件的比赛</p>
        </div>
      ) : (
        dateFiltered.map((dateKey) => (
          <section key={dateKey}>
            <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              {formatDateLabel(
                dateKey.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3'),
              )}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {grouped[dateKey].map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  useBeijing={useBeijing}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
