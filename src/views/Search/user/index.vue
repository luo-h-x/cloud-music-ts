<template>
  <Loading :loadLength="result.userprofiles.length">
    <ul v-if="result.userprofiles.length>0" class="singer-album">
      <li
        class="singer-album-item"
        v-for="(item, index) in result.userprofiles"
        :key="index"
      >
        <img
          @load="show"
          :src="item.avatarUrl + '?param=130y130'"
          class="sa-pic"
        />
        <router-link
          :to="{ path: '/User', query: { uid: item.userId } }"
          class="sa-title"
          >{{ item.nickname }}</router-link
        >
      </li>
    </ul>
    <span v-else> 暂无相关信息 </span>
  </Loading>
</template>

<script lang="ts">
import api from '@/api/search'
import { SearchUser } from '@/interface/module/search'
import Loading from '@/components/Loading/index.vue'
import LoadingM from '@/mixins/loadingMixin'
import { Mixins, Component } from 'vue-property-decorator'

@Component({
  name: 'SUser',
  components: {
    Loading
  }
})
export default class extends Mixins(LoadingM) {
  public result: SearchUser = { userprofiles: [] }

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSearch(this.$route.query.keyword as string, 1002)
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
      border-radius: 99px;
    }
  }
}
</style>
