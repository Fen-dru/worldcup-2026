'use client'

import clsx from 'clsx'

type Props = {
  useBeijing: boolean
  onChange: (useBeijing: boolean) => void
}

export default function TimezoneToggle({ useBeijing, onChange }: Props) {
  return (
    <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-0.5 text-xs">
      <button
        onClick={() => onChange(false)}
        className={clsx(
          'px-3 py-1 rounded-full transition-all duration-150 font-medium',
          !useBeijing
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
        )}
      >
        本地时间
      </button>
      <button
        onClick={() => onChange(true)}
        className={clsx(
          'px-3 py-1 rounded-full transition-all duration-150 font-medium',
          useBeijing
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
        )}
      >
        北京时间
      </button>
    </div>
  )
}
