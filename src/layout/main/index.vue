<template>
  <div class="appMain">
    <el-backtop target=".main-scrollbar .el-scrollbar__wrap" :bottom="60">
      <img src="../../assets/backtop.svg" />
    </el-backtop>
    <keep-alive>
      <router-view
        v-if="this.$route.meta.keepAlive"
        :key="$route.fullPath"
      ></router-view>
    </keep-alive>
    <router-view
      v-if="!this.$route.meta.keepAlive"
      :key="$route.fullPath"
    ></router-view>
  </div>
</template>


