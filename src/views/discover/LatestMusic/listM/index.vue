<template>
  <Loading loadLength="20">
    <ul class="singer-album">
      <li class="singer-album-item" v-for="(item, index) in list" :key="index">
        <span class="number">{{ index + 1 }}</span>
        <img
          @load="show"
          :src="item.album.picUrl + '?param=50y50'"
          class="sa-pic"
        />
        <a
          @dblclick="playSong(index)"
          title="双击播放"
          href="javascript:;"
          class="tit"
          >{{ item.name }}</a
        >
        <router-link
          :to="{ path: '/Singer', query: { id: item.artists[0].id } }"
          class="sa-title"
          >{{ item.artists[0].name }}</router-link
        >
        <router-link
          :to="{ path: '/Album', query: { id: item.album.id } }"
          class="sa-title"
          >{{ item.album.name }}</router-link
        >
        <span class="time">{{ item.duration }}</span>
      </li>
    </ul>
  </Loading>
</template>

<script lang="ts">
import { SongListModule } from '@/store/index.ts'
import { Component, Prop, Mixins } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue'
import loadingM from '@/mixins/loadingMixin'


interface Musci {
  id: number
  name: string
}

@Component({
  name: 'ListM',
  components: {
    Loading
  }
})
export default class extends Mixins(loadingM) {
  @Prop() list!: Musci[]
  public count: number = 0

  private playSong(index: number) {
    const options = {
      currentIndex: index,
      ids: this.list[0].id.toString(),
      songs: [{ name: this.list[index].name, id: this.list[index].id }]
    }
    this.list.forEach((item: Musci) => {
      options.ids += ',' + item.id
    })
    SongListModule.querySongsA(options)
  }
 

}
</script>

<style lang="scss" scoped>
.singer-album {
  .singer-album-item {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 3fr 2fr 2fr 2fr;
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
    .number {
      line-height: 50px;
      text-align: center;
    }
    .tit {
      cursor: default;
    }
  }
}
</style>
