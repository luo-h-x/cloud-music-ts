<template>
  <div class="song-page" ref="songs">
    <Loading :loadLength="newList.length">
      <div>
        <!-- 标签 -->
        <el-tag color="#ef2424">热门标签:</el-tag>
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          :color="tag.color"
          @click="tagChange(tag.name)"
        >
          {{ tag.name }}
        </el-tag>
        <!-- 歌单列表 -->
        <ul class="s-list">
          <li
            class="s-list-item"
            v-for="(item, index) in newList"
            :key="index"
            @click="toPlayList(item.id)"
          >
            <div class="s-content">
              <div class="sc-img">
                <img
                  @load="show"
                  class="sc-main sc-restore"
                  :src="item.coverImgUrl + '?param=200y200'"
                />
                <!-- 播放数 -->
                <div class="sc-info">
                  <img class="sc-headset" src="~@/assets/headset.svg" alt="" />
                  <span class="sc-count">{{ item.playCount }}</span>
                </div>
                <!-- 歌单作者 -->
                <div class="sc-describe">
                  <img class="sc-d-img" src="~@/assets/person.svg" alt="" />
                  <span class="sc-d-title">{{ item.creator.nickname }}</span>
                </div>
              </div>
              <a href="javascript:;" class="sc-title">{{ item.name }}</a>
            </div>
          </li>
        </ul>
        <!-- 分页 -->
        <el-pagination
          @current-change="currentChange"
          background
          layout="prev, pager, next"
          :page-size="32"
          :total="total"
        >
        </el-pagination>
      </div>
    </Loading>
  </div>
</template>

<script lang="ts">
import api from '@/api/discover'
import utils from '@/utils/common'
import {  Component, Mixins } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue'
import loadingM from '@/mixins/loadingMixin'

@Component({
  name: 'SongL',
  components: {
    Loading
  }
})
export default class extends Mixins(loadingM) {
  public total: number = 100
  public newList: [] = []
  public tags = [
    { name: '华语', color: '#409eff' },
    { name: '流行', color: '#88ee86' },
    { name: '摇滚', color: '#2e2be8' },
    { name: '民谣', color: '#909399' },
    { name: '电子', color: '#e6a23c' },
    { name: '浪漫', color: '#e3f114' },
    { name: '轻音乐', color: '#f56c6c' },
    { name: '综艺', color: '#f4de8e' },
    { name: '影视原声', color: '#da56d6' }
  ]
  // 切换标签
  private tagChange(type: string) {
    this.$router.push({
      path: '/Discover/SongList',
      query: { cat: type, limit: '32' }
    })
  }
  // 跳转歌单详情页
  private toPlayList(id: string) {
    this.$router.push({ path: '/PlayList', query: { id: id } })
  }

  private async currentChange(index: number) {
    this.loading(1)
    // 滚动到歌单顶部
    const songs = this.$refs.songs as Element
    songs.scrollIntoView({
      block: 'start'
    })
    const data = await api.getTag(
      index,
      (this.$route.query.cat as string) || '全部'
    )
    const c = 32 * (index - 1)
    this.newList = data.data.playlists.slice(c)
    this.newList.forEach((item: { playCount: string }) => {
      item.playCount = utils.countToString(item.playCount)
    })
  }

  mounted() {
    this.$route.query.cat ? this.getQ2() : this.getQ()
  }

  private async getQ() {
    const data = await api.getNewList()
    this.newList = data.data.playlists
    this.newList.forEach((item: { playCount: string }) => {
      item.playCount = utils.countToString(item.playCount)
    })
  }

  private async getQ2() {
    const data = await api.getTag(1, this.$route.query.cat as string)
    this.newList = data.data.playlists
    this.newList.forEach((item: { playCount: string }) => {
      item.playCount = utils.countToString(item.playCount)
    })
  }
}
</script>

<style lang="scss" scoped>
// 推荐歌单
.song-page {
  // 标签
  .el-tag {
    color: #fff;
    margin: 10px;
    cursor: pointer;
  }
  // 歌单列表
  .s-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px 0;
    .s-list-item {
      width: 23%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 16px;
      position: relative;
      cursor: pointer;
      .s-content {
        display: flex;
        flex-direction: column;
        .sc-img {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          // 图片
          .sc-main {
            display: block;
            width: 100%;
            object-fit: fill;
            &:hover {
              transform: scale(1.1) translateZ(0);
              transition: transform 0.75s;
            }
          }
          // 图片还原动画
          .sc-restore {
            transform: scale(1) translateZ(0);
            transition: transform 0.75s;
          }
          // 播放数
          .sc-info {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            align-items: center;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 0 10px 0;
            .sc-headset {
              width: 20px;
              height: 20px;
            }
            .sc-count {
              color: #fff;
              font-size: 12px;
              line-height: 30px;
            }
          }
          // 歌单作者
          .sc-describe {
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            .sc-d-title {
              color: #fff;
              font-size: 13px;
              margin-left: 2%;
              line-height: 30px;
            }
            .sc-d-img {
              width: 20px;
              height: 20px;
            }
          }
        }
        // 歌单标题
        .sc-title {
          font-size: 15px;
          color: #303133;
        }
      }
    }
  }
  // 分页
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
