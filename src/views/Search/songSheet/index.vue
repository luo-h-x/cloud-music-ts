<template>
  <Loading :loadLength="result.playlists.length">
    <ul class="singer-album" v-if="result.playlists.length>0">
      <li
        class="singer-album-item"
        v-for="(item, index) in result.playlists"
        :key="index"
      >
        <img
          @load="show"
          :src="item.coverImgUrl + '?param=130y130'"
          class="sa-pic"
        />
        <router-link
          :to="{ path: '/PlayList', query: { id: item.id } }"
          class="sa-title"
          >{{ item.name }}</router-link
        >
        <span class="sa-count">{{ item.trackCount }}首</span>
        <router-link
          :to="{ path: '/User', query: { uid: item.creator.userId } }"
          class="sa-title"
          >by: {{ item.creator.nickname }}</router-link
        >
      </li>
    </ul>
    <span v-else> 暂无相关信息 </span>
  </Loading>
</template>

<script lang="ts">
import api from '@/api/search'
import { SearchSongSheet } from '@/interface/module/search'
import Loading from '@/components/Loading/index.vue'
import LoadingM from '@/mixins/loadingMixin'
import { Mixins, Component } from 'vue-property-decorator'

@Component({
  name: 'SSongSheet',
  components: {
    Loading
  }
})
export default class extends Mixins(LoadingM) {
  public result: SearchSongSheet = { playlists: [] }

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSearch(this.$route.query.keyword as string, 1000)
    this.result = data.data.result
  }
}
</script>

<style lang="scss" scoped>
.singer-album {
  .singer-album-item {
    display: grid;
    grid-template-columns: 0.5fr 3fr 3fr 3fr;
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
  }
}
</style>
