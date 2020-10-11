<template>
  <div class="singer-deatails-page" v-if="deatails">
    <div v-if="deatails.introduction.length > 0">
      <!-- 简介 -->
      <div class="singer-synopsis">
        <h3 class="ss-tit">简介</h3>
        <p class="ss-content">
          {{ deatails.briefDesc }}
        </p>
      </div>
      <div class="singer-introduction">
        <div
          class="si-info"
          v-for="(item, index) in deatails.introduction"
          :key="index"
        >
          <h3 class="si-tit">{{ item.ti }}</h3>
          <p class="si-content" v-for="(val, index) in item.txt" :key="index">
            {{ val }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>no more</div>
  </div>
</template>

<script lang="ts">
import api from '@/api/singer'
import { Vue, Component } from 'vue-property-decorator'

interface SingerD {
  introduction: Introduction[]
}

interface Introduction {
  txt: string | string[]
}

@Component({
  name: 'SingerD'
})
export default class extends Vue {
  public deatails: SingerD | null = null

  mounted() {
    this.getQ()
  }

  private async getQ() {
    const data = await api.getSingerDetails(this.$route.query.id as string)
    this.deatails = data.data
    if (this.deatails != null)
      this.deatails.introduction.forEach((item: Introduction) => {
        item.txt = (item.txt as string).split('\n')
      })
  }
}
</script>

<style lang="scss" scoped>
.singer-deatails-page {
  // 简介
  .singer-synopsis {
    margin-top: 20px;
    font-size: 14px;
    .ss-content {
      line-height: 28px;
      text-indent: 28px;
    }
  }
  .singer-introduction {
    .si-info {
      margin-top: 20px;
      font-size: 14px;
      .si-content {
        color: #666;
        line-height: 28px;
        text-indent: 28px;
      }
    }
  }
}
</style>
