import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navigation from '@/components/Navigation'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | 世界杯赛程时间',
    default: '世界杯赛程时间 — 2026 FIFA 世界杯',
  },
  description:
    '2026 FIFA 世界杯完整赛程，支持本地时区与北京时间切换，含小组赛积分榜与淘汰赛对阵图。',
  keywords: ['世界杯', '2026', 'FIFA', '赛程', '美加墨', '世界杯时间表'],
  openGraph: {
    title: '世界杯赛程时间 — 2026 FIFA 世界杯',
    description: '2026 FIFA 世界杯完整赛程，支持本地时区与北京时间切换。',
    locale: 'zh_CN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-gray-100 dark:border-gray-800 py-8 mt-16">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  世界杯赛程时间 · 2026 FIFA 世界杯 · 美国、加拿大、墨西哥联合主办
                </p>
                <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
                  数据仅供参考，以 FIFA 官方公告为准
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
