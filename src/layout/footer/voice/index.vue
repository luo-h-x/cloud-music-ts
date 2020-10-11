<template>
  <div class="player-voice">
    <a href="javascript:;" title="关闭声音[M]">
      <img class="btn-voice" src="~@/assets/volume.svg" alt="" />
    </a>
    <el-slider @input="changVolum" :value="voice"></el-slider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'VoiceI'
})
export default class VoiceI extends Vue {
  voice: number = 30
  changVolum(val: number) {
    const audio = this.$parent.$refs.audio as HTMLAudioElement
    
    if (audio) {
      audio.volume = val / 100
    }
    this.voice = val
  }
}
</script>

<style lang="scss" scoped>
// 调节音量
.player-voice {
  width: 100px;
  display: flex;
  align-items: center;
  .btn-voice {
    display: block;
    width: 26px;
    margin-right: 10px;
  }
  .el-slider {
    flex: 1;
  }
}
</style>
