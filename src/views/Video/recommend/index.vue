<template>
  <div>
    <h3 class="headline">相关推荐</h3>
    <ul class="videos" v-if="songs">
      <li class="v-item" v-for="(item, index) in 3" :key="index">
        <img
          class="img"
          src="https://p2.music.126.net/BQYsS3AVVkrKVldEwnO_EA==/109951165143289264.jpg"
        />
        <div class="info">
          <span class="tit">快来解锁她们的元气颜值和可爱舞蹈吧</span>
          <span class="time">07:10</span>
          <a href="">by week</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.headline {
  font-size: 18px;
  line-height: 40px;
  font-weight: normal;
  border-bottom: 1px #ccc solid;
}
.videos {
  .v-item {
    display: flex;
    .img {
      width: 150px;
      height: 100px;
    }
    .info {
      display: flex;
      flex-direction: column;
      font-size: 13px;
    }
  }
}
</style>
