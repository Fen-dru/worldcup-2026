export type Stage =
  | 'group'
  | 'round32'
  | 'round16'
  | 'quarter'
  | 'semi'
  | 'third'
  | 'final'

export type MatchStatus = 'scheduled' | 'live' | 'finished'

export type Match = {
  id: string
  matchNo: number
  date: string
  stage: Stage
  group?: string
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  venue: string
  homeScore?: number
  awayScore?: number
  status: MatchStatus
}

export type Team = {
  name: string
  flag: string
  played: number
  won: number
  drawn: number
  lost: number
  gf: number
  ga: number
  pts: number
}

export type Group = {
  id: string
  teams: Team[]
}

export type FilterState = {
  date?: string
  group?: string
  stage?: Stage | ''
}
