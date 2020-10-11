<template>
  <div class="p-list" v-if="songs">
    <div class="songs-item header">
      <span></span>
      <span>标题</span>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </div>
    <ul class="songs">
      <li class="songs-item" v-for="(item, index) in songs" :key="index">
        <span class="num">{{ index + 1 }}</span>
        <a
          @dblclick="playSong(index)"
          href="javascript:;"
          title="双击播放"
          class="tit"
          >{{ item.name }}</a
        >
        <router-link
          :to="{ path: '/Singer', query: { id: item.ar[0].id } }"
          class="sa-title"
          >{{ item.ar[0].name }}</router-link
        >
        <router-link
          :to="{ path: '/Album', query: { id: item.al.id } }"
          class="sa-title"
          >{{ item.al.name }}</router-link
        >
        <span class="dt">{{ item.dt }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import api from '@/api/album'
import { SongListModule } from '@/store'
import utils from '@/utils/common'
import { Vue, Component } from 'vue-property-decorator'

interface MusicI {
  id: number
  name: string
  dt: string
}

@Component({
  name: 'ASongs'
})
export default class extends Vue {
  public songs: MusicI[] = []

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getAlbum(this.$route.query.id as string)
    this.songs = data.data.songs
    this.songs.forEach((item: MusicI) => {
      item.dt = utils.formatDay(item.dt)
    })
  }

  public playSong(index: number) {
    const options = {
      currentIndex: index,
      ids: this.songs[0].id.toString(),
      songs: [{ name: this.songs[index].name, id: this.songs[index].id }]
    }
    this.songs.forEach((item: { id: number; name: string }) => {
      options.ids += ',' + item.id
    })
    SongListModule.querySongsA(options)
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
// 歌单
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
// 标题
.header {
  margin-top: 20px;
  border: 1px solid #ccc;
  & > span {
    line-height: 50px;
    padding-left: 10px;
    border-left: 1px solid #ccc;
  }
}
</style>
