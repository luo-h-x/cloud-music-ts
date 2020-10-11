<template>
  <div class="latestmusic">
    <div class="s-title">
      <h3>最新音乐</h3>
      <router-link to="/Discover/LatestMusic?type=0">更多>></router-link>
    </div>
    <ul class="lm-list">
      <li
        class="lm-list-item"
        v-for="(item, index) in latestList"
        :key="item.id"
      >
        <!-- 序号 -->
        <div class="lm-show">
          <span class="lm-s-number">0{{ index + 1 }}</span>
        </div>
        <!-- 图片 -->
        <div class="lm-img" @click="playSong(index)">
          <img class="lm-img-main" :src="item.picUrl + '?param=60y60'" />
          <img class="lm-img-play" src="~@/assets/play.svg" alt="" />
        </div>
        <!-- 歌曲信息 -->
        <div class="lm-information">
          <a
            href="javascript:;"
            @dblclick="playSong(index)"
            class="lm-i-title"
            >{{ item.name }}</a
          >
          <router-link
            :to="{ path: '/Singer', query: { id: item.song.artists[0].id } }"
            class="lm-i-singer"
            >{{ item.song.artists[0].name }}</router-link
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import api from '@/api/personalized'
import { SongListModule } from '@/store/index.ts'

interface Musci {
  id: number
  name: string
}

@Component({
  name: 'IMusic'
})
export default class extends Vue {
  public latestList: Musci[] = []

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getLatest()
    this.latestList = data.data.result
  }

  private playSong(index: number) {
    const options = {
      currentIndex: index,
      ids: this.latestList[0].id.toString(),
      songs: [{ name: this.latestList[index].name, id: this.latestList[0].id }]
    }
    this.latestList.forEach((item: Musci) => {
      options.ids += ',' + item.id
    })
    SongListModule.querySongsA(options)
  }
}
</script>

<style lang="scss" scoped>
//最新音乐
.latestmusic {
  .lm-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border: 1px solid #ccc;
    height: 280px;
    overflow: hidden;
    .lm-list-item {
      display: flex;
      width: 50%;
      padding-top: 1%;
      font-size: 13px;
      &:hover {
        background: rgba(0, 0, 0, 0.2) !important;
      }
      &:nth-child(odd) {
        background: #f4f4f5;
      }
      .lm-show {
        width: 40px;
        text-align: center;
        .lm-s-number {
          line-height: 50px;
        }
      }
      // 图片
      .lm-img {
        position: relative;
        width: 50px;
        height: 50px;
        cursor: pointer;
        .lm-img-main {
          width: 100%;
          height: 100%;
        }
        .lm-img-play {
          width: 20px;
          height: 20px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      // 歌曲信息
      .lm-information {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 3%;
        white-space: nowrap;
        overflow: hidden;
        .lm-i-title {
          cursor: default;
          line-height: 30px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .lm-i-singer {
          line-height: 30px;
          font-size: 14px;
          color: #897373;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
