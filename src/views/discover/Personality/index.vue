<template>
  <div class="personality-page">
    <Loading :loadLength="19">
      <Banner @loading-show="loadingShow" />
      <Recommended-music @loading-show="loadingShow" />
      <Sole />
      <Latest-music />
      <Music-video />
      <Radio-station />
    </Loading>
  </div>
</template>

<script lang="ts">
import Banner from '@/views/discover/Personality/banner/index.vue'
import RecommendedMusic from '@/views/discover/Personality/rMusic/index.vue'
import Sole from '@/views/discover/Personality/sole/index.vue'
import LatestMusic from '@/views/discover/Personality/lMusic/index.vue'
import MusicVideo from '@/views/discover/Personality/mVideo/index.vue'
import RadioStation from '@/views/discover/Personality/rStation/index.vue'
import { Component, Mixins } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue'
import loadingM from '@/mixins/loadingMixin'

@Component({
  name: 'Personality',
  components: {
    Banner,
    RecommendedMusic,
    Sole,
    LatestMusic,
    MusicVideo,
    RadioStation,
    Loading
  }
})
export default class extends Mixins(loadingM) {
  public loadingShow() {
    this.loadingV.imgLoading()
  }
}
</script>

<style lang="scss">
.s-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  margin: 20px 0;
  > h3 {
    line-height: 40px;
    font-weight: 400;
  }
  > a {
    color: #999;
    font-size: 12px;
  }
}
</style>
