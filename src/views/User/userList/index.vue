<template>
  <!-- 创建的歌单 -->
  <div class="u-create" v-if="userList">
    <h3 class="uc-name">Ta创建的歌单</h3>
    <!-- 歌单 -->
    <ul class="uc-songs">
      <li class="uc-songs-item" v-for="(item, index) in userList" :key="index">
        <img :src="item.coverImgUrl + '?param=50y50'" class="uc-pic" />
        <router-link
          :to="{ path: '/PlayList', query: { id: item.id } }"
          class="uc-title"
          >{{ item.name }}</router-link
        >
        <span class="uc-count">歌曲: {{ item.trackCount }}首</span>
        <!-- <span class="uc-creator">by {{ userInfo.profile.nickname }}</span> -->
        <!-- 收藏数 -->
        <div class="uc-collect">
          <img src="~@/assets/collect.svg" class="ucc-icon" />
          <span class="ucc-count">{{ item.subscribedCount }}</span>
        </div>
        <!-- 播放数 -->
        <div class="uc-play">
          <img src="~@/assets/play.svg" class="ucp-icon" />
          <span class="ucp-count">{{ item.playCount }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import api from '@/api/user'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'UserList'
})
export default class extends Vue {
  public userList: {} | null = null

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getUserList(this.$route.query.uid as string)
    this.userList = data.data.playlist
  }
}
</script>

<style lang="scss" scoped>
// 创建的歌单
.u-create {
  .uc-name {
    font-size: 20px;
    line-height: 28px;
    color: #666;
  }
  // 歌单
  .uc-songs {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-top: 3px solid #409eff;
    margin-bottom: 20px;
    .uc-songs-item {
      display: grid;
      grid-template-columns: 1.5fr 3fr 1.5fr 1.5fr 1.5fr;
      align-items: center;
      margin: 10px 0;
      .uc-pic {
        width: 50px;
        margin-left: 10px;
      }
      .uc-title {
        font-size: 14px;
      }
      .uc-count {
        font-size: 14px;
        color: #999;
      }
      .uc-creator {
        font-size: 14px;
        color: #999;
      }
      // 收藏数
      .uc-collect {
        display: flex;
        align-items: center;
        color: #999;
        .ucc-icon {
          width: 20px;
        }
        .ucc-count {
          font-size: 14px;
          margin-left: 3px;
        }
      }
      // 播放数
      .uc-play {
        display: flex;
        align-items: center;
        color: #999;
        font-size: 14px;
        .ucp-icon {
          width: 20px;
        }
        .ucp-count {
          margin-left: 3px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
