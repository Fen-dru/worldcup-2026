import type { Metadata } from 'next'
import Image from 'next/image'
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
        <section className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-stretch min-h-[240px] lg:min-h-[320px]">

            {/* Messi — left photo */}
            <div className="hidden lg:block relative w-48 xl:w-64 flex-shrink-0">
              <Image
                src="/messi.jpg"
                alt="梅西 Lionel Messi"
                fill
                className="object-cover object-top"
                style={{
                  maskImage: 'linear-gradient(to right, black 55%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, black 55%, transparent 100%)',
                }}
              />
              <div className="absolute bottom-4 left-4 z-10">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  🇦🇷 梅西
                </span>
              </div>
            </div>

            {/* Center text */}
            <div className="flex-1 px-6 py-8 sm:px-10 sm:py-10 flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                2026 FIFA 世界杯赛程
              </h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                共 104 场比赛 · 12 个小组 · 48 支球队 · 美国 / 加拿大 / 墨西哥
                <span className="ml-2 text-gray-500 dark:text-gray-400">· 找靠谱网站？ 联系 <a href="https://t.me/diediedie12" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-500 font-semibold hover:underline">Telegram</a></span>
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-400 dark:text-gray-500">
                <span className="inline-flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full px-3 py-1">
                  🗓 小组赛：6/11 – 6/27
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full px-3 py-1">
                  ⚡ 淘汰赛：6/28 – 7/19
                </span>
                <span className="inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-full px-3 py-1 text-green-700 dark:text-green-400">
                  🏆 决赛：7/19 MetLife Stadium
                </span>
              </div>
            </div>

            {/* Neymar — right photo */}
            <div className="hidden lg:block relative w-48 xl:w-64 flex-shrink-0">
              <Image
                src="/neymar.jpg"
                alt="内马尔 Neymar Jr"
                fill
                className="object-cover object-top"
                style={{
                  maskImage: 'linear-gradient(to left, black 55%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to left, black 55%, transparent 100%)',
                }}
              />
              <div className="absolute bottom-4 right-4 z-10">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  🇧🇷 内马尔
                </span>
              </div>
            </div>

          </div>
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
