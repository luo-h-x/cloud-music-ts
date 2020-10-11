<template>
<div id="page">
  <div class="song-page" v-if="song">
    <!-- 歌曲详情 -->
    <div ref="music" class="song-detail">
      <img :src="song.al.picUrl + '?param=400y400'" class="song-pic" />
      <!-- 背景虚化 -->
      <div class="song-dark"></div>
      <img
        @load.once="show"
        :src="song.al.picUrl + '?param=400y400'"
        class="song-bg"
      />
      <div class="song-info">
        <span class="si-name">{{ song.name }}</span>
        <router-link
          :to="{ path: '/Singer', query: { id: song.ar[0].id } }"
          class="si-creator"
          >歌手: {{ song.ar[0].name }}</router-link
        >
        <router-link
          :to="{ path: '/Album', query: { id: song.al.id } }"
          class="si-album"
          >专辑: {{ song.al.name }}</router-link
        >
        <el-scrollbar
          ref="lyric"
          style="width: 400px; height: 220px;"
        >
          <!-- 歌词 -->
          <ul v-if="lyric.length > 0" class="si-lyric">
            <li
              class="si-lyric-item"
              v-for="(item, index) in lyric"
              :key="index"
              :class="lyricIndex === index ? 'active' : ''"
            >
              <span>{{ item.content }}</span>
            </li>
          </ul>
          <p style="text-align: center; color:#999;" v-else>纯音乐，请您欣赏</p>
        </el-scrollbar>
      </div>
    </div>
    <div class="song-extra">
      <Comments />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import api from '@/api/music'
import Comments from '@/components/Comments/index.vue'
import { Vue, Component } from 'vue-property-decorator'

interface Lyric {
  time: number
  content: string
}

@Component({
  name: 'Song',
  components: {
    Comments
  }
})
export default class extends Vue {
  public song: {} | null = null
  public lyric: Lyric[] = []
  public lyricIndex: number = 0
  public timer: number | null = 0

  mounted() {
    this.$eventBus.$on('auto-lyric', (currentTime: number)=> {
      this.autoLyric(currentTime)
    })
    // 歌曲信息
    api.getSong(this.$route.query.id as string).then(val => {
      this.song = val.data.songs[0]
    })
    // 歌曲歌词
    this.queryLyric()
  }

  beforeDestroy () {
    this.$eventBus.$off('auto-lyric')
  }

  private queryLyric() {
    api.getLyric(this.$route.query.id as string).then(val => {
      if (val.data.nolyric) return
      const lyric: Lyric[] = []
      // lyric = lyric.replace(/\[(\d+):(\d+).(\d+)\]/g, '').split('\n')
      // lyric = val.data.lrc.lyric.split('↵')
      val.data.lrc.lyric.replace(
        /\[(\d+):(\d+.\d+)\]([^\n]+)/g,
        (_: RegExpMatchArray, m: number, s: number, content: string) => {
          lyric.push({
            time: m * 60 + Number(s),
            content
          })
        }
      )
      this.lyric = lyric
    })
  }

  // 歌词高亮自适应
  private  autoLyric(currentTime: number) {
      this.lyric.forEach((item, index) => {
        const time = item.time
        if (currentTime >= time) {
          this.lyricIndex = index
          if (this.timer) return
          // 节流
          this.timer = setTimeout(() => {
            // 歌词滚动 还需优化
            if (this.lyricIndex > 2 && this.$refs.lyric) {
              const srcollEl = (this.$refs.lyric as  any).wrap
              srcollEl.scrollTo({
                top: 40 * (this.lyricIndex - 2),
                behavior: 'smooth'
              })
            }
            this.timer = null
          }, 2000)
        }
      })
    }

  private lyricComplete() {
    if (this.lyricIndex >= this.lyric.length && this.$refs.lyric) {
      const srcollEl = (this.$refs.lyric as  any).wrap
      srcollEl.scrollTop = 0
    }
  }

  private show() {
    console.log('loading')
  }
}
</script>

<style lang="scss" scoped>
.song-page {
  display: flex;
  flex-direction: column;
  // 歌曲
  .song-detail {
    display: flex;
    position: relative;
    margin-bottom: 50px;
    // 背景虚化
    .song-dark {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 100;
    }
    .song-bg {
      width: 100%;
      height: 100%;
      filter: blur(10px);
      object-fit: cover;
      position: absolute;
    }
    .song-pic {
      z-index: 1000;
      width: 330px;
      height: 330px;
      margin: 30px;
    }
    .song-info {
      z-index: 1000;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .si-name {
        font-size: 24px;
        color: #fff;
        margin-top: 10px;
      }
      .si-creator {
        font-size: 14px;
        color: #999;
        line-height: 28px;
      }
      .si-album {
        font-size: 14px;
        color: #999;
        line-height: 28px;
        margin-bottom: 10px;
      }
      // 歌词
      .si-lyric {
        font-size: 14px;
        color: #fff;
        text-align: center;
        .si-lyric-item {
          line-height: 20px;
          margin-bottom: 20px;
        }
        .active {
          color: #31c27c;
        }
      }
    }
  }
  // 听友评论
}
</style>
