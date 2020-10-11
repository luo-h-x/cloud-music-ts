<template>
  <div class="navbar-page">
    <Logo />
    <History />
    <Search />
    <Login />
  </div>
</template>
<script lang="ts">
import Logo from '@/layout/navbar/logo/index.vue'
import Login from '@/layout/navbar/login/index.vue'
import History from '@/layout/navbar/history/index.vue'
import Search from '@/layout/navbar/search/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Navbar',
  components: {
    Logo,
    Login,
    History,
    Search
  }
})
export default class Navbar extends Vue {
}
</script>

<style lang="scss" scoped>
.navbar-page {
  display: flex;
  width: 100%;
  // height: 54px;
  justify-content: space-between;
  align-items: center;
}
</style>
