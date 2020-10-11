<template>
  <!-- 歌单信息 -->
  <div class="p-data" v-if="detailInfo">
    <img :src="detailInfo.coverImgUrl + '?param=250y250'" class="data-photo" />
    <div class="p-content">
      <!-- 标题 -->
      <div class="p-main">
        <el-tag type="danger">歌单</el-tag>
        <h2 class="p-title">{{ detailInfo.name }}</h2>
        <div class="p-count">
          <div class="left">
            <span>歌曲数</span>
            <span>{{ detailInfo.trackCount }}</span>
          </div>
          <div class="right">
            <span>播放数</span>
            <span>{{ detailInfo.playCount }}</span>
          </div>
        </div>
      </div>
      <!-- 作者 -->
      <div class="p-creator">
        <router-link
          :to="{ path: '/User', query: { uid: detailInfo.creator.userId } }"
          ><img
            :src="detailInfo.creator.avatarUrl + '?param=50y50'"
            class="avatar"
        /></router-link>
        <router-link
          :to="{ path: '/User', query: { uid: detailInfo.creator.userId } }"
          class="name"
          >{{ detailInfo.creator.nickname }}</router-link
        >
        <span class="time">{{ detailInfo.createTime }} 创建</span>
      </div>
      <!-- 操作 -->
      <div class="p-actions">
        <a @click="playSong()" href="javascript:;" class="p-btn btn-allplay"
          ><img src="~@/assets/play.svg" class="p-icon img-play" />播放全部</a
        >
        <a href="javascript:;" class="p-btn btn-collect"
          ><img src="~@/assets/like.svg" class="p-icon img-like" />收藏</a
        >
        <a href="javascript:;" class="p-btn btn-download"
          ><img
            src="~@/assets/download.svg"
            class="p-icon img-download"
          />下载</a
        >
      </div>
      <!-- 标签 -->
      <div class="p-tag" v-if="detailInfo.tags.length > 0">
        <span>标签:</span>
        <a
          href="javascript:;"
          class="tag-info"
          v-for="(tag, i) in detailInfo.tags"
          :key="i"
          @click="toTag(tag)"
          >{{ tag }}</a
        >
      </div>
      <!-- 简介 -->
      <p v-if="detailInfo.description" class="p-describe" :class="{'pd-show': !spread}">
        <strong>介绍：</strong>
        {{ detailInfo.description }}
        <br />
        <span @click="toSpread" v-if="spread" class="pd-spread">展开</span>
        <span @click="toSpread" v-else class="pd-spread">收起</span>
      </p>
      <p v-else> 暂无介绍 </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { PInfo } from '@/interface/module/playList'

@Component({
  name: 'PData'
})
export default class extends Vue {
  @Prop() detailInfo!: PInfo
  public spread: boolean = true

  private playSong() {
    this.$emit('playSong', 0)
  }

  private toTag(tag: string) {
    this.$router.push({
      path: '/Discover/SongList',
      query: { cat: tag, limit: '32' }
    })
  }

  private toSpread() {
    this.spread = !this.spread
  }
}
</script>

<style lang="scss" scoped>
// 歌单信息
.p-data {
  display: flex;
  // align-items: center;
  // 右侧图
  .data-photo {
    width: 250px;
    height: 250px;
    margin-right: 25px;
  }
  // 左侧内容
  .p-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // 标题
    .p-main {
      display: flex;
      justify-content: space-between;
      .p-title {
        flex: 1;
        font-size: 20px;
        font-weight: normal;
        margin: 0 10px;
      }
      .p-count {
        min-width: 120px;
        display: flex;
        justify-content: flex-end;
        color: #ccc;
        .left {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin: 0 5px;
        }
        .right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin: 0 5px;
        }
        span {
          font-size: 14px;
        }
      }
    }
    // 作者
    .p-creator {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .avatar {
        width: 35px;
        height: 35px;
        cursor: pointer;
      }
      .name {
        margin-left: 15px;
        color: #999;
      }
      .time {
        margin-left: 15px;
        font-size: 12px;
      }
    }
    // 操作
    .p-actions {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .p-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 122px;
        border: 1px solid #c9c9c9;
        font-size: 14px;
        border-radius: 2px;
        white-space: nowrap;
        margin-right: 10px;
        line-height: 38px;
        .p-icon {
          width: 16px;
          height: 16px;
          margin-right: 5px;
          cursor: pointer;
        }
      }
      .btn-collect:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      .btn-download:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      .btn-allplay {
        border: 1px solid #31c27c;
        background-color: #31c27c;
        color: #fff;
      }
    }
    // 标签
    .p-tag {
      font-size: 14px;
      .tag-info {
        color: #31c27c;
        margin-left: 5px;
      }
    }
    // 简介
    .p-describe {
      height: 40px;
      overflow: hidden;
      margin-top: 10px;
      color: #666;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .pd-show {
      height: auto;
      white-space: normal;
    }
    .pd-spread{
      color: #409EFF;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
