<template>
  <div class="recommended-songs">
    <div class="s-title">
      <h3>推荐歌单</h3>
      <router-link to="/Discover/SongList">更多>></router-link>
    </div>
    <ul class="s-list">
      <li
        class="s-list-item"
        v-for="(item, index) in songList"
        :key="item.id"
        @click="toPlayList(item.id)"
      >
        <div class="s-content">
          <div
            class="sc-img"
            @mouseenter="playShow(index)"
            @mouseleave="playHide"
          >
            <img
              @load="show"
              class="sc-main"
              :src="item.picUrl + '?param=200y200'"
            />
            <img
              class="s-play"
              :class="active === index ? 'sc-show' : ''"
              src="~@/assets/play.svg"
              alt=""
            />
            <!-- 播放数 -->
            <div class="sc-info">
              <img class="sc-headset" src="~@/assets/headset.svg" alt="" />
              <span class="sc-count">{{
                utils.countToString(item.playCount)
              }}</span>
            </div>
          </div>
          <!-- 标题 -->
          <span class="sc-title">{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import api from '@/api/personalized'
import utils from '@/utils/common'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'RMusic'
})
export default class extends Vue {
  public utils = utils
  public active: number = -1
  public songList: [] = []

  mounted() {
    this.getQ()
  }

  private async getQ() {
    // 获取推荐mv
    const data = await api.getList()
    this.songList = data.data.result
  }

  private playShow(index: number) {
    this.active = index
  }

  private playHide() {
    this.active = -1
  }

  // 跳转歌单详情页
  private toPlayList(id: string) {
    this.$router.push({ path: '/PlayList', query: { id: id } })
  }

  private show() {
    this.$emit('loading-show', this.songList.length)
  }
}
</script>

<style lang="scss" scoped>
// 推荐歌单
.recommended-songs {
  .s-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px 0;
    .s-list-item {
      width: 18%;
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
          transform: translateY(0);
          transition: transform 0.5s;
          &:hover {
            transform: translateY(-20px);
            transition: transform 0.5s;
          }
          .sc-main {
            width: 100%;
            height: 100%;
          }
          // 播放图标
          .s-play {
            display: none;
            position: absolute;
            right: 5%;
            bottom: 5%;
            width: 24px;
            height: 24px;
          }
          .sc-show {
            display: block;
          }
          // 播放数
          .sc-info {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            align-items: center;
            background: rgba(0, 0, 0, 0.2);
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
        }
        // 标题
        .sc-title {
          font-size: 13px;
          color: #303133;
        }
      }
    }
  }
}
</style>
