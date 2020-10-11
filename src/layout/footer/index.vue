<template>
  <div class="footer-page">
    <Music />
    <Player @control-toggle="toggle" :isPlay="isPlay" />
    <Progressbar ref="bar" :duration="duration" :step="step" />
    <Voice />
    <audio
      v-if="songList.length > 0"
      class="audio"
      :src="songList[currentIndex].url"
      autoplay
      ref="audio"
      @timeupdate="audioTimeUpdate"
      @ended="ended"
      @playing="playing"
      @play="play"
      @pause="pause"
      @error="error"
    ></audio>
  </div>
</template>

<script lang="ts">
import Music from '@/layout/footer/music/index.vue'
import Voice from '@/layout/footer/voice/index.vue'
import Progressbar from '@/layout/footer/progressbar/index.vue'
import Player from '@/layout/footer/player/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import utils from '@/utils/common'
import { SongListModule } from '@/store'

interface Lyric {
  time: number
  content: string
}

@Component({
  name: 'Footer',
  components: {
    Music,
    Voice,
    Progressbar,
    Player
  }
})
export default class Footer extends Vue {
  public timer: number | null = null
  // public currentTime: number = 0
  // public lyric: Lyric[] = []
  // public lyricIndex: number = 0
  public isPlay: boolean = false
  public step: number = 0.5
  public voice: number = 30
  public duration: string = '00:00'
  // public start: string = '00:00'

  get songList() {
    return SongListModule.songList
  }

  get currentIndex() {
    return SongListModule.currentIndex
  }

  // 播放中触发
  audioTimeUpdate() {
    this.autoLyric()
    // 进度条自动滑动
    const bar = this.$refs.bar as Progressbar
    if (this.timer) return
    this.timer = setTimeout(() => {
      bar.timeBar()
      this.timer = null
    }, 1000)
  }
  // 播放完时触发
  private ended() {
    const audio = this.$refs.audio as HTMLAudioElement
    audio.play()
    // this.isPlay = true
  }
  // 事件在音频/视频(audio/video)因缓冲而暂停或停止后已就绪时触发
  private playing() {
    this.isPlay = false
  }
  // 播放时触发
  play() {
    const audio = this.$refs.audio as HTMLAudioElement
    this.isPlay = false
    // 步长
    this.step = parseFloat((100 / audio.duration).toFixed(1))
    // 音量
    audio.volume = this.voice / 100
    this.duration = utils.formatDay(audio.duration * 1000)
    // 暂停mv
    const video = document.getElementsByTagName('video')[0]
    if (video) {
      video.pause()
    }
  }
  //暂停
  private pause() {
    this.isPlay = true
  }
  // 错误
  private error() {
    this.$notify({
      title: 'error',
      message: '亲爱的,出错了',
      type: 'error',
      duration: 2000,
      position: 'top-left'
    })
  }
  // 歌词高亮自适应
  private autoLyric() {
    const audio = this.$refs.audio as HTMLAudioElement
    if (audio) {
      this.$eventBus.$emit('auto-lyric', audio.currentTime)
    }
  }
  //暂停播放
  private toggle() {
    // this.isPlay = !this.isPlay
    const audio = this.$refs.audio as HTMLAudioElement
    if (audio) {
      !this.isPlay ? audio.pause() : audio.play()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-page {
  width: 100%;
  display: flex;
  align-items: center;
  height: 40px;
}
.audio {
  display: none;
}
</style>
