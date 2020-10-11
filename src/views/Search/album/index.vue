<template>
  <Loading :loadLength="album.albums.length">
    <ul v-if="album.albums.length>0" class="singer-album">
      <li
        class="singer-album-item"
        v-for="(item, index) in album.albums"
        :key="index"
      >
        <img
          @load="show"
          :src="item.picUrl + '?param=100y100'"
          class="sa-pic"
        />
        <router-link
          :to="{ path: '/Album', query: { id: item.id } }"
          class="sa-title"
          >{{ item.name }}</router-link
        >
        <router-link
          :to="{ path: '/Singer', query: { id: item.artist.id } }"
          class="sa-title"
          >{{ item.artist.name }}</router-link
        >
      </li>
    </ul>
    <span v-else> 暂无相关信息 </span>
  </Loading>
</template>

<script lang="ts">
import api from '@/api/search'
import { SearchAlbum } from '@/interface/module/search'
import Loading from '@/components/Loading/index.vue'
import LoadingM from '@/mixins/loadingMixin'
import { Mixins, Component } from 'vue-property-decorator'

@Component({
  name: 'SAlbum',
  components: {
    Loading
  }
})
export default class extends Mixins(LoadingM) {
  public album: SearchAlbum = { albums: [] }

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSearch(this.$route.query.keyword as string, 10)
    this.album = data.data.result
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
