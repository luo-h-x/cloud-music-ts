<template>
  <div>
    <div class="songR" v-if="suggest.songs">
      <span class="hot-tit">单曲</span>
      <ul class="suggest" style="padding-left: 20px">
        <li
          class="suggest-item"
          v-for="(item, index) in suggest.songs"
          :key="index"
          @click="hide()"
        >
          <span class="tit" @click="playSong(index)">{{ item.name }}</span
          >-
          <span class="tit" @click="playSong(index)">{{
            item.artists[0].name
          }}</span>
        </li>
      </ul>
    </div>
    <div class="songR" v-if="suggest.artists">
      <span class="hot-tit">歌手</span>
      <ul style="padding-left: 20px">
        <li
          class="suggest-item"
          v-for="(item, index) in suggest.artists"
          :key="index"
          @click="hide"
        >
          <router-link :to="{ path: '/Singer', query: { id: item.id } }">{{
            item.name
          }}</router-link>
        </li>
      </ul>
    </div>
    <div class="songR" v-if="suggest.albums">
      <span class="hot-tit">专辑</span>
      <ul style="padding-left: 20px">
        <li
          class="suggest-item"
          v-for="(item, index) in suggest.albums"
          :key="index"
          @click="hide"
        >
          <router-link :to="{ path: '/Album', query: { id: item.id } }"
            ><span>{{ item.name }}</span
            >- <span>{{ item.artist.name }}</span></router-link
          >
        </li>
      </ul>
    </div>
    <div class="songR" v-if="suggest.playlists">
      <span class="hot-tit">歌单</span>
      <ul style="padding-left: 20px">
        <li
          class="suggest-item"
          v-for="(item, index) in suggest.playlists"
          :key="index"
          @click="hide"
        >
          <router-link :to="{ path: '/PlayList', query: { id: item.id } }">{{
            item.name
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { SearchSong } from '@/interface/module/search'
import { SongListModule } from '@/store'
// enum SuggestStatus {
//   songs,
//   artists,
//   albums,
//   playlists
// }

import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'SSuggest'
})
export default class extends Vue {
  @Prop() suggest!: SearchSong

  private hide() {
    this.$emit('click-hide') // 去除提示框
  }

  private playSong(index: number) {
    if (this.suggest != null) {
      const options = {
        currentIndex: index,
        ids: this.suggest.songs[0].id.toString(),
        songs: [
          {
            name: this.suggest.songs[index].name,
            id: this.suggest.songs[index].id
          }
        ]
      }
      this.suggest.songs.forEach((item: { id: number; name: string }) => {
        options.ids += ',' + item.id
      })
      SongListModule.querySongsA(options)
    }
  }
}
</script>

<style lang="scss" scoped>
// 搜索建议
.s-suggest {
  max-height: 400px;
  margin-bottom: 10px;
  .suggest-item {
    margin-bottom: 10px;
    line-height: 40px;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    .tit {
      cursor: pointer;
    }
  }
}
.hot-tit {
  line-height: 36px;
}
</style>
