import type { Group } from '@/types'

const makeTeam = (name: string, flag: string) => ({
  name,
  flag,
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  gf: 0,
  ga: 0,
  pts: 0,
})

export const GROUP_DATA: Group[] = [
  {
    id: 'A',
    teams: [
      makeTeam('墨西哥', '🇲🇽'),
      makeTeam('南非', '🇿🇦'),
      makeTeam('韩国', '🇰🇷'),
      makeTeam('捷克', '🇨🇿'),
    ],
  },
  {
    id: 'B',
    teams: [
      makeTeam('巴西', '🇧🇷'),
      makeTeam('意大利', '🇮🇹'),
      makeTeam('沙特阿拉伯', '🇸🇦'),
      makeTeam('加拿大', '🇨🇦'),
    ],
  },
  {
    id: 'C',
    teams: [
      makeTeam('法国', '🇫🇷'),
      makeTeam('哥伦比亚', '🇨🇴'),
      makeTeam('摩洛哥', '🇲🇦'),
      makeTeam('苏格兰', '🏴󠁧󠁢󠁳󠁣󠁴󠁿'),
    ],
  },
  {
    id: 'D',
    teams: [
      makeTeam('美国', '🇺🇸'),
      makeTeam('巴拉圭', '🇵🇾'),
      makeTeam('澳大利亚', '🇦🇺'),
      makeTeam('土耳其', '🇹🇷'),
    ],
  },
  {
    id: 'E',
    teams: [
      makeTeam('德国', '🇩🇪'),
      makeTeam('葡萄牙', '🇵🇹'),
      makeTeam('日本', '🇯🇵'),
      makeTeam('喀麦隆', '🇨🇲'),
    ],
  },
  {
    id: 'F',
    teams: [
      makeTeam('英格兰', '🏴󠁧󠁢󠁥󠁮󠁧󠁿'),
      makeTeam('西班牙', '🇪🇸'),
      makeTeam('厄瓜多尔', '🇪🇨'),
      makeTeam('牙买加', '🇯🇲'),
    ],
  },
  {
    id: 'G',
    teams: [
      makeTeam('阿根廷', '🇦🇷'),
      makeTeam('荷兰', '🇳🇱'),
      makeTeam('伊朗', '🇮🇷'),
      makeTeam('巴拿马', '🇵🇦'),
    ],
  },
  {
    id: 'H',
    teams: [
      makeTeam('比利时', '🇧🇪'),
      makeTeam('克罗地亚', '🇭🇷'),
      makeTeam('乌克兰', '🇺🇦'),
      makeTeam('加纳', '🇬🇭'),
    ],
  },
  {
    id: 'I',
    teams: [
      makeTeam('乌拉圭', '🇺🇾'),
      makeTeam('瑞士', '🇨🇭'),
      makeTeam('塞内加尔', '🇸🇳'),
      makeTeam('新西兰', '🇳🇿'),
    ],
  },
  {
    id: 'J',
    teams: [
      makeTeam('智利', '🇨🇱'),
      makeTeam('波兰', '🇵🇱'),
      makeTeam('尼日利亚', '🇳🇬'),
      makeTeam('卡塔尔', '🇶🇦'),
    ],
  },
  {
    id: 'K',
    teams: [
      makeTeam('丹麦', '🇩🇰'),
      makeTeam('奥地利', '🇦🇹'),
      makeTeam('科特迪瓦', '🇨🇮'),
      makeTeam('罗马尼亚', '🇷🇴'),
    ],
  },
  {
    id: 'L',
    teams: [
      makeTeam('塞尔维亚', '🇷🇸'),
      makeTeam('匈牙利', '🇭🇺'),
      makeTeam('阿尔及利亚', '🇩🇿'),
      makeTeam('埃及', '🇪🇬'),
    ],
  },
]
