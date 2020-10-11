<template>
  <el-popover placement="bottom" width="400" trigger="click">
    <el-scrollbar>
      <!-- 搜索建议 -->
      <div class="s-suggest" v-if="suggest">
        <Suggest :suggest="suggest" @click-hide="clickHide" />
      </div>
      <!-- 热搜 -->
      <div v-else>
        <Hot
          @click-hide="clickHide"
          @search-word="searchWord"
          @to-suggest="toSuggest"
        />
      </div>
    </el-scrollbar>
    <input
      placeholder="搜索音乐、MV、歌单、用户"
      class="search-input"
      slot="reference"
      ref="inputS"
      v-model="search"
      @input="toSuggest"
      @keydown.enter="toSearch"
      @focus="toSuggest"
    />
  </el-popover>
</template>

<script lang="ts">
import api from '@/api/search'
import Hot from './hot/index.vue'
import Suggest from './suggest/index.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Search',
  components: {
    Hot,
    Suggest
  }
})
export default class extends Vue {
  public search: string = ''
  public timer: number = 0
  public suggest: {} | null = null

  private searchWord(word: string) {
    this.search = word
  }

  private toSuggest() {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.getdata()
    }, 1000)
  }

  private getdata() {
    if (this.search) {
      api.getSearchS(this.search).then(val => {
        this.suggest = val.data.result
      })
    } else {
      this.suggest = null
    }
  }

  private clickHide() {
    (this.$refs.inputS as HTMLInputElement).click() // 去除提示框
  }

  private toSearch() {
    this.clickHide()
    this.$router.push({
      path: '/Search/Song',
      query: { keyword: this.search }
    })
  }
}
</script>

<style lang="scss">
.search-input {
  background-color: #fff;
  background-image: none;
  border-radius: 99px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 300px;
  height: 30px;
  font-size: 13px;
}
</style>
