<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper><!--属性：topImages    传入值：top-images-->
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="showBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from  './childComps/DetailBaseInfo'
  import DetailShopInfo from  './childComps/DetailShopInfo'
  import DetailGoodsInfo from  './childComps/DetailGoodsInfo'
  import DetailParamInfo from  './childComps/DetailParamInfo'
  import DetailCommentInfo from  './childComps/DetailCommentInfo'
  import DetailBottomBar from  './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {debounce} from "../../common/utils";

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //1.获取数据
        //console.log(res)
        const data = res.result

        //2.获取顶部图片的轮播数据
        this.topImages = data.itemInfo.topImages

        //3.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //4.创建店铺对象的信息
        this.shop = new Shop(data.shopInfo)

        //5.获取商品详情信息
        this.detailInfo = data.detailInfo

        //6.获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //7.获取商品品论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        //8.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
        this.getThemeTopY = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          //console.log(this.themeTopYs);
        },100)
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        //console.log(res)
        this.recommends = res.data.list
      })
    },
    mounted(){
      //图片加载完成的事件监听操作被提取到mixin.js文件中去了
    },
    destroyed(){
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        this.$refs.scroll.refresh();
        this.getThemeTopY();
      },
      titleClick(index){
        //console.log(index); //这里index能正确打印0，1，2，3。但是加上下面的代码点击标题就会出现标题标色不对应的问题
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,400);   //★★★这里有点问题，不加滚动就没事
      },
      contentScroll(position){
        //console.log(position)//打印此时页面滚动到的具体位置
        //1.获取滚动的y值
        const positionY = -position.y

        //1.判断backTop是否显示
        this.showBackTop = (-position.y) > 1000

        //2.用positionY和主题中值进行对比，随便拿一个商品距离
        //[0, 6280, 7083, 7299]
        //positionY 在 0 到 6280 之间，index=0
        //positionY 在 6280 到 7083 之间，index=1
        //positionY 在 7083 到 7299 之间，index=2
        //positionY 超过 7299 的时候，index=3
        if (positionY>0 && positionY<this.themeTopYs[1]-44){  //★★★这个方法不够优化
          this.$refs.nav.currentIndex = 0
        }else if(positionY>this.themeTopYs[1]-44 && positionY<this.themeTopYs[2]-44){
          this.$refs.nav.currentIndex = 1
        }else if(positionY>this.themeTopYs[2]-44 && positionY<this.themeTopYs[3]-44){
          this.$refs.nav.currentIndex = 2
        }else if(positionY>this.themeTopYs[3]-44){
          this.$refs.nav.currentIndex = 3
        }
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {};
        product.iid = this.iid;
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;

        //2.将商品加入到购物车里面
        //this.$store.cartList.push(product)    //vuex修改state的时候要通过mutations修改
        /*this.$store.dispatch('addCart',product).then(res => {  //actions中处理异步和判断
          console.log(res);
        })*/
        this.addCart(product).then(res => {
          //console.log(this.$toast.show);
          this.$toast.show(res,2000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height: calc(100% - 44px - 58px);
  }
</style>
