<template>
<div id="page">
  <div class="user-page">
    <Info />
    <List />
  </div>
</div>
</template>

<script lang="ts">
import Info from './userInfo/index.vue'
import List from './userList/index.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'User',
  components: {
    Info,
    List
  }
})
export default class extends Vue {

}
</script>

<style lang="scss" scoped>
// .user-page {
// }
</style>
