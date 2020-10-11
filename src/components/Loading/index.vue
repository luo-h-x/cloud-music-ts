<template>
  <div>
    <div
      class="load"
      v-loading="loading"
      element-loading-text="努力加载中"
      element-loading-background="#fff"
      v-if="loading"
    >
      <button v-if="showC" class="h-loading" @click="hideLoading">
        关闭 loading
      </button>
    </div>
    <div :class="{ hide: loading }">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'Loading'
})
export default class extends Vue {
  public loading: boolean = true
  public count: number = 0
  public showC: boolean = false
  @Prop() loadLength!: number

  public imgLoading() {
    this.count++
    if (this.count >= this.loadLength) {
      this.loading = false
    }
  }

  public hideLoading() {
    this.loading = false
  }

  public showLoading() {
    this.count = 0
    this.loading = true
    this.delayL()
  }

  public delayL() {
    this.showC = false
    const timer = setTimeout(() => {
      this.showC = true
      clearTimeout(timer)
    }, 1000)
  }

  public noMore() {
    this.loading = false
  }

  mounted() {
    this.delayL()
  }
}
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}
.load {
  width: 100%;
  height: calc(96vh - 200px);
  position: absolute;
}
.h-loading {
  position: absolute;
  z-index: 2001;
  // left: 50%;
  top: 20px;
  // transform: translateX(-50%);
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: none;
  color: #409eff;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  font-size: 14px;
  border-radius: 4px;
  padding: 12px 20px;
}
</style>
