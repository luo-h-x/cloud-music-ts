<template>
  <div class="layout">
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-container style="overflow: auto;">
        <el-aside width="200px">
          <Sidebar />
        </el-aside>
        <el-scrollbar
          style="width: 100%;"
          class="main-scrollbar"
          ref="elscrollbar"
          id="elscrollbar"
        >
          <el-main>
            <Main />
          </el-main>
        </el-scrollbar>
      </el-container>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import Navbar from './navbar/index.vue'
import Footer from './footer/index.vue'
import Sidebar from './sidebar/index.vue'
import Main from './main/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Layout',
  components: {
    Navbar,
    Footer,
    Sidebar,
    Main
  }
})
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
.layout {
  width: 144vh;
  height: 96vh;
  box-shadow: 0 2px 14px 2px #ccc;
  .el-container {
    height: 100%;
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
    .el-header {
      display: flex;
      align-items: center;
      padding: 0 !important;
    }
    .el-main {
      background: #fff;
    }
    .el-footer {
      display: flex;
      align-items: center;
    }
  }
}
</style>
