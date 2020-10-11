// import store from '@/store/store';
// import {
//   VuexModule, Module, Mutation, Action, getModule,
// } from 'vuex-module-decorators'
// import Vue from 'vue'
// import api from '@/api/comments';

// interface UserComment {
//   nickname: string
//   avatarUrl: string
//   userId: number
// }

// interface RepliedUser {
//   nickname: string
//   userId: number
// }

// interface Replied {
//   user: RepliedUser
//   content: string
// }

// interface CommentsItem {
//   user: UserComment
//   beReplied: Replied[]
//   commentId: number
//   content: string
//   time: string
//   likedCount: number
//   liked: boolean
// }

// interface CommentsM {
//   moreHot: boolean
//   hotComments: CommentsItem[]
//   comments: CommentsItem[]
//   total: number
//   more: boolean
// }

// @Module({
//   dynamic: true, namespaced: true, name: 'Comments', store,
// })
// class Comments extends VuexModule {
//   public comments: CommentsM | null = null
//   // 添加评论
//   @Mutation
//   public addCommentM(textarea: string) {
//     if (textarea) {
//       // 添加评论
//       this.comments!.comments.unshift({
//         content: textarea,
//         likedCount: 0,
//         commentId: this.comments!.comments.length + 1,
//         time: new Date().toLocaleString(),
//         liked: false,
//         beReplied: [],
//         user: {
//           nickname: '默认名',
//           avatarUrl:
//             'http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg',
//           userId: 1
//         }
//       })
//       // 评论数加一
//       this.comments!.total += 1
//       // 通知
//       Vue.prototype.$notify({
//         title: '成功',
//         message: '评论成功',
//         type: 'success',
//         duration: 2000,
//         position: 'top-left'
//       })
//     } else {
//       Vue.prototype.$alert('请输入内容!!', '', {
//         confirmButtonText: '确定'
//       })
//     }
//   }
//   // 点赞
//   @Mutation
//   public toPraiseM(payload: { index: number; type: string }) {
//     const { index, type } = payload
//     if (type === 'comments') {
//       !this.comments!.comments[index].liked
//         ? (this.comments!.comments[index].likedCount -= 1) // 取消点赞
//         : (this.comments!.comments[index].likedCount += 1)
//     } else {
//       !this.comments!.hotComments[index].liked
//         ? (this.comments!.hotComments[index].likedCount -= 1) // 取消点赞
//         : (this.comments!.hotComments[index].likedCount += 1)
//     }
//   }
//   // @回复评论
//   @Mutation
//   public toReplyCommentM(payload: { item: any; text: string }) {
//     const { item, text } = payload
//     if (text) {
//       // 添加评论
//       this.comments!.comments.unshift({
//         content: text,
//         likedCount: 0,
//         commentId: this.comments!.comments.length + 10,
//         time: new Date().toLocaleString(),
//         liked: false,
//         beReplied: [
//           {
//             user: {
//               nickname: item.user.nickname,
//               userId: item.user.userId
//             },
//             content: item.content
//           }
//         ],
//         user: {
//           nickname: '默认名',
//           avatarUrl:
//             'http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg',
//           userId: 1
//         }
//       })
//       // 评论数加一
//       this.comments!.total += 1
//       // 通知(elemet ui添加的方法)
//       Vue.prototype.$notify({
//         title: '成功',
//         message: '评论成功',
//         type: 'success',
//         duration: 2000,
//         position: 'top-left'
//       })
//     } else {
//       Vue.prototype.$alert('请输入内容!!', '', {
//         confirmButtonText: '确定'
//       })
//     }
//   }

//   @Mutation
//   public queryCommetsM(data: CommentsM) {
//     this.comments = data
//   }
//   // 评论
//   @Action({ commit: 'queryCommetsM', rawError: true })
//   public async queryCommetsA(payload = { type: 'music', id: '186016', offset: '0' }) {
//     const { type, id, offset } = payload
//     const data = await api.getCommentsT(type, id, offset)
//     return data.data
//   }
// }

// export default getModule(Comments)