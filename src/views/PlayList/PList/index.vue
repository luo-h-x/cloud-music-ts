<template>
  <!-- 歌单列表 -->
  <div class="p-list">
    <div class="songs-item header">
      <span></span>
      <span>标题</span>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </div>
    <ul class="songs">
      <li class="songs-item" v-for="(item, index) in tableData" :key="index">
        <span class="num">{{ index + 1 }}</span>
        <a
          @dblclick="playSong(index)"
          href="javascript:;"
          title="双击播放"
          class="tit"
          >{{ item.name }}</a
        >
        <router-link
          :to="{ path: '/Singer', query: { id: item.ar[0].id } }"
          class="sa-title"
          >{{ item.ar[0].name }}</router-link
        >
        <router-link
          :to="{ path: '/Album', query: { id: item.al.id } }"
          class="sa-title"
          >{{ item.al.name }}</router-link
        >
        <span class="dt">{{ item.dt }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { PList } from '@/interface/module/playList'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'PList'
})
export default class extends Vue {
  @Prop() tableData!: PList

  private playSong(index: number) {
    this.$emit('playSong', index)
  }

  
}
</script>

<style lang="scss" scoped>
// 歌单
.songs-item {
  display: grid;
  grid-template-columns: 0.5fr 3fr 1.5fr 3fr 1fr;
  grid-column-gap: 10px;
  align-items: center;
  margin: 10px 0;
  font-size: 14px;
  color: #999;
  height: 50px;
  &:nth-child(even) {
    background: #fafafa;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.1) !important;
  }
  .sa-pic {
    width: 50px;
  }
  .tit {
    cursor: default;
  }
}
</style>
