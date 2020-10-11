<template>
  <!-- 进度条 -->
  <div class="player-music">
    <span class="player-music-start">{{ start }}</span>
    <el-slider
      @input="autoCurrentTime"
      @change="changeCurrentTime"
      :step="step"
      :show-tooltip="false"
      v-model="currentTime"
    ></el-slider>
    <span class="player-music-end"> {{ duration }}</span>
  </div>
</template>

<script lang="ts">
import utils from '@/utils/common'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'Progressbar'
})
export default class Progressbar extends Vue {
  // @Prop() start!: string
  public start: string = '00:00'
  @Prop() duration!: string
  // @Prop() currentTime!: number
  @Prop() step!: number
  // @Prop() currentTime!: number
  public currentTime: number = 0
  // public audio = this.$parent.$refs.audio as HTMLAudioElement
  autoCurrentTime() {
    const audio = this.$parent.$refs.audio as HTMLAudioElement
    if (audio) {
      this.start = utils.formatDay(audio.currentTime * 1000)
    }
  }

  timeBar() {
    const audio = this.$parent.$refs.audio as HTMLAudioElement
    this.currentTime = (audio.currentTime / audio.duration) * 100
  }

  changeCurrentTime(val: number) {
    const audio = this.$parent.$refs.audio as HTMLAudioElement
    if (audio) {
      audio.currentTime = (audio.duration / 100) * val
    }
  }
}
</script>

<style lang="scss" scoped>
// 进度条
.player-music {
  margin: 0 30px;
  display: flex;
  width: 400px;
  .el-slider {
    flex: 1;
  }
  .player-music-start {
    line-height: 40px;
    margin: 0 10px;
    font-size: 13px;
  }
  .player-music-end {
    line-height: 40px;
    margin: 0 5px;
    font-size: 13px;
  }
}
</style>
