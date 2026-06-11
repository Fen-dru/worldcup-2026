import type { Group } from '@/types'
import clsx from 'clsx'

type Props = {
  group: Group
  showAdvancement?: boolean
}

export default function GroupTable({ group, showAdvancement = true }: Props) {
  const sorted = [...group.teams].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    const gdA = a.gf - a.ga
    const gdB = b.gf - b.ga
    if (gdB !== gdA) return gdB - gdA
    return b.gf - a.gf
  })

  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
      {/* Group header */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
        <span className="text-xs font-bold text-white bg-green-600 rounded-md w-6 h-6 inline-flex items-center justify-center">
          {group.id}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {group.id} 组
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-50 dark:border-gray-800">
              <th className="text-left px-4 py-2 font-medium text-gray-400 dark:text-gray-500 w-6">#</th>
              <th className="text-left px-2 py-2 font-medium text-gray-400 dark:text-gray-500">球队</th>
              <th className="text-center px-2 py-2 font-medium text-gray-400 dark:text-gray-500">场</th>
              <th className="text-center px-2 py-2 font-medium text-gray-400 dark:text-gray-500">胜</th>
              <th className="text-center px-2 py-2 font-medium text-gray-400 dark:text-gray-500">平</th>
              <th className="text-center px-2 py-2 font-medium text-gray-400 dark:text-gray-500">负</th>
              <th className="text-center px-2 py-2 font-medium text-gray-400 dark:text-gray-500">进</th>
              <th className="text-center px-2 py-2 font-medium text-gray-400 dark:text-gray-500">失</th>
              <th className="text-center px-2 py-2 font-medium text-gray-400 dark:text-gray-500">净</th>
              <th className="text-center px-3 py-2 font-medium text-gray-400 dark:text-gray-500">分</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((team, idx) => (
              <tr
                key={team.name}
                className={clsx(
                  'border-b last:border-b-0 border-gray-50 dark:border-gray-800 transition-colors',
                  idx < 2
                    ? 'bg-green-50/50 dark:bg-green-900/10'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                )}
              >
                <td className="px-4 py-2.5 text-gray-400 dark:text-gray-500 tabular-nums">
                  {idx + 1}
                </td>
                <td className="px-2 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base leading-none">{team.flag}</span>
                    <span
                      className={clsx(
                        'font-medium truncate max-w-[100px]',
                        idx < 2
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-300',
                      )}
                    >
                      {team.name}
                    </span>
                    {idx < 2 && (
                      <span className="text-green-600 dark:text-green-500 text-xs leading-none">●</span>
                    )}
                  </div>
                </td>
                <td className="text-center px-2 py-2.5 tabular-nums text-gray-600 dark:text-gray-400">{team.played}</td>
                <td className="text-center px-2 py-2.5 tabular-nums text-gray-600 dark:text-gray-400">{team.won}</td>
                <td className="text-center px-2 py-2.5 tabular-nums text-gray-600 dark:text-gray-400">{team.drawn}</td>
                <td className="text-center px-2 py-2.5 tabular-nums text-gray-600 dark:text-gray-400">{team.lost}</td>
                <td className="text-center px-2 py-2.5 tabular-nums text-gray-600 dark:text-gray-400">{team.gf}</td>
                <td className="text-center px-2 py-2.5 tabular-nums text-gray-600 dark:text-gray-400">{team.ga}</td>
                <td className="text-center px-2 py-2.5 tabular-nums text-gray-600 dark:text-gray-400">
                  {team.gf - team.ga >= 0 ? `+${team.gf - team.ga}` : team.gf - team.ga}
                </td>
                <td className="text-center px-3 py-2.5 tabular-nums font-bold text-gray-900 dark:text-white">
                  {team.pts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdvancement && (
        <div className="px-4 py-2.5 border-t border-gray-50 dark:border-gray-800 flex items-center gap-1.5">
          <span className="text-green-600 dark:text-green-500 text-xs">●</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            前2名 + 最佳8个第三名晋级32强
          </span>
        </div>
      )}
    </div>
  )
}
