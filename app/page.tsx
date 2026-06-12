import type { Metadata } from 'next'
import { MATCHES } from '@/data/matches'
import { getNextMatch } from '@/lib/utils'
import Countdown from '@/components/Countdown'
import MatchesClient from '@/components/MatchesClient'

export const metadata: Metadata = {
  title: '赛程总览',
  description: '2026 FIFA 世界杯完整赛程，共104场比赛，支持按日期、小组、阶段筛选。',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: '2026 FIFA 世界杯',
  startDate: '2026-06-11',
  endDate: '2026-07-19',
  location: [
    { '@type': 'Place', name: 'MetLife Stadium', address: { '@type': 'PostalAddress', addressCountry: 'US' } },
    { '@type': 'Place', name: 'Estadio Azteca', address: { '@type': 'PostalAddress', addressCountry: 'MX' } },
  ],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  description: '2026 FIFA World Cup — United States, Canada, Mexico',
}

export default function HomePage() {
  const nextMatch = getNextMatch(MATCHES)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* Hero */}
        <section className="relative">
          {/* Player illustrations */}
          <div className="hidden lg:flex items-center justify-between absolute inset-0 pointer-events-none select-none">
            {/* Messi - left */}
            <div className="flex flex-col items-center gap-2 opacity-90">
              <svg width="90" height="120" viewBox="0 0 90 120" fill="none">
                {/* Argentina jersey - blue & white stripes */}
                <path d="M18,22 L6,40 L22,46 L22,108 L68,108 L68,46 L84,40 L72,22 L58,15 C50,20 40,20 32,15 Z" fill="#74ACDF"/>
                <rect x="30" y="15" width="8" height="93" fill="white" opacity="0.6"/>
                <rect x="46" y="15" width="8" height="93" fill="white" opacity="0.6"/>
                {/* V-neck */}
                <path d="M32,15 L45,32 L58,15" fill="none" stroke="white" strokeWidth="1.5"/>
                {/* Number 10 */}
                <text x="45" y="72" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="monospace">10</text>
                {/* Left sleeve */}
                <path d="M6,40 L0,58 L22,62 L22,46 Z" fill="#74ACDF"/>
                {/* Right sleeve */}
                <path d="M84,40 L90,58 L68,62 L68,46 Z" fill="#74ACDF"/>
              </svg>
              <div className="text-center">
                <div className="text-2xl">🇦🇷</div>
                <div className="text-xs font-bold text-gray-600 dark:text-gray-300 mt-0.5">梅西</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">Messi</div>
              </div>
            </div>

            {/* Neymar - right */}
            <div className="flex flex-col items-center gap-2 opacity-90">
              <svg width="90" height="120" viewBox="0 0 90 120" fill="none">
                {/* Brazil jersey - yellow */}
                <path d="M18,22 L6,40 L22,46 L22,108 L68,108 L68,46 L84,40 L72,22 L58,15 C50,20 40,20 32,15 Z" fill="#FECB00"/>
                {/* Green trim */}
                <path d="M18,22 L6,40 L22,46 L22,108 L68,108 L68,46 L84,40 L72,22 L58,15 C50,20 40,20 32,15 Z" fill="none" stroke="#009C3B" strokeWidth="3"/>
                {/* V-neck */}
                <path d="M32,15 L45,32 L58,15" fill="none" stroke="#009C3B" strokeWidth="1.5"/>
                {/* Number 10 */}
                <text x="45" y="72" textAnchor="middle" fill="#003399" fontSize="18" fontWeight="bold" fontFamily="monospace">10</text>
                {/* Left sleeve */}
                <path d="M6,40 L0,58 L22,62 L22,46 Z" fill="#FECB00" stroke="#009C3B" strokeWidth="1.5"/>
                {/* Right sleeve */}
                <path d="M84,40 L90,58 L68,62 L68,46 Z" fill="#FECB00" stroke="#009C3B" strokeWidth="1.5"/>
              </svg>
              <div className="text-center">
                <div className="text-2xl">🇧🇷</div>
                <div className="text-xs font-bold text-gray-600 dark:text-gray-300 mt-0.5">内马尔</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">Neymar</div>
              </div>
            </div>
          </div>

          {/* Center content */}
          <div className="lg:px-32">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            2026 FIFA 世界杯赛程
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            共 104 场比赛 · 12 个小组 · 48 支球队 · 美国 / 加拿大 / 墨西哥
            <span className="ml-3 text-gray-600 dark:text-gray-400">找靠谱网站？ 联系 <a href="https://t.me/diediedie12" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-500 font-semibold hover:underline">Telegram</a></span>
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-400 dark:text-gray-500">
            <span className="inline-flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full px-3 py-1">
              🗓 小组赛：6/11 – 6/27
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full px-3 py-1">
              ⚡ 淘汰赛：6/28 – 7/19
            </span>
            <span className="inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-full px-3 py-1 text-green-700 dark:text-green-400">
              🏆 决赛：7/19 MetLife Stadium
            </span>
          </div>
          </div>{/* end lg:px-32 */}
        </section>

        {/* Countdown */}
        {nextMatch && (
          <section>
            <Countdown match={nextMatch} />
          </section>
        )}

        {/* Match list with filters */}
        <section>
          <MatchesClient matches={MATCHES} />
        </section>
      </div>
    </>
  )
}
