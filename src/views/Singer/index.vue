<template>
<div id="page">
  <div class="singer-page" v-if="singer">
    <!-- 歌手 -->
    <div class="singer">
      <!-- 右 -->
      <div class="singer-content">
        <img
          ref="imgs"
          @load.once="show()"
          src="https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg?param=200y200"
          class="singer-pic"
        />
        <router-link
          v-if="singer.accountId"
          :to="{ path: '/User', query: { uid: singer.accountId } }"
          class="singer-user"
        >
          <img class="su-img" src="~@/assets/person.svg" alt="" />
          <span class="su-title">个人主页 ></span>
        </router-link>
      </div>
      <!-- 左 -->
      <div class="singer-relevant">
        <div class="sr-title">
          <el-tag type="danger">歌手</el-tag>
          <h2 class="sr-name">{{ singer.name }}</h2>
          <a href="javascript:;" class="btn-collect"
            ><img src="~@/assets/like.svg" class="img-like" />收藏</a
          >
        </div>
        <div class="sr-count">
          <span class="count">单曲数: {{ singer.musicSize }}</span>
          <span class="count">专辑数: {{ singer.albumSize }}</span>
          <span class="count">MV数: {{ singer.mvSize }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="专辑" name="专辑">
        <Album />
      </el-tab-pane>
      <el-tab-pane label="MV" name="MV">
        <Mv />
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="歌手详情">
        <Deatil />
      </el-tab-pane>
      <el-tab-pane label="相似歌手" name="相似歌手">
        相似歌手
      </el-tab-pane>
    </el-tabs>
    <!-- 导航 -->
    <!-- <div class="nav">
      <el-menu :default-active="this.$route.meta.title" mode="horizontal">
        <el-menu-item
          v-for="(item, index) in discover"
          :key="index"
          :index="item.name"
          @click="toChange(item.path)"
          >{{ item.name }}</el-menu-item
        >
      </el-menu>
    </div> -->
    <!-- 更多信息 -->
    <!-- <div class="singer-more">
      <router-view />
    </div> -->
  </div>
  <div class="load" v-else>loading</div>
</div>
</template>

<script lang="ts">
import api from '@/api/singer'
import Album from './album/index.vue'
import Deatil from './details/index.vue'
import Mv from './mv/index.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Singer',
  components: {
    Album,
    Deatil,
    Mv
  }
})
export default class extends Vue {
  public activeName: string = '专辑'
  public singer: { img1v1Url: string } | null = null

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSinger(this.$route.query.id as string)
    this.singer = data.data.artist
  }

  private show() {
    const img = this.$refs.imgs as HTMLImageElement
    if (this.singer != null) img.src = this.singer.img1v1Url + '?param=250y250'
  }
}
</script>

<style lang="scss" scoped>
.load{
  width: 100%;
  text-align: center;
  color: #409eff;
}
.singer-page {
  // 歌手
  .singer {
    display: flex;
    .singer-content {
      position: relative;
      .singer-pic {
        width: 250px;
        height: 250px;
        margin-right: 25px;
      }
      .singer-user {
        width: 100px;
        position: absolute;
        left: 50%;
        bottom: 50px;
        transform: translateX(-50%);
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        .su-img {
          width: 20px;
        }
        .su-title {
          margin-left: 5px;
          color: #fff;
          font-size: 12px;
          line-height: 30px;
        }
      }
    }
    .singer-relevant {
      flex: 1;
      .sr-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .sr-name {
          font-size: 20px;
          font-weight: normal;
          width: 75%;
        }
        .btn-collect {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 81px;
          border: 1px solid #c9c9c9;
          font-size: 14px;
          border-radius: 2px;
          white-space: nowrap;
          margin-right: 10px;
          line-height: 30px;
          &:hover {
            background: rgba(0, 0, 0, 0.1);
          }
          .img-like {
            width: 16px;
            margin-right: 5px;
          }
        }
      }
      .sr-count {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: #999;
        .count {
          margin-top: 10px;
        }
      }
    }
  }
  // 导航
  .nav {
    display: flex;
    border-bottom: solid 1px #e6e6e6;
    .el-menu--horizontal {
      border: none;
    }
  }
}
</style>
