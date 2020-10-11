<template>
  <div class="latestMusic-page">
    <!-- 导航 -->
    <div class="nav">
      <el-menu :default-active="this.$route.query.type" mode="horizontal">
        <el-menu-item
          v-for="(item, index) in navdata"
          :key="item.name"
          :index="navdata[index].type"
          @click="toChange(item.type)"
          >{{ item.name }}</el-menu-item
        >
      </el-menu>
    </div>
    <!-- 更多信息 -->
    <div class="singer-more">
      <List :list="songList" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import api from '@/api/discover'
import utils from '@/utils/common'
import List from '@/views/discover/LatestMusic/listM/index.vue'

@Component({
  name: 'LatestMudic',
  components: {
    List
  }
})
export default class extends Vue {
  public navdata = [
    { name: '全部', type: '0' },
    { name: '华语', type: '7' },
    { name: '欧美', type: '96' },
    { name: '韩国', type: '16' },
    { name: '日本', type: '8' }
  ]

  public songList: [] | null = null

  private toChange(type: string) {
    this.$router.push({
      path: '/Discover/LatestMusic',
      query: { type: type }
    })
  }

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSongN(this.$route.query.type as string)
    this.songList = data.data.data.slice(0, 20) as []
    this.songList.forEach((item: { duration: number | string }) => {
      item.duration = utils.formatDay(item.duration)
    })
  }
}
</script>

<style lang="scss" scoped>
// 导航
.nav {
  display: flex;
  .el-menu--horizontal {
    border: none;
  }
}
</style>
