<template>
  <div class="anchor-page">
    <div class="banner">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img
            class="banner-imgs"
            src="http://p1.music.126.net/vOKG9-G6A8iMsjj2Wv5HbQ==/109951165180698184.jpg?imageView&quality=89"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.anchor-page {
  // 轮播
  .banner {
    margin: 20px 0;
    .banner-imgs {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
