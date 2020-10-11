<template>
  <div class="deatils" v-if="description">
    <h3 class="ss-tit">专辑介绍</h3>
    <p class="si-content" v-for="(val, index) in description" :key="index">
      {{ val }}
    </p>
  </div>
  <p v-else>暂无介绍</p>
</template>

<script lang="ts">
import api from '@/api/album'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'ADetails'
})
export default class extends Vue {
  public description: [] = []

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getAlbum(this.$route.query.id as string)
    this.description =
      data.data.album.description && data.data.album.description.split('\n')
  }
}

</script>

<style>
.deatils {
  margin: 10px 0;
}
.ss-tit {
  font-size: 14px;
}
.si-content {
  line-height: 28px;
  text-indent: 28px;
}
</style>
