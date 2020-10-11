<template>
  <!-- 播放暂停 -->
  <div class="player">
    <a @click="prev" href="javascript:;" class="btn-prev" title="上一首">
      <img src="~@/assets/prev.svg" alt="" />
    </a>
    <a
      v-if="!isPlay"
      @click="toggle"
      href="javascript:;"
      class="btn-play"
      title="暂停"
    >
      <img src="~@/assets/playM.svg" alt="" />
    </a>
    <a
      v-else
      @click="toggle"
      href="javascript:;"
      class="btn-pause"
      title="播放"
    >
      <img src="~@/assets/pauseM.svg" alt="" />
    </a>
    <a @click="next" href="javascript:;" class="btn-next" title="下一首">
      <img src="~@/assets/next.svg" alt="" />
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { SongListModule } from '@/store/index'

@Component({
  name: 'Player'
})
export default class Player extends Vue {
  @Prop()isPlay!: boolean
  toSong() {
    if (this.$route.path === '/Song') {
      this.$router.push({
        path: '/Song',
        query: {
          id: SongListModule.songList[SongListModule.currentIndex].id.toString()
        }
      })
    }
  }

  prev() {
    SongListModule.prevM()
    this.toSong()
  }

  next() {
    SongListModule.nextM()
    this.toSong()
  }

  toggle() {
    this.$emit('control-toggle')
  }
}
</script>

<style lang="scss" scoped>
// 播放暂停
.player {
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn-prev {
    display: block;
    // width: 19px;
    // height: 20px;
    // background-image: url(../assets/player.png);
    // background-position: 0 -30px;
  }
  .btn-play {
    display: block;
    // width: 21px;
    // height: 29px;
    // background-image: url(../assets/player.png);
    // background-position: 0 0;
  }
  .btn-pause {
    display: block;
    // width: 21px;
    // height: 29px;
    // background-image: url(../assets/player.png);
    // background-position: -30px 0;
  }
  .btn-next {
    display: block;
    // width: 19px;
    // height: 20px;
    // background-image: url(../assets/player.png);
    // background-position: 0 -52px;
  }
  .icon_txt {
    font: 0/0 a;
  }
}
</style>
