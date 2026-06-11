import type { Match, Stage } from '@/types'

export function formatLocalTime(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export function formatBeijingTime(dateStr: string): string {
  const date = new Date(dateStr)
  const formatted = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
  return `北京时间 ${formatted}`
}

export function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(date)
}

export function getNextMatch(matches: Match[]): Match | null {
  const now = new Date()
  const upcoming = matches
    .filter((m) => m.status === 'scheduled' && new Date(m.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  return upcoming[0] ?? null
}

const STAGE_NAMES: Record<Stage, string> = {
  group: '小组赛',
  round32: '32强',
  round16: '16强',
  quarter: '1/4决赛',
  semi: '半决赛',
  third: '季军赛',
  final: '决赛',
}

export function getStageName(stage: Stage): string {
  return STAGE_NAMES[stage]
}

export function getGroupMatches(matches: Match[], group: string): Match[] {
  return matches.filter((m) => m.group === group)
}

export function getStageMatches(matches: Match[], stage: Stage): Match[] {
  return matches.filter((m) => m.stage === stage)
}

export function groupMatchesByDate(
  matches: Match[],
): Record<string, Match[]> {
  const result: Record<string, Match[]> = {}
  for (const match of matches) {
    const key = new Intl.DateTimeFormat('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(new Date(match.date))
      .replace(/\//g, '-')
    if (!result[key]) result[key] = []
    result[key].push(match)
  }
  return result
}

export function getTodayKey(): string {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(new Date())
    .replace(/\//g, '-')
}

export function getTomorrowKey(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(tomorrow)
    .replace(/\//g, '-')
}
