<template>
  <div class="singer-page">
    <div class="s-sort">
      <div
        style="display: flex;align-items: center;"
        v-for="(item, index) in navList"
        :key="index"
      >
        <span class="tit">{{ item.tit }}:</span>
        <ul class="sort">
          <li class="tags" v-for="tag in item.sort" :key="tag.type">
            {{ tag.name }}
          </li>
        </ul>
      </div>
    </div>
    <Loading :loadLength="singers.length">
      <ul class="list">
        <li
          class="list-item"
          v-for="item in singers"
          :key="item.id"
          @click="toSinger(item.id)"
        >
          <img @load="show" :src="item.picUrl + '?param=200y200'" class="pic" />
          <span class="tit">{{ item.name }}</span>
        </li>
      </ul>
    </Loading>
  </div>
</template>

<script lang="ts">
import api from '@/api/discover'
import { Component, Mixins } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue'
import loadingM from '@/mixins/loadingMixin'

@Component({
  name: 'SingerL',
  components: {
    Loading
  }
})
export default class extends Mixins(loadingM) {
  public singers: [] = []
  public navList = [
    {
      tit: '语种',
      sort: [
        { name: '全部', type: '-1' },
        { name: '华语', type: '7' },
        { name: '欧美', type: '96' },
        { name: '日本', type: '8' },
        { name: '韩国', type: '16' },
        { name: '其他', type: '0' }
      ]
    },
    {
      tit: '分类',
      sort: [
        { name: '全部', type: '-1' },
        { name: '男歌手', type: '1' },
        { name: '女歌手', type: '2' },
        { name: '乐队组合', type: '3' }
      ]
    }
  ]

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSingerL()
    this.singers = data.data.artists
  }

  private toSinger(id: string) {
    this.$router.push({ path: '/Singer', query: { id: id } })
  }
}
</script>

<style lang="scss" scoped>

.s-sort {
  margin: 10px 0;
  .sort {
    font-size: 13px;
    color: #999;
    margin: 10px 0;
    display: flex;
    align-items: center;
    .tit {
      margin: 0 10px;
    }
    .all {
      height: 28px;
      width: 77px;
      text-align: center;
      line-height: 28px;
      margin: 0 10px;
    }
    .active {
      color: #000;
    }
    .tags {
      width: 60px;
      text-align: center;
      line-height: 28px;
      color: #999;
      cursor: pointer;
    }
  }
}
.list {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-top: 20px;
  .list-item {
    cursor: pointer;
    font-size: 13px;
    .pic {
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
