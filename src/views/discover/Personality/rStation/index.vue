<template>
  <div class="radiostation">
    <div class="s-title">
      <h3>主播电台</h3>
      <a href="javascript:;">更多>></a>
    </div>
    <ul class="rs-list">
      <li class="rs-list-item" v-for="item in stationList" :key="item.id">
        <div class="rs-content">
          <img class="rs-img" :src="item.picUrl + '?param=200y200'" />
          <div class="rs-describe">
            <span class="rs-d-title">{{ item.name }}</span>
          </div>
        </div>
        <a class="rs-title" href="">{{ item.copywriter }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import api from '@/api/personalized'

@Component({
  name: 'RStation'
})
export default class extends Vue {
  public stationList: [] = []

  mounted() {
    this.getQ()
  }

  private async getQ() {
    // 获取推荐电台
    const data = await api.getStation()
    this.stationList = data.data.result
    this.stationList.pop()
  }
}
</script>

<style lang="scss" scoped>
//主播电台
.radiostation {
  .rs-list {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .rs-list-item {
      width: 18%;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      font-size: 13px;
      .rs-content {
        position: relative;
        // height: 100%;
        .rs-img {
          width: 100%;
          height: 100%;
          display: block;
        }
        .rs-describe {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          .rs-d-title {
            color: #fff;
            margin-left: 2%;
            line-height: 24px;
          }
        }
      }
      .rs-title {
        color: #303133;
      }
    }
  }
}
</style>
