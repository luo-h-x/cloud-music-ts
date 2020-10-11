<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="170px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img
          @click="diverse(item.targetType, index)"
          @load="show"
          class="banner-imgs"
          :src="item.imageUrl + '?param=800y295'"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import api from '@/api/personalized'
import { SongListModule } from '@/store'

interface Banner {
  targetId: number | string
  url: string
}

@Component({
  name: 'Banner'
})
export default class extends Vue {
  banners: Banner[] = []

  async mounted() {
    this.getQ()
  }

  private async getQ() {
    // 获取轮播图
    const data = await api.getBanner()
    this.banners = data.data.banners
  }

  private show() {
    this.$emit('loading-show', this.banners.length)
  }

  private diverse(type: number, index: number) {
    if (type === 1) {  // 歌曲
      const options = {
        currentIndex: 0,
        ids: this.banners[index].targetId as string,
        songs: [{ name: '', id: 0 }]
      }
      SongListModule.querySongsA(options)
    } else if (type === 10) { // 专辑
      this.$router.push({
        path: '/Album',
        query: { id: this.banners[index].targetId as string }
      })
    } else if (type === 3000) {  // url
      // window.location.href = this.banners[index].url
      window.open(this.banners[index].url)
    } else if (type === 1004) { // mv
      this.$router.push({
        path: '/Video/Mv',
        query: { id: this.banners[index].targetId as string }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 轮播
.banner {
  margin: 20px 0;
  .banner-imgs {
    width: 100%;
    height: 100%;
  }
}
</style>
