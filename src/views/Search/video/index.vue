<template>
  <Loading :loadLength="result.videos.length">
    <div v-if="result.videos.length>0" class="singer-mv-page">
      <ul class="s-mv">
        <li
          class="s-mv-item"
          v-for="(item, index) in result.videos"
          :key="index"
          @click="toVideo(item.type, item.vid)"
        >
          <div class="sc-content">
            <img
              @load="show"
              class="sc-img "
              :src="item.coverUrl + '?param=555y340'"
            />
            <!-- 播放数 -->
            <div class="sc-info">
              <img class="sc-headset" src="~@/assets/headset.svg" alt="" />
              <!-- <span class="sc-count">{{ item.playCount }}</span> -->
              <span class="sc-count">{{ item.playTime }}</span>
            </div>
            <!-- 时长 -->
            <div class="sc-duration">
              <span>{{ item.durationms }}</span>
            </div>
          </div>
          <!-- <a href="javascript:;" class="sc-title">{{ item.name }}</a> -->
            
            <a href="javascript:;" class="sc-title">
              <mark class="sc-mv" v-if="item.type === 0">MV</mark>
              {{ item.title }}
              </a>
          
        </li>
      </ul>
    </div>
    <span v-else> 暂无相关信息 </span>
  </Loading>
</template>

<script lang="ts">
import api from '@/api/search'
import utils from '@/utils/common'
import { SearchVideo, SVideo } from '@/interface/module/search'
import Loading from '@/components/Loading/index.vue'
import LoadingM from '@/mixins/loadingMixin'
import { Mixins, Component } from 'vue-property-decorator'

@Component({
  name: 'SVideo',
  components: {
    Loading
  }
})
export default class extends Mixins(LoadingM) {
  public result: SearchVideo = { videos: [] }
  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSearch(this.$route.query.keyword as string, 1014)
    this.result = data.data.result
    if (this.result != null)
      this.result.videos.forEach((item: SVideo) => {
        item.playTime = utils.countToString(item.playTime)
        item.durationms = utils.formatDay(item.durationms)
      })
      // if(this.result.videos.length<=0) {
      //   this.noMore()
      // }
  }

  private toVideo(type: number, id: string) {
    if (type === 0) {
      this.$router.push({
        path: '/Video/Mv',
        query: {
          id: id
        }
      })
    } else {
      this.$router.push({
        path: '/Video/Detail',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}
.load {
  width: 100%;
  height: calc(100vh - 200px);
  position: absolute;
}
.s-mv {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  margin-top: 16px;
  .s-mv-item {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    font-size: 14px;
    overflow: hidden;
    .sc-content {
      position: relative;
      .sc-img {
        display: block;
        width: 100%;
        height: 128px;
        object-fit: cover;
      }
      // 播放数
      .sc-info {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.2);
        .sc-headset {
          width: 20px;
        }
        .sc-count {
          color: #fff;
          font-size: 12px;
          line-height: 30px;
        }
      }
      // 时长
      .sc-duration {
        position: absolute;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        font-size: 12px;
        line-height: 24px;
        width: 36px;
        text-align: center;
      }
    }
    .sc-mv {
      background-color: #fff;
      color: #409EFF;
      margin-right: 5px;
    }
    .sc-title {
      margin-top: 10px;
      font-size: 13px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
