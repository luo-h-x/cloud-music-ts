<template>
  <!-- 最新评论 -->
  <div v-if="comments">
    <div v-if="comments == 0"></div>
    <div class="latestcomments" v-else>
      <h2 class="c-type">最新评论</h2>
      <ul class="h-list">
        <li
          class="h-list-item"
          v-for="(item, index) in comments"
          :key="item.commentId"
        >
          <!-- 头像 -->
          <router-link :to="{ path: '/User', query: { uid: item.user.userId } }"
            ><img class="h-avatar" :src="item.user.avatarUrl + '?param=60y60'"
          /></router-link>
          <!-- 详情 -->
          <div class="h-details">
            <router-link
              :to="{ path: '/User', query: { uid: item.user.userId } }"
              class="hd-name"
              >{{ item.user.nickname }}</router-link
            >
            <!-- 回复评论 -->
            <div class="hd-reply" v-if="item.beReplied.length > 0">
              <p class="hdr-content">
                回复
                <router-link
                  :to="{
                    path: '/User',
                    query: { uid: item.beReplied[0].user.userId }
                  }"
                  class="hdr-nickname"
                  >@{{ item.beReplied[0].user.nickname }}</router-link
                >:
                <span class="hdr-subcomment">{{ item.content }}</span>
              </p>
              <p class="hdr-history">{{ item.beReplied[0].content }}</p>
            </div>
            <!-- 普通评论 -->
            <p class="hd-content" v-else>
              {{ item.content }}
            </p>
            <div class="hd-info">
              <span class="hd-time" href="">{{
                utils.formatDate(item.time, 1)
              }}</span>
              <div class="hd-option">
                <!-- <a href="">举报</a> -->
                <a
                  :class="{ 'hd-praise': item.liked }"
                  href="javascript:;"
                  @click="toPraise(index)"
                  >点赞({{ item.likedCount }})</a
                >
                <a href="javascript:;" @click="showReply(index)">回复</a>
              </div>
            </div>
            <!-- @回复 -->
            <div class="hd-input" :class="replyc === index ? 'hdi-show' : ''">
              <el-input
                type="textarea"
                placeholder="回复"
                v-model="textareaR"
                maxlength="140"
                show-word-limit
                :rows="3"
              >
              </el-input>
              <div class="hdi-option">
                <a href="javascript:;" class="hdi-reply" @click="toReply(item)"
                  >回复</a
                >
                <a href="javascript:;" class="hdi-cancel" @click="toCancel"
                  >取消</a
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 加载完毕 -->
      <div class="c-all" v-if="complete">
        <span class="ca-link">—— 以上为全部评论 ——</span>
      </div>
      <!-- 分页 -->
      <el-pagination
        v-if="total > 20"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CommentsItem } from '@/interface/module/comments'
import utils from '@/utils/common'

@Component({
  name: 'LatestC'
})
export default class extends Vue {
  @Prop() comments!: CommentsItem
  @Prop() total!: number
  public textareaR: string = ''
  public replyc: number = -1
  public utils = utils
  public complete: boolean = false
  // 点赞
  private toPraise(index: number) {
    this.$emit('toPraise', { index, type: 'comments' })
  }
  private showReply(index: number) {
    this.replyc = index
  }

  private toReply(item: CommentsItem) {
    this.$emit('toReplyComment', { item, text: this.textareaR })
    if (this.textareaR.length > 0) this.toCancel()
  }

  private toCancel() {
    this.replyc = -1
    this.textareaR = ''
  }

  private currentChange(index: number) {
    this.$emit('currentChange', index)
    Math.ceil(this.total / 20) === index
      ? (this.complete = true)
      : (this.complete = false)
  }

  mounted() {
    this.total > 20 && this.total != 20 ? (this.complete = false) : (this.complete = true)
  }
}
</script>

<style scoped lang="scss">
// 评论列表
.h-list {
  font-size: 14px;
  .h-list-item {
    display: flex;
    align-items: center;
    border-bottom: 1px #ededed solid;
    margin: 10px 0;
    // 头像
    .h-avatar {
      width: 38px;
      height: 38px;
      border-radius: 999px;
      cursor: pointer;
    }
    // 详情
    .h-details {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      .hd-name {
        color: #3a8ee6;
        line-height: 28px;
      }
      // 普通评论
      .hd-content {
        line-height: 28px;
        width: 80%;
      }
      .hd-info {
        display: flex;
        justify-content: space-between;
        .hd-time {
          line-height: 28px;
          color: #999;
        }
        .hd-option {
          a {
            margin-right: 10px;
            &:hover {
              color: #2caf6f;
            }
          }
          .hd-praise {
            color: #2caf6f;
          }
        }
      }
      // 回复评论
      .hd-reply {
        .hdr-content {
          width: 80%;
          .hdr-nickname {
            color: #31c27c;
          }
          .hdr-subcomment {
            line-height: 28px;
          }
        }
        .hdr-history {
          border-left: 1px #999 solid;
          margin: 5px 0 4px 12px;
          padding: 0 0 0 10px;
          color: #999;
          width: 80%;
          background: #f5f7fa;
          line-height: 26px;
        }
      }
      // @回复
      .hd-input {
        display: none;
        flex-direction: column;
        align-items: flex-end;
        .hdi-option {
          display: flex;
          .hdi-reply {
            width: 50px;
            line-height: 27px;
            text-align: center;
            border: 1px solid #31c27c;
            background-color: #31c27c;
            color: #fff;
            margin: 10px 5px;
          }
          .hdi-cancel {
            width: 50px;
            line-height: 27px;
            text-align: center;
            border: 1px solid #999;
            margin: 10px 5px;
          }
        }
      }
      // 显示回复框
      .hdi-show {
        display: flex;
      }
    }
  }
}
// 加载完毕
.c-all {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #999;
  margin: 10px 0;
}
// 分页
.el-pagination {
  display: flex;
  justify-content: center;
}
// 评论类型
.c-type {
  font-weight: 400;
  font-size: 16px;
  line-height: 34px;
  border-bottom: 1px #ededed solid;
}
</style>
