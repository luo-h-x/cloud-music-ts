<template>
  <!-- 添加评论 -->
  <div class="c-input">
    <el-input
      type="textarea"
      placeholder="期待你的神评论……"
      v-model="textareaC"
      maxlength="140"
      show-word-limit
      :rows="3"
    >
    </el-input>
    <a href="javascript:;" class="c-replay" @click="toComment">发表评论</a>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'AddC'
})
export default class extends Vue {
  public textareaC: string = ''

  // 添加评论
  private toComment() {
    this.$emit('addComment', this.textareaC)
    this.textareaC = ''
  }
}
</script>

<style scoped lang="scss">
// 添加评论
.c-input {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .c-replay {
    line-height: 27px;
    border: 1px solid #31c27c;
    background-color: #31c27c;
    color: #fff;
    margin: 10px 0;
  }
}
</style>
