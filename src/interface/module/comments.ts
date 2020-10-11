 interface UserComment {
  nickname: string
  avatarUrl: string
  userId: number
}

interface RepliedUser {
  nickname: string
  userId: number
}

interface Replied {
  user: RepliedUser
  content: string
}

export interface CommentsItem {
  user: UserComment
  beReplied: Replied[]
  commentId: number
  content: string
  time: string | number
  likedCount: number
  liked: boolean
}

export interface CommentsM {
  moreHot: boolean
  hotComments: CommentsItem[]
  comments: CommentsItem[]
  total: number
  more: boolean
}