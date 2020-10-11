<template>
  <!-- 前进返回 -->
  <div class="nav-history">
    <div class="back" @click="back">
      <img class="img" src="~@/assets/back.svg" alt="" />
    </div>
    <div class="go" @click="go">
      <img class="img" src="~@/assets/go.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'History'
})
export default class History extends Vue {
  public back(): void {
    // window.history.back()
    this.$router.back()
    
  }
  public go(): void {
    // window.history.forward()
    this.$router.forward()
  }
}
</script>

<style lang="scss" scoped>
// 前进返回
.nav-history {
  display: flex;
  .back {
    width: 40px;
    height: 20px;
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
    .img {
      width: 20px;
    }
  }
  .go {
    width: 40px;
    height: 20px;
    text-align: center;
    margin-left: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    .img {
      width: 20px;
    }
  }
}
</style>
