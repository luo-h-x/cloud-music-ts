<template>
  <div class="comments-page" ref="comments">
    <div class="c-top" v-if="comments">
      <h2 class="c-title">评论</h2>
      <span class="c-count">共{{ comments.total }}条评论</span>
    </div>
    <div v-if="comments">
      <!-- 添加评论 -->
      <Add-c @addComment="addComment" />
      <!-- 精彩评论 -->
      <Hot-c
        :hotComments="comments.hotComments"
        :moreHot="comments.moreHot"
        @toReplyComment="toReplyComment"
        @toPraise="toPraise"
      />
      <!-- 最新评论 -->
      <Latest-c
        :comments="comments.comments"
        :total="comments.total"
        @toReplyComment="toReplyComment"
        @toPraise="toPraise"
        @currentChange="currentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AddC from './addC/index.vue'
import HotC from './hotC/index.vue'
import LatestC from './latestC/index.vue'
import api from '@/api/comments'
import { CommentsM, CommentsItem } from '@/interface/module/comments'

@Component({
  name: 'Comments',
  components: {
    AddC,
    HotC,
    LatestC
  }
})
export default class extends Vue {
  public comments: CommentsM | null = null
  public group = [
    { type: 'music', name: '歌曲', path: '/Song' },
    { type: 'mv', name: 'mv', path: '/Video/Mv' },
    { type: 'playlist', name: '歌单', path: '/PlayList' },
    { type: 'album', name: '专辑', path: '/Album' },
    { type: 'dj', name: '电台', path: '/Song' },
    { type: 'video', name: '视频', path: '/Video/Detail' }
  ]

  mounted() {
    this.getQ()
  }

  private async getQ(index = 0) {
    const item = this.group.find(item => {
      return item.path === this.$route.path
    })
    if (item != undefined) {
      const data = await api.getCommentsT(
        item.type,
        this.$route.query.id as string,
        index * 20
      )
      this.comments = data.data
    }
  }
  // 添加评论
  public addComment(textarea: string) {
    if (textarea && this.comments != null) {
      // 添加评论
      this.comments.comments.unshift({
        content: textarea,
        likedCount: 0,
        commentId: this.comments.comments.length + 1,
        time: new Date().getTime(),
        liked: false,
        beReplied: [],
        user: {
          nickname: '默认名',
          avatarUrl:
            'http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg',
          userId: 1
        }
      })
      // 评论数加一
      this.comments.total += 1
      // 通知
      Vue.prototype.$notify({
        title: '成功',
        message: '评论成功',
        type: 'success',
        duration: 2000,
        position: 'top-left'
      })
    } else {
      Vue.prototype.$alert('请输入内容!!', '', {
        confirmButtonText: '确定'
      })
    }
  }
  //回复评论
  public toReplyComment(payload: { item: CommentsItem; text: string }) {
    const { item, text } = payload
    if (text && this.comments != null) {
      // 添加评论
      this.comments.comments.unshift({
        content: text,
        likedCount: 0,
        commentId: this.comments.comments.length + 10,
        time: new Date().getTime(),
        liked: false,
        beReplied: [
          {
            user: {
              nickname: item.user.nickname,
              userId: item.user.userId
            },
            content: item.content
          }
        ],
        user: {
          nickname: '默认名',
          avatarUrl:
            'http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg',
          userId: 1
        }
      })
      // 评论数加一
      this.comments.total += 1
      // 通知(elemet ui添加的方法)
      Vue.prototype.$notify({
        title: '成功',
        message: '评论成功',
        type: 'success',
        duration: 2000,
        position: 'top-left'
      })
    } else {
      Vue.prototype.$alert('请输入内容!!', '', {
        confirmButtonText: '确定'
      })
    }
  }
  //点赞
  public toPraise(payload: { index: number; type: string }) {
    const { index, type } = payload
    if (type === 'comments' && this.comments != null) {
      this.comments.comments[index].liked = !this.comments.comments[index].liked
      !this.comments.comments[index].liked
        ? (this.comments.comments[index].likedCount -= 1) // 取消点赞
        : (this.comments.comments[index].likedCount += 1)
    } else if (type === 'hotComments' && this.comments != null) {
      this.comments.hotComments[index].liked = !this.comments.hotComments[index]
        .liked
      !this.comments.hotComments[index].liked
        ? (this.comments.hotComments[index].likedCount -= 1) // 取消点赞
        : (this.comments.hotComments[index].likedCount += 1)
    }
  }

  // 评论分页
  public currentChange(index: number) {
    // this.loading = true
    // 滚动到评论顶部
    const comment = this.$refs.comments as Element
    comment.scrollIntoView({
      block: 'start'
    })
    index = index - 1
    this.getQ(index)
  }
}
</script>

<style scoped lang="scss">
.c-top {
  display: flex;
  align-items: center;
  .c-title {
    font-size: 24px;
    font-weight: 400;
    line-height: 58px;
  }
  .c-count {
    color: #999;
    font-size: 14px;
    margin-left: 12px;
  }
}
</style>
