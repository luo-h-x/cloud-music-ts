<template>
  <div class="sidebar-page">
    <el-scrollbar>
      <div v-for="item in group" :key="item.tit">
        <h2 class="recommend">{{ item.tit }}</h2>
        <el-menu
          :default-active="defaultA"
          text-color="#000"
          active-text-color="#409EFF"
        >
          <router-link
            :to="child.path"
            v-for="child in item.children"
            :key="child.content"
          >
            <el-menu-item :index="child.content">
              <img class="sidebar-icon" :src="child.img" />
              <span class="title">{{ child.content }}</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'


@Component({
  name: 'Siderbar'
})
export default class Siderbar extends Vue {
  public group = [
    {
      tit: '推荐',
      children: [
        {
          path: '/Discover',
          content: '发现音乐',
          img: 'http://luohaoxiang.gitee.io/cloud-music/img/music.50876dbf.svg'
        },
        {
          path: '/Discover',
          content: '私人FM',
          img: 'http://luohaoxiang.gitee.io/cloud-music/img/fm.0c825e41.svg'
        },
        {
          path: '/Discover',
          content: 'LOOK直播',
          img: 'http://luohaoxiang.gitee.io/cloud-music/img/zb.2570453b.svg'
        },
        {
          path: '/Discover',
          content: '视频',
          img: 'http://luohaoxiang.gitee.io/cloud-music/img/video.ce32628f.svg'
        },
        {
          path: '/Discover',
          content: '朋友',
          img: 'http://luohaoxiang.gitee.io/cloud-music/img/person.b0f23edb.svg'
        }
      ]
    },
    {
      tit: '我的音乐',
      children: [
        {
          path: '/Discover',
          content: '本地音乐',
          img: 'http://luohaoxiang.gitee.io/cloud-music/img/music.50876dbf.svg'
        },
        {
          path: '/Discover',
          content: '下载管理',
          img:
            'http://luohaoxiang.gitee.io/cloud-music/img/download.cf3e6bdf.svg'
        }
      ]
    },
    {
      tit: '创建的歌单',
      children: [
        {
          path: '/Discover',
          content: '我喜欢的音乐',
          img: 'http://luohaoxiang.gitee.io/cloud-music/img/like.cccf4193.svg'
        }
      ]
    }
  ]
  public defaultA: string = '发现音乐'
}
</script>

<style lang="scss">
.sidebar-page {
  .recommend {
    line-height: 28px;
    color: #999;
    padding-left: 10px;
  }
  .el-menu {
    border: none;
    .sidebar-icon {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
}
</style>
