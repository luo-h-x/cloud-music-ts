<template>
  <div class="singer-mv-page" v-if="album">
    <ul class="singer-album" v-if="album.hotAlbums.length > 0">
      <li
        class="singer-album-item"
        v-for="(item, index) in album.hotAlbums"
        :key="index"
      >
        <img
          @load="show"
          :src="item.picUrl + '?param=50y50'"
          class="sa-pic"
        />
        <router-link
          :to="{ path: '/Album', query: { id: item.id } }"
          class="sa-title"
          >{{ item.name }}</router-link
        >
        <!-- <a href="javascript:;" class="sa-title">{{ item.name }}</a> -->
        <span class="sa-count">歌曲: {{ item.size }}首</span>
        <span class="sa-time">发行时间: {{ item.publishTime }}</span>
      </li>
    </ul>
    <div v-else>暂无专辑</div>
  </div>
</template>

<script lang="ts">
import api from '@/api/singer'
import { Vue, Component } from 'vue-property-decorator'

interface SingerA {
  hotAlbums: HotA[]
}

interface HotA {
  publishTime: string
}

@Component({
  name: 'SingerA'
})
export default class extends Vue {
  public album: SingerA | null = null

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSingerAlbum(this.$route.query.id as string)
    this.album = data.data
    if (this.album != null)
    this.album.hotAlbums.forEach((item: HotA) => {
      item.publishTime = new Date(item.publishTime).toLocaleDateString()
    })
  }
  show() {
    console.log('loading')
  }
}

// import api from '../../api/singer'
// export default {
//   data() {
//     return {
//       album: [],
//       loading: true,
//       count: 0
//     }
//   },
//   mounted() {
//     api.getSingerAlbum(this.$route.query.id).then(val => {
//       this.album = val.data
//       this.album.hotAlbums.forEach(item => {
//         item.publishTime = new Date(item.publishTime).toLocaleDateString()
//       })
//     })
//   },
//   methods: {
//     show() {
//       this.count++
//       if (this.count === this.album.hotAlbums.length) {
//         this.loading = false
//       }
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.singer-album {
  .singer-album-item {
    display: grid;
    grid-template-columns: 1fr 3fr 3fr 3fr;
    align-items: center;
    margin: 10px 0;
    font-size: 14px;
    color: #999;
    height: 50px;
    .sa-pic {
      width: 50px;
    }
  }
}
</style>
