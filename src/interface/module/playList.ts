
export interface PInfo {
  playCount: string | number
  commentCount: number
  coverImgUrl: string
  createTime: number | string
  name: string
  id: number
  tags: string[]
  userId: number
  description: string
}


export interface PList {
  id: number
  name: string
  dt: string
  al: PListAlbum
  ar: PListArtist[]
}

interface PListAlbum {
  id: number
  name: string
  pic: number
  picUrl: string
}

interface PListArtist {
  id: number
  name: string
}
