<template>
<div id="page">
  <div class="album-page" v-if="album">
    <!-- 专辑信息 -->
    <div class="p-data">
      <img :src="album.picUrl + '?param=400y400'" class="data-photo" />
      <div class="p-content">
        <div class="p-main">
          <el-tag type="danger">专辑</el-tag>
          <h2 class="p-title">{{ album.name }}</h2>
        </div>
        <div class="p-actions" @click="play">
          <a href="javascript:;" class="p-btn btn-allplay"
            ><img src="~@/assets/play.svg" class="p-icon img-play" />播放全部</a
          >
          <a href="javascript:;" class="p-btn btn-collect"
            ><img src="~@/assets/like.svg" class="p-icon img-like" />收藏</a
          >
          <a href="javascript:;" class="p-btn btn-download"
            ><img
              src="~@/assets/download.svg"
              class="p-icon img-download"
            />下载</a
          >
        </div>
        <router-link
          class="nickname"
          :to="{ path: '/Singer', query: { id: album.artists[0].id } }"
          >歌手: {{ album.artists[0].name }}</router-link
        >
        <span class="time">时间: {{ album.publishTime }}</span>
      </div>
    </div>

    <el-tabs v-model="activeName" @tab-click="tabC">
      <el-tab-pane label="歌曲列表" name="歌曲列表">
        <Songs ref="songs" />
      </el-tab-pane>
      <el-tab-pane label="评论" name="评论">
        <Comments />
      </el-tab-pane>
      <el-tab-pane label="专辑详情" name="专辑详情">
        <Details />
      </el-tab-pane>
    </el-tabs>
  </div>
  <div class="load" v-else>loading</div>
</div>
</template>

<script lang="ts">
import api from '@/api/album'
import utils from '@/utils/common'
import { Vue, Component } from 'vue-property-decorator'
import Details from './ADetails/index.vue'
import Songs from './ASongs/index.vue'
import Comments from '@/components/Comments/index.vue'

interface Album {
  publishTime: string
}

@Component({
  name: 'Album',
  components: {
    Details,
    Songs,
    Comments
  }
})
export default class extends Vue {
  public activeName: string = '歌曲列表'
  public album: Album | null = null

  mounted() {
    sessionStorage.getItem('tab')
      ? (this.activeName = sessionStorage.getItem('tab') as string)
      : this.activeName
    this.getQ()
  }

  private async getQ() {
    const data = await api.getAlbum(this.$route.query.id as string)
    this.album = data.data.album as Album
    this.album.publishTime = utils.formatDate(this.album.publishTime, 0)
  }

  private toChange(path: string) {
    this.$router.push({ path: path, query: { id: this.$route.query.id } })
  }

  private play() {
    const songs = this.$refs.songs as Songs
    songs.playSong(0)
  }

  private tabC(tab: { name: string }) {
    this.activeName = tab.name
    sessionStorage.setItem('tab', this.activeName)
  }
}
</script>

<style lang="scss" scoped>
.load{
  width: 100%;
  text-align: center;
  color: #409eff;
}
.album-page {
  // 歌单信息
  .p-data {
    display: flex;
    // 右侧图
    .data-photo {
      width: 250px;
      height: 250px;
      margin-right: 25px;
    }
    // 左侧内容
    .p-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      // 标题
      .p-main {
        display: flex;
        .p-title {
          font-size: 20px;
          font-weight: normal;
          margin: 0 20px;
        }
        .p-count {
          display: flex;
          color: #ccc;
          .left {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin: 0 10px;
          }
          .right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin: 0 5px;
          }
          span {
            font-size: 14px;
          }
        }
      }
      // 操作
      .p-actions {
        display: flex;
        align-items: center;
        margin: 10px 0;
        .p-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 122px;
          border: 1px solid #c9c9c9;
          font-size: 14px;
          border-radius: 2px;
          white-space: nowrap;
          margin-right: 10px;
          line-height: 38px;
        }
        .btn-collect:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        .btn-download:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        .btn-allplay {
          border: 1px solid #31c27c;
          background-color: #31c27c;
          color: #fff;
        }
      }
      .nickname {
        font-size: 14px;
        color: #999;
        margin: 5px 0;
      }
      .time {
        font-size: 14px;
        color: #999;
        margin: 5px 0;
      }
    }
  }
  .p-icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    cursor: pointer;
  }
  // 歌单列表
  .p-list {
    margin: 20px 0;
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
</style>
