'use client'

import type { Match } from '@/types'
import { getStageName } from '@/lib/utils'
import clsx from 'clsx'

type Props = {
  matches: Match[]
}

function BracketSlot({ match }: { match?: Match }) {
  if (!match) {
    return (
      <div className="w-44 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-900 opacity-40">
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded" />
        <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded" />
      </div>
    )
  }

  const hasScore =
    match.homeScore !== undefined && match.awayScore !== undefined

  return (
    <div
      className={clsx(
        'w-44 border rounded-lg p-2.5 bg-white dark:bg-gray-900 transition-colors',
        'border-gray-100 dark:border-gray-800',
        'hover:border-green-500 dark:hover:border-green-500',
        match.status === 'live' && 'border-green-500 dark:border-green-500',
      )}
    >
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-sm leading-none flex-shrink-0">{match.homeFlag}</span>
          <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
            {match.homeTeam}
          </span>
        </div>
        {hasScore && (
          <span
            className={clsx(
              'text-xs font-bold tabular-nums flex-shrink-0',
              match.homeScore! > match.awayScore!
                ? 'text-green-600 dark:text-green-500'
                : 'text-gray-400',
            )}
          >
            {match.homeScore}
          </span>
        )}
      </div>
      <div className="my-1.5 border-t border-gray-100 dark:border-gray-800" />
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-sm leading-none flex-shrink-0">{match.awayFlag}</span>
          <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
            {match.awayTeam}
          </span>
        </div>
        {hasScore && (
          <span
            className={clsx(
              'text-xs font-bold tabular-nums flex-shrink-0',
              match.awayScore! > match.homeScore!
                ? 'text-green-600 dark:text-green-500'
                : 'text-gray-400',
            )}
          >
            {match.awayScore}
          </span>
        )}
      </div>
    </div>
  )
}

type RoundConfig = {
  stage: Match['stage']
  label: string
  count: number
}

const ROUNDS: RoundConfig[] = [
  { stage: 'round32', label: '32强', count: 16 },
  { stage: 'round16', label: '16强', count: 8 },
  { stage: 'quarter', label: '1/4决赛', count: 4 },
  { stage: 'semi', label: '半决赛', count: 2 },
  { stage: 'final', label: '决赛', count: 1 },
]

export default function Bracket({ matches }: Props) {
  const byStage = (stage: Match['stage']) =>
    matches.filter((m) => m.stage === stage)

  return (
    <div className="overflow-x-auto pb-4">
      <div className="inline-flex gap-0 min-w-max">
        {ROUNDS.map((round, roundIdx) => {
          const roundMatches = byStage(round.stage)
          const slots = Array.from({ length: round.count }, (_, i) => roundMatches[i])

          const isLast = roundIdx === ROUNDS.length - 1

          return (
            <div key={round.stage} className="flex">
              {/* Column */}
              <div className="flex flex-col">
                {/* Column header */}
                <div className="h-9 flex items-center justify-center px-6">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {round.label}
                  </span>
                </div>

                {/* Match slots with connectors */}
                <div
                  className="flex flex-col flex-1"
                  style={{ gap: `${getGap(round.count)}px` }}
                >
                  {slots.map((match, idx) => {
                    const isEven = idx % 2 === 0
                    const pairIdx = Math.floor(idx / 2)
                    const prevCount = roundIdx > 0 ? ROUNDS[roundIdx - 1].count : 0
                    const itemHeight = 70
                    const prevGap = roundIdx > 0 ? getGap(prevCount) : 0
                    const blockHeight = (itemHeight * 2) + prevGap

                    return (
                      <div key={idx} className="relative flex items-center">
                        <BracketSlot match={match} />

                        {/* Right connector */}
                        {!isLast && (
                          <div
                            className={clsx(
                              'absolute right-0 w-6 border-t border-gray-200 dark:border-gray-700',
                              'translate-x-full',
                            )}
                          />
                        )}

                        {/* Vertical connector (only on even indices — draws line to pair) */}
                        {!isLast && isEven && (
                          <div
                            className="absolute right-0 translate-x-full"
                            style={{
                              top: '50%',
                              width: '24px',
                              height: `${blockHeight - itemHeight}px`,
                              borderRight: '1px solid',
                              borderColor: 'rgb(229 231 235)',
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Spacer between rounds */}
              {!isLast && <div className="w-6" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function getGap(count: number): number {
  const gaps: Record<number, number> = {
    16: 8,
    8: 78,
    4: 218,
    2: 498,
    1: 0,
  }
  return gaps[count] ?? 8
}
