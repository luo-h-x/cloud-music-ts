<template>
  <Loading :loadLength="result.artists.length">  
    <ul class="singer-album" v-if="result.artists.length>0">
      <li
        class="singer-album-item"
        v-for="item in result.artists"
        :key="item.id"
      >
        <img
          @load="show"
          :src="item.img1v1Url + '?param=130y130'"
          class="sa-pic"
        />
        <router-link
          :to="{ path: '/Singer', query: { id: item.id } }"
          class="sa-title"
          >{{ item.name }}</router-link
        >
        <!-- <a href="javascript:;" class="sa-title">{{ item.name }}</a> -->
      </li>
    </ul>
    <span v-else> 暂无相关信息 </span>
  </Loading>
</template>

<script lang="ts">
import api from '@/api/search'
import { SearchSinger } from '@/interface/module/search'
import Loading from '@/components/Loading/index.vue'
import LoadingM from '@/mixins/loadingMixin'
import { Mixins, Component } from 'vue-property-decorator'

@Component({
  name: 'SSinger',
  components: {
    Loading
  }
})
export default class extends Mixins(LoadingM) {
  public result: SearchSinger = { artists: [] }

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSearch(this.$route.query.keyword as string, 100)
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
