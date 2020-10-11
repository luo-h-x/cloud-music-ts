<template>
  <div class="p-list" v-if="result">
    <div class="songs-item header">
      <span></span>
      <span>标题</span>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </div>

    <ul class="songs">
      <li class="songs-item" v-for="(item, index) in result.songs" :key="index">
        <span class="num">{{ index + 1 }}</span>
        <a
          @dblclick="playSong(index)"
          title="双击播放"
          href="javascript:;"
          class="tit"
          >{{ item.name }}</a
        >
        <router-link
          :to="{ path: '/Singer', query: { id: item.artists[0].id } }"
          class="sa-title"
          >{{ item.artists[0].name }}</router-link
        >
        <router-link
          :to="{ path: '/Album', query: { id: item.album.id } }"
          class="sa-title"
          >{{ item.album.name }}</router-link
        >
        <span class="dt">{{ item.duration }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import api from '@/api/search'
import { SongListModule } from '@/store'
import utils from '@/utils/common'
import { SearchSong, SSongs } from '@/interface/module/search'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'SSong'
})
export default class extends Vue {
  public result: SearchSong | null = null

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSearch(this.$route.query.keyword as string, 1)
    this.result = data.data.result
    if (this.result != null)
      this.result.songs.forEach((item: SSongs) => {
        item.duration = utils.formatDay(item.duration)
      })
  }

  private playSong(index: number) {
    if (this.result != null) {
      const options = {
        currentIndex: index,
        ids: this.result.songs[0].id.toString(),
        songs: [
          {
            name: this.result.songs[index].name,
            id: this.result.songs[index].id
          }
        ]
      }
      this.result.songs.forEach((item: { id: number; name: string }) => {
        options.ids += ',' + item.id
      })
      SongListModule.querySongsA(options)
    }
  }

  show() {
    console.log('loading')
  }
}
</script>

<style lang="scss" scoped>
// 歌单列表
.p-list {
  margin: 20px 0;
}
.p-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  cursor: pointer;
}

.songs-item {
  display: grid;
  grid-template-columns: 0.5fr 3fr 1.5fr 3fr 1fr;
  grid-column-gap: 10px;
  align-items: center;
  margin: 10px 0;
  font-size: 14px;
  color: #999;
  height: 50px;
  &:nth-child(even) {
    background: #fafafa;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.1) !important;
  }
  .sa-pic {
    width: 50px;
  }
  .tit {
    cursor: default;
  }
}
// .header {
//   border: 1px solid #ccc;
//   & > span {
//     line-height: 50px;
//     padding-left: 10px;
//     border-left: 1px solid #ccc;
//   }
// }
</style>
