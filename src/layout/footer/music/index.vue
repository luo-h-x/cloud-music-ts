<template>
  <!-- 歌曲 -->
  <div v-if="songList.length > 0" class="player-song">
    <router-link
      :to="{ path: '/Song', query: { id: songList[currentIndex].id } }"
      ><img
        :src="songList[currentIndex].al.picUrl + '?param=100y100'"
        class="ps-pic"
    /></router-link>
    <div class="ps-creator">
      <router-link
        class="psc-tit"
        :to="{ path: '/Song', query: { id: songList[currentIndex].id } }"
        >{{ songList[currentIndex].name }}</router-link
      >
      <router-link
        :to="{
          path: '/Singer',
          query: { id: songList[currentIndex].ar[0].id }
        }"
        class="psc-name"
        >{{ songList[currentIndex].ar[0].name }}</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SongListModule } from '@/store/index'

@Component({
  name: 'MusicI'
})
export default class MusicI extends Vue {

  get songList() {
    return SongListModule.songList
  }

  // mounted() {
  //   const options = {
  //     currentIndex: 0,
  //     ids: '1481858852,1482105903',
  //     songs: [{ name: '2', id: 1481858852 }]
  //   }
  //   SongListModule.querySongsA(options)
  // }

  get currentIndex() {
    return SongListModule.currentIndex
  }
}
</script>

<style lang="scss" scoped>
// 歌曲
.player-song {
  width: 160px;
  display: flex;
  align-items: center;
  margin-right: 20px;
  .ps-pic {
    width: 40px;
  }
  .ps-creator {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .psc-tit {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 110px;
    }
    .psc-name {
      font-size: 14px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 110px;
    }
  }
}
</style>
