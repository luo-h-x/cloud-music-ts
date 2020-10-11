<template>
  <div class="singer-mv-page" v-if="singerMv">
    <ul class="s-mv" v-if="singerMv.mvs.length > 0">
      <li
        class="s-mv-item"
        v-for="item in singerMv.mvs"
        :key="item.id"
        @click="toVideo(item.id)"
      >
        <div class="sc-content">
          <img
            @load="show"
            class="sc-img "
            :src="item.imgurl16v9 + '?param=555y340'"
          />
          <!-- 播放数 -->
          <div class="sc-info">
            <img class="sc-headset" src="~@/assets/headset.svg" alt="" />
            <!-- <span class="sc-count">{{ item.playCount }}</span> -->
            <span class="sc-count">{{ item.playCount }}</span>
          </div>
          <!-- 时长 -->
          <div class="sc-duration">
            <span>{{ item.duration }}</span>
          </div>
        </div>
        <!-- <a href="javascript:;" class="sc-title">{{ item.name }}</a> -->
        <a href="javascript:;" class="sc-title">{{ item.name }}</a>
      </li>
    </ul>
    <span v-else>没有相关mv</span>
  </div>
</template>

<script lang="ts">
import api from '@/api/singer'
import utils from '@/utils/common'
import { Vue, Component } from 'vue-property-decorator'

interface SingerMv {
  mvs: Mvs[]
}

interface Mvs {
  playCount: number | string
  duration: number | string
}

@Component({
  name: 'SingerMv'
})
export default class extends Vue {
  public singerMv: SingerMv | null = null

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSingerMV(this.$route.query.id as string)
    this.singerMv = data.data
    if (this.singerMv != null)
      this.singerMv.mvs.forEach(item => {
        item.playCount = utils.countToString(item.playCount as string)
        item.duration = utils.formatDay(item.duration)
      })
  }

  show() {
    console.log('loading')
  }

  private toVideo(id: string) {
    this.$router.push({
      path: '/Video/Mv',
      query: {
        id: id
      }
    })
  }
}
</script>

<style lang="scss" scoped>
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
    .sc-title {
      margin-top: 10px;
    }
  }
}
</style>
