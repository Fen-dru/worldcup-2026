'use client'

import { useEffect, useState } from 'react'
import type { Match } from '@/types'
import { formatBeijingTime, getStageName } from '@/lib/utils'

type Props = {
  match: Match
}

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  started: boolean
}

function calcTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds, started: false }
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl sm:text-5xl font-bold tabular-nums text-gray-900 dark:text-white leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">
        {label}
      </span>
    </div>
  )
}

export default function Countdown({ match }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calcTimeLeft(match.date),
  )

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(match.date)), 1000)
    return () => clearInterval(id)
  }, [match.date])

  const stageLabel = match.group
    ? `${getStageName(match.stage)} · ${match.group}组`
    : getStageName(match.stage)

  return (
    <div className="border border-green-600 dark:border-green-600 rounded-2xl p-6 sm:p-8 bg-white dark:bg-gray-900">
      <p className="text-xs font-medium text-green-600 dark:text-green-500 tracking-widest uppercase mb-4">
        距下一场比赛
      </p>

      {timeLeft.started ? (
        <p className="text-2xl font-bold text-green-600 dark:text-green-500">
          比赛已开始！
        </p>
      ) : (
        <div className="flex items-end gap-4 sm:gap-6">
          <Digit value={timeLeft.days} label="天" />
          <span className="text-3xl font-light text-gray-300 dark:text-gray-600 mb-5">:</span>
          <Digit value={timeLeft.hours} label="时" />
          <span className="text-3xl font-light text-gray-300 dark:text-gray-600 mb-5">:</span>
          <Digit value={timeLeft.minutes} label="分" />
          <span className="text-3xl font-light text-gray-300 dark:text-gray-600 mb-5">:</span>
          <Digit value={timeLeft.seconds} label="秒" />
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{match.homeFlag}</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {match.homeTeam}
          </span>
          <span className="text-xs text-gray-400">vs</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {match.awayTeam}
          </span>
          <span className="text-lg">{match.awayFlag}</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 dark:text-gray-400">{stageLabel}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {formatBeijingTime(match.date)}
          </div>
        </div>
      </div>
    </div>
  )
}
