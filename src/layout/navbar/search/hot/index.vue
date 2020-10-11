<template>
  <div v-if="hotSearch">
    <span class="hot-tit">热搜榜</span>
    <ul class="hot-search">
      <li
        class="hot-search-item"
        v-for="(item, index) in hotSearch"
        :key="item.content"
        @click="toSearch(index)"
      >
        <span class="order">{{ index + 1 }}</span>
        <div class="c">
          <div class="hs-t">
            <span class="hs-name">{{ item.searchWord }}</span>
            <span class="hs-score">{{ item.score }}</span>
          </div>
          <span class="hs-content">{{ item.content }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import api from '@/api/search'
import { HotSearch } from '@/interface/module/search'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'SHot'
})
export default class extends Vue {
  public hotSearch: HotSearch[] | null = null

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSearchHot()
    this.hotSearch = data.data.data
  }

  toSearch(index: number) {
    if (this.hotSearch != null) {
      this.$emit('click-hide') // 去除提示框
      // 跳转搜索页
      this.$router.push({
        path: '/Search/Song',
        query: { keyword: this.hotSearch[index].searchWord }
      })
      // 搜索框填值
      this.$emit('search-word', this.hotSearch[index].searchWord)
      this.$emit('to-suggest')
    }
  }
}
</script>

<style lang="scss" scoped>
.hot-search {
  max-height: 400px;
  .hot-search-item {
    cursor: pointer;
    display: flex;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    .c {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      .hs-t {
        margin-bottom: 10px;
      }
      .hs-name {
        font-weight: 800;
      }
      .hs-score {
        margin-left: 10px;
        font-size: 12px;
        color: #ccc;
      }
    }
    .order {
      width: 30px;
      text-align: center;
      font-weight: 800;
      color: #dd5353;
    }
  }
}
.hot-tit {
  line-height: 36px;
}
</style>
