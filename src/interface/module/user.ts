export interface UserInfo {

  profile: Profile
  createTime: number | string
  level: number
  listenSongs: number
  mobileSign: boolean
  pcSign: boolean
}

interface Profile {
  avatarUrl: string
  signature: string
  followeds: number
  follows: number
  eventCount: number
  province: number
  city: number
  createTime: number | string
  gender: number
  nickname: string
  artistId: number
  userId: number
  userType: number
  vipType: number
}