<template>
  <div class="user" v-if="userInfo">
    <div class="u-right">
      <!-- 头像 -->
      <img
        ref="imgs"
        @load.once="show()"
        src="https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=200y200"
        class="avatar-pic"
      />
      <router-link
        v-if="userInfo.profile.artistId"
        :to="{ path: '/Singer', query: { id: userInfo.profile.artistId } }"
        class="u-singer"
      >
        Ta的歌手页 >
      </router-link>
    </div>
    <!-- 右侧内容 -->
    <div class="u-content">
      <!-- 标题 -->
      <div class="u-info">
        <!-- nickname，sex,level -->
        <h2 class="ui-personal">
          <span class="uip-name">{{ userInfo.profile.nickname }}</span>
          <img
            v-if="userInfo.profile.gender"
            class="uip-sex"
            src="~@/assets/man.svg"
          />
          <img v-else class="uip-sex" src="~@/assets/woman.svg" />
          <span class="uip-level">LV{{ userInfo.level }}</span>
        </h2>
        <!-- 关注，私信 -->
        <div class="ui-handle">
          <a href="javascript:;" class="uih-btn"
            ><img
              src="~@/assets/letter.svg"
              class="p-icon img-letter"
            />发私信</a
          >
          <a href="javascript:;" class="uih-btn"
            ><img src="~@/assets/follow.svg" class="p-icon img-follow" />关注</a
          >
        </div>
      </div>
      <!-- 关注动态粉丝 -->
      <ul class="u-statistic">
        <li class="us-item us-item-first">
          <a href="javascript:;" class="us-tab"
            ><strong class="us-follow">{{ userInfo.profile.eventCount }}</strong
            ><span class="us-title">动态</span></a
          >
        </li>
        <li class="us-item">
          <a href="javascript:;" class="us-tab"
            ><strong class="us-follow">{{ userInfo.profile.follows }}</strong
            ><span class="us-title">关注</span></a
          >
        </li>
        <li class="us-item us-item-last">
          <a href="javascript:;" class="us-tab"
            ><strong class="us-follow">{{ userInfo.profile.followeds }}</strong
            ><span class="us-title">粉丝</span></a
          >
        </li>
      </ul>
      <!-- 社交网络 -->
      <p class="u-contact">
        <span>社交网络: 未绑定</span>
      </p>
      <!-- 所在地区 -->
      <div class="u-place">
        <span>所在地区: 江西省 南昌市</span>
      </div>
      <!-- 个人介绍 -->
      <p class="p-introduce">
        <span v-if="userInfo.profile.signature"
          >个人介绍: {{ userInfo.profile.signature }}</span
        >
        <span v-else>个人介绍: 暂无介绍</span>
      </p>
    </div>
  </div>
  <div class="load" v-else>loading</div>
</template>

<script lang="ts">
import api from '@/api/user'
import { UserInfo } from '@/interface/module/user'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'UserInfo'
})
export default class extends Vue {
  public userInfo: UserInfo | null = null

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getUser(this.$route.query.uid as string)
    this.userInfo = data.data
  }

  private show() {
    const img = this.$refs.imgs as HTMLImageElement
    if (this.userInfo != null) img.src = this.userInfo.profile.avatarUrl + '?param=250y250'
  }
}
</script>

<style lang="scss" scoped>
.load{
  width: 100%;
  text-align: center;
  color: #409eff;
}
.user {
  display: flex;
  margin-bottom: 50px;
}
.u-right {
  position: relative;
  // 头像
  .avatar-pic {
    width: 250px;
    height: 250px;
    margin-right: 25px;
  }
  .u-singer {
    width: 100px;
    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    line-height: 28px;
    font-size: 13px;
    border-radius: 10px;
    text-align: center;
  }
}

// 主要信息
.u-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  // 标题
  .u-info {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #ccc solid;
    .ui-personal {
      display: flex;
      align-items: center;
      // nickname
      .uip-name {
        font-size: 20px;
        font-weight: normal;
        line-height: 30px;
      }
      // sex
      .uip-sex {
        margin: 0 0 0 10px;
        // width: 20px;
        // height: 20px;
      }
      // level
      .uip-level {
        display: inline-block;
        color: #e03a24;
        font-size: 16px;
        font-weight: bold;
        font-style: italic;
        margin: 0 0 0 10px;
      }
    }
    // 关注，私信
    .ui-handle {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .uih-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 80px;
        border: 1px solid #c9c9c9;
        font-size: 14px;
        border-radius: 2px;
        white-space: nowrap;
        margin-right: 10px;
        line-height: 30px;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        .p-icon {
          width: 25px;
          height: 20px;
          margin-right: 3px;
        }
      }
    }
  }
  // 关注动态粉丝
  .u-statistic {
    display: flex;
    margin: 15px 0;
    .us-item {
      border-right: solid 1px #ccc;
      padding: 0 25px;
      .us-tab {
        display: flex;
        flex-direction: column;
        .us-follow {
          font-size: 24px;
          font-weight: normal;
        }
        .us-title {
          font-size: 14px;
          color: #999;
        }
      }
    }
    .us-item-last {
      border-right: none;
    }
    .us-item-first {
      padding-left: 0;
    }
  }
  // 社交网络
  .u-contact {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
  // 所在地区
  .u-place {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
  // 个人介绍
  .p-introduce {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
}
</style>
