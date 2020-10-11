<template>
  <div class="musicvideo">
    <div class="s-title">
      <h3>推荐MV</h3>
      <a href="javascript:;">更多>></a>
    </div>
    <ul class="mv-list">
      <li class="mv-list-item" v-for="(item, index) in mvList" :key="index">
        <!-- 图片 -->
        <div
          class="mv-img"
          @mouseenter="copywriterShow(index)"
          @mouseleave="copywriterHide"
          @click="toVideo(item.id)"
        >
          <img class="mv-main" :src="item.picUrl + '?param=800y450'" />
          <div class="mv-info">
            <img class="mv-headset" src="~@/assets/video2.svg" alt="" />
            <span class="mv-count">{{ item.playCount }}</span>
          </div>
          <div
            class="mv-copywriter"
            :class="active === index ? 'mvc-show' : ''"
          >
            <span class="mvc-text">{{ item.copywriter }}</span>
          </div>
        </div>
        <!-- 简介 -->
        <div class="mv-information">
          <a class="mv-i-title">{{ item.name }}</a>
          <router-link
            :to="{ path: '/Singer', query: { id: item.artists[0].id } }"
            class="mv-i-singer"
            >{{ item.artistName }}</router-link
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import api from '@/api/personalized'

@Component({
  name: 'MVideo'
})
export default class extends Vue {
  public mvList: [] = []

  public active: number = -1

  mounted() {
    this.getQ()
  }

  private async getQ() {
    // 获取推荐mv
    const data = await api.getMV()
    this.mvList = data.data.result
    this.mvList.pop()
  }

  private copywriterShow(index: number) {
    this.active = index
  }

  private copywriterHide() {
    this.active = -1
  }

  private toVideo(id: string) {
    this.$router.push({
      path: '/Video/Mv',
      query: {
        id: id
      }
    })
  }
}
</script>

<style lang="scss" scoped>
//推荐MV
.musicvideo {
  .mv-list {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .mv-list-item {
      width: 33%;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .mv-img {
        position: relative;
        overflow: hidden;
        .mv-main {
          width: 100%;
          object-fit: cover;
          display: block;
        }
        .mv-info {
          position: absolute;
          right: 0;
          top: 0;
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.2);
          .mv-headset {
            width: 20px;
            height: 20px;
          }
          .mv-count {
            color: #fff;
            font-size: 12px;
            line-height: 30px;
            margin-left: 5px;
          }
        }
        // 编辑推荐
        .mv-copywriter {
          width: 100%;
          position: absolute;
          bottom: -45px;
          transition: bottom 0.75s;
          background: rgba(0, 0, 0, 0.4);
          .mvc-text {
            color: #fff;
            font-size: 12px;
          }
        }
        // 编辑推荐显示
        .mvc-show {
          bottom: 0;
          transition: bottom 0.75s;
        }
      }
      .mv-information {
        flex: 1;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        .mv-i-singer {
          color: #897373;
        }
        .mv-i-title {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
