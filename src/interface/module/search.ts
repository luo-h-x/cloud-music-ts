export interface SearchSong {
  songs: SSongs[]
}

export interface SSongs {
  duration: number | string
  id: number
  name: string
}

export interface SearchSongSheet {
  playlists: SPlaylists[]
}

export interface SPlaylists {
  coverImgUrl: string
  id: number
  name: string
  trackCount: number
}

export interface SearchUser {
  userprofiles: SUser[]
}

export interface SUser {
  avatarUrl: string
  userId: number
  nickname: string
}

export interface SearchVideo {
  videos: SVideo[]
}

export interface SVideo {
  playTime: number | string
  durationms: number | string
  title: string
  coverUrl: string
}

export interface SearchAlbum {
  albums: SAlbum[]
}

export interface SAlbum {
  id: number
  name: string
  picUrl: string
}

export interface SearchSinger {
  artists: SArtists[]
}

export interface SArtists {
  img1v1Url: string
  name: string
  id: number
}

export interface HotSearch {
  searchWord: string
}

export interface SuggestSearch {
  
}