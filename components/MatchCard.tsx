'use client'

import type { Match } from '@/types'
import { formatLocalTime, formatBeijingTime, getStageName } from '@/lib/utils'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

type Props = {
  match: Match
  showGroup?: boolean
  useBeijing?: boolean
}

function StatusBadge({ status }: { status: Match['status'] }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-500">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
        </span>
        进行中
      </span>
    )
  }
  if (status === 'finished') {
    return (
      <span className="text-xs text-gray-400 dark:text-gray-500">已结束</span>
    )
  }
  return null
}

export default function MatchCard({ match, showGroup = true, useBeijing = false }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const hasScore =
    match.homeScore !== undefined && match.awayScore !== undefined
  const stageLabel = match.group
    ? `${getStageName(match.stage)} · ${match.group}组`
    : getStageName(match.stage)

  const timeDisplay = mounted
    ? useBeijing
      ? formatBeijingTime(match.date)
      : formatLocalTime(match.date)
    : formatBeijingTime(match.date)

  const beijingDisplay = formatBeijingTime(match.date)

  return (
    <div
      className={clsx(
        'group border rounded-xl p-4 transition-all duration-200',
        'border-gray-100 dark:border-gray-800',
        'hover:border-green-600 dark:hover:border-green-600',
        'bg-white dark:bg-gray-900',
        match.status === 'live' && 'border-green-500 dark:border-green-500',
      )}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded">
            #{match.matchNo}
          </span>
          {showGroup && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {stageLabel}
            </span>
          )}
        </div>
        <StatusBadge status={match.status} />
      </div>

      {/* Teams row */}
      <div className="flex items-center justify-between gap-3">
        {/* Home */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span className="text-2xl leading-none flex-shrink-0">{match.homeFlag}</span>
          <span
            className={clsx(
              'text-sm font-medium truncate',
              'text-gray-900 dark:text-white',
              hasScore && match.homeScore! > match.awayScore! && 'text-green-700 dark:text-green-400',
            )}
          >
            {match.homeTeam}
          </span>
        </div>

        {/* Score / VS */}
        <div className="flex-shrink-0 text-center">
          {hasScore ? (
            <span className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white tracking-tighter">
              {match.homeScore}–{match.awayScore}
            </span>
          ) : (
            <span className="text-xs font-medium text-gray-300 dark:text-gray-600 px-2">
              VS
            </span>
          )}
        </div>

        {/* Away */}
        <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
          <span
            className={clsx(
              'text-sm font-medium truncate text-right',
              'text-gray-900 dark:text-white',
              hasScore && match.awayScore! > match.homeScore! && 'text-green-700 dark:text-green-400',
            )}
          >
            {match.awayTeam}
          </span>
          <span className="text-2xl leading-none flex-shrink-0">{match.awayFlag}</span>
        </div>
      </div>

      {/* Footer row */}
      <div className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-800 flex flex-wrap items-center justify-between gap-1">
        <span className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[55%]">
          📍 {match.venue}
        </span>
        <div className="text-right">
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {timeDisplay}
          </div>
          {!useBeijing && mounted && (
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {beijingDisplay}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
