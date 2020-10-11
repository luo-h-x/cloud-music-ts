<template>
  <div>
    <img class="ranking-img" :src="img + '?param=200y200'" />
    <ul class="songs" v-if="songs">
      <li
        class="s-item"
        v-for="(item, index) in songs"
        :key="index"
      >
        <span class=" ">{{ index + 1 }}</span>
        <a
          @dblclick="playSong(index)"
          href="javascript:;"
          title="双击播放"
          class="name"
          >{{ item.name }}</a
        >
        <router-link
          class="singer"
          :to="{ path: '/Singer', query: { id: item.ar[0].id } }"
          >{{ item.ar[0].name }}</router-link
        >
      </li>
      <router-link class="all" :to="{ path: '/PlayList', query: { id: id } }"
        >查看全部</router-link
      >
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import api from '@/api/playlist'
import { SongListModule } from '@/store/index.ts'

interface Musci {
  id: number
  name: string
}

@Component({
  name: 'ListItem'
})
export default class extends Vue {
  @Prop() id!: string
  @Prop() img!: string
  public songs: Musci[] = []

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getDetail(this.id)
    this.songs = data.data.playlist.tracks.slice(0, 8)
  }

  private playSong(index: number) {
    const options = {
      currentIndex: index,
      ids: this.songs[0].id.toString(),
      songs: [{ name: this.songs[index].name, id: this.songs[0].id }]
    }
    this.songs.forEach((item: Musci) => {
      options.ids += ',' + item.id
    })
    SongListModule.querySongsA(options)
  }
}
</script>

<style lang="scss" scoped>
.ranking-img {
  width: 100%;
  height: 130px;
  object-fit: cover;
}
.songs {
  height: 256px;
  display: flex;
  flex-direction: column;
  .s-item {
    display: grid;
    grid-template-columns: 0.5fr 5fr 2fr;
    height: 30px;
    font-size: 13px;
    color: #999;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    .name {
      cursor: default;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .singer {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .all {
    font-size: 13px;
    color: #999;
  }
}
</style>
