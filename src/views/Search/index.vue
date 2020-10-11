<template>
  <div class="search-page">
    <div>
      搜索 <em class="keyword">"{{ this.$route.query.keyword }}"</em>
    </div>
    <el-menu :default-active="this.$route.meta.title" mode="horizontal">
      <el-menu-item
        v-for="(item) in navdata"
        :key="item.name"
        :index="item.name"
        @click="toChange(item.path)"
        >{{ item.name }}</el-menu-item
      >
    </el-menu>
    <div class="search-more">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'SearchResult'
})
export default class extends Vue {
  public navdata = [
    { name: '单曲', path: '/Search/Song' },
    { name: '歌手', path: '/Search/Singer' },
    { name: '专辑', path: '/Search/Album' },
    { name: '视频', path: '/Search/Video' },
    { name: '歌单', path: '/Search/Songsheet' },
    { name: '用户', path: '/Search/User' }
  ]

  private toChange(path: string) {
    this.$router.push({
      path: path,
      query: { keyword: this.$route.query.keyword }
    })
  }
}
</script>

<style>
.keyword {
  color:#409eff;
}
</style>
