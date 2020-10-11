<template>
<div id="page">
  <div class="v-detail" v-if="detail">
    <div class="left">
      <!-- 标题 -->
      <div class="tit">
        <el-tag type="danger">MV</el-tag>
        <h3 class="tc">{{ detail.data.name }}</h3>
        <router-link
          :to="{ path: '/Singer', query: { id: detail.data.artistId } }"
          class="name"
          >{{ detail.data.artistName }}</router-link
        >
      </div>
      <!-- 视频 -->
      <video
      ref="video"
        controls
        style="width:800px;height: 450px;"
        autoplay
        :src="url"
        @play="playV"
      ></video>
    </div>
    <div class="right">
      <div class="introduce">
        <div>
          <h3 class="tit">MV介绍</h3>
          <p class="info">
            <span class="time">发布时间: {{ detail.data.publishTime }}</span>
            <span class="count">播放次数: {{ detail.data.playCount }}</span>
          </p>
          <p v-if="detail.data.desc" class="content">
            简介:
            {{ detail.data.desc }}
          </p>
          <!-- <div class="tags">
            <span>标签:</span>
            <a class="tag">动漫</a>
            <a class="tag">影视</a>
          </div> -->
        </div>
        <!-- 相关推荐 -->
        <div class="recommend"></div>
      </div>
    </div>
    <!-- 评论 -->
    <Comments />
  </div>
</div>
</template>

<script lang="ts">
import api from '@/api/video'
import Comments from '@/components/Comments/index.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'MvDetail',
  components: {
    Comments
  }
})
export default class extends Vue {
  public url: {} | null = null
  public detail: {} | null = null

  mounted() {
    this.getQ()
    this.getQ2()
  }

  private async getQ() {
    const data = await api.getUrlMv(this.$route.query.id as string)
    this.url = data.data.data.url
  }

  private async getQ2() {
    const data = await api.getMvD(this.$route.query.id as string)
    this.detail = data.data
  }

  private playV() {
    const video = this.$refs.video as HTMLVideoElement
    video.volume = 0.3

    // 暂停音乐
    const audio = document.getElementsByClassName(
      'audio'
    )[0] as HTMLAudioElement
    if (audio) {
      audio.pause()
    }
  }
}
</script>

<style lang="scss" scoped>
.v-detail {
  display: flex;
  flex-direction: column;
}
.left {
  display: flex;
  flex-direction: column;
  .tit {
    display: flex;
    align-items: flex-end;
    height: 30px;
    margin-bottom: 10px;
    .tc {
      margin-left: 10px;
      font-size: 18px;
      font-weight: normal;
    }
    .name {
      margin-left: 5px;
      font-size: 14px;
      color: #999;
    }
  }
}
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  .introduce {
    display: flex;
    flex-direction: column;
    .tit {
      font-size: 18px;
      line-height: 40px;
      font-weight: normal;
      // border-bottom: 1px #ccc solid;
    }
    .info {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #999;
      margin: 5px 0;
    }
    .content {
      line-height: 22px;
      font-size: 14px;
      margin: 15px 0;
    }
    // .tags {
    //   font-size: 14px;
    //   color: #999;
    //   .tag {
    //     margin-left: 5px;
    //     color: #3a8ee6;
    //   }
    // }
  }
}
</style>
