<template>
  <div class="rankingList-page" v-if="ranking">
    <Loading :loadLength="ranking.length - 5">
      <!-- <h2 class="tit">官方榜</h2> -->
      <ul class="ro-item">
        <li v-for="(item, index) in ranking.slice(0, 4)" :key="index">
          <List-item :id="item.id" :img="item.coverImgUrl" />
        </li>
      </ul>
      <h2 class="tit">全球榜</h2>
      <ul class="rg-item">
        <li v-for="(item, index) in ranking.slice(4, -1)" :key="index">
          <router-link
            class="all"
            :to="{ path: '/PlayList', query: { id: item.id } }"
          >
            <img @load="show" class="img" :src="item.coverImgUrl + '?param=200y200'" />
            <span class="name">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </Loading>
  </div>
</template>

<script lang="ts">
import ListItem from './list-item/index.vue'
import api from '@/api/discover'
import { Component, Mixins } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue'
import loadingM from '@/mixins/loadingMixin'

@Component({
  name: 'RankingList',
  components: {
    ListItem,
    Loading
  }
})
export default class extends Mixins(loadingM) {
  public ranking: [] = []
  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getRankingA()
    this.ranking = data.data.list
  }
}
</script>

<style lang="scss" scoped>
.rankingList-page {
  .tit {
    margin-top: 10px;
    font-weight: normal;
    line-height: 48px;
    border-bottom: 1px #ccc solid;
  }
  .ro-item {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin-top: 20px;
  }
  .rg-item {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin-top: 20px;
    .all {
      display: flex;
      flex-direction: column;
      font-size: 13px;
      .img {
        width: 100%;
      }
    }
  }
}
</style>
