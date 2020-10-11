<template>
  <div class="discover-page">
    <div class="nav">
      <el-menu :default-active="this.$route.meta.title" mode="horizontal">
        <el-menu-item
          v-for="(item, index) in discover"
          :key="index"
          :index="item.name"
          @click="toChange(item.path)"
          >{{ item.name }}</el-menu-item
        >
      </el-menu>
    </div>
    <div class="d-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class extends Vue {
  public discover = [
    { name: '个性推荐', path: '/Discover/Personality' },
    { name: '歌单', path: '/Discover/SongList' },
    // { name: '主播电台', path: '/Discover/RadioStation' },
    { name: '排行榜', path: '/Discover/RankingList' },
    { name: '歌手', path: '/Discover/SingerList' },
    { name: '最新音乐', path: '/Discover/LatestMusic?type=0' }
  ]

  public toChange(path: string) {
    this.$router.push(path)
  }
}
</script>

<style lang="scss" scoped>
.discover-page {
  display: flex;
  flex-direction: column;
  background: #fff;
  // 导航
  .nav {
    display: flex;
    justify-content: center;
    border-bottom: solid 1px #e6e6e6;
    .el-menu--horizontal {
      border: none;
    }
  }
}
</style>
