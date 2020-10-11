<template>
<div id="page">
  <div  class="playList-page" v-if="detailInfo">
    <!-- 歌单信息 -->
    <P-data :detailInfo="detailInfo" @playSong="playSong" />
    <!-- 歌单列表 -->
    <P-lists :tableData="tableData" @playSong="playSong" />
    <!-- 评论 -->
    <Comments />
  </div>
  <div class="load" v-else>loading</div>
</div>
</template>

<script lang="ts">
import api from '@/api/playlist'
import utils from '@/utils/common'
import PData from './PData/index.vue'
import PLists from './PList/index.vue'
import Comments from '@/components/Comments/index.vue'
import { SongListModule } from '@/store'
import { Vue, Component } from 'vue-property-decorator'
import { PInfo, PList } from '@/interface/module/playList'

@Component({
  name: 'PlayList',
  components: {
    Comments,
    PLists,
    PData
  }
})
export default class extends Vue {
  public detailInfo: PInfo | null = null
  public tableData: PList[] | null = null

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getDetail(this.$route.query.id as string)
    this.detailInfo = data.data.playlist
    this.tableData = data.data.playlist.tracks

    if (this.detailInfo != null && this.tableData != null) {
      this.detailInfo.playCount = utils.countToString(
        this.detailInfo.playCount.toString()
      )
      // 123456 => 12万
      this.detailInfo.createTime = utils.formatDate(
        this.detailInfo.createTime,
        0
      )
      // 时间戳 => 日期
      this.tableData.forEach((item: PList) => {
        item.dt = utils.formatDay(item.dt)
      })
    }
  }

  // 标签歌单
  private toTag(tag: string) {
    this.$router.push({
      path: '/Discover/SongList',
      query: { cat: tag, limit: '32' }
    })
  }
  // 播放音乐
  playSong(index: number) {
    if (this.tableData != null) {
      const options = {
        currentIndex: index,
        ids: this.tableData[0].id.toString(),
        songs: [
          { name: this.tableData[index].name, id: this.tableData[index].id }
        ]
      }
      this.tableData.forEach((item: PList) => {
        options.ids += ',' + item.id
      })
      SongListModule.querySongsA(options)
    }
  }
}
</script>

<style lang="scss" scoped>
.load{
  width: 100%;
  text-align: center;
  color: #409eff;
}
.playList-page {
  // 歌单
  .songs-item {
    display: grid;
    grid-template-columns: 0.5fr 3fr 1.5fr 3fr 1fr;
    grid-column-gap: 10px;
    align-items: center;
    margin: 10px 0;
    font-size: 14px;
    color: #999;
    height: 50px;
    &:nth-child(even) {
      background: #fafafa;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.1) !important;
    }
    .sa-pic {
      width: 50px;
    }
    .tit {
      cursor: default;
    }
  }
  // 标题
  .header {
    margin-top: 20px;
    border: 1px solid #ccc;
    & > span {
      line-height: 50px;
      padding-left: 10px;
      border-left: 1px solid #ccc;
    }
  }
}
</style>
