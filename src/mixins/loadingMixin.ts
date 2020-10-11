import { Vue, Component } from 'vue-property-decorator'
// import Loading from '@/components/Loading/index.vue'
@Component
export default class LoadingMixin extends Vue {
  public loadingV!: any

  public show() {
    this.loadingV.imgLoading()
  }

  mounted () {
    this.loadingV = this.$children[0] 
    // console.log(this.$children);
        
  }

  public loading(type = 0) {
    type ? this.loadingV.showLoading() : this.loadingV.hideLoading()
  }
}
