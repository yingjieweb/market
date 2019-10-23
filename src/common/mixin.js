import {debounce} from "./utils";
import BackTop from  'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null
    }
  },
  mounted() {
    //图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,500)  //调用防抖动函数，防止刷新过于频繁

    //对图片加载完成函数的回调函数进行保存
    this.itemImgListener = () => {
      refresh()
    }

    //监听item中图片加载完成
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}
