<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">基于高相似度群体的购物推荐系统</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick = "tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners = "banners" @swiperImageLoad = "swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick = "tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from  'components/common/scroll/Scroll'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from  './childComps/FeatureView'

  import {getHomeMultidata,getHomeGoods} from "network/home"
  import {itemListenerMixin,backTopMixin} from "common/mixin";

  export default {
    name: "Home",
    components:{
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    destroyed(){
      console.log('home destoryed');
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //1.用户离开主页后，保存首页滑动的Y值
      this.saveY = this.$refs.scroll.getScrollY();

      //2.取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    mounted(){
      //图片加载完成的事件监听操作被提取到mixin.js文件中去了
    },
    methods:{
      /**
       * 事件监听相关的方法
       * */
      tabClick(index){
        switch (index) {
          case 0:
              this.currentType = 'pop'
              break
          case 1:
              this.currentType = 'new'
              break
          case 2:
              this.currentType = 'sell'
              break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position){
        //1.判断backTop是否显示
        this.showBackTop = (-position.y) > 1000

        //2.决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求相关的方法
       * */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)  //也是一种解构，新加载的数据继续push
          this.goods[type].page += 1; //请求数据之后需要在原来页码的基础上加一

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>  /*scoped表示下面的样式只是会该组件起作用*/
  #home{
    height: 100vh;  /*vh - viewpor height 视口的高度*/
    position: relative;
  }
  .home-nav{
    background-color: #1296DB;
    color: white;

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /*position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 10;*/
  }

  .tab-control{
    position: relative;
    z-index: 5;
  }

  /*.content{
    height: calc(100% - 93px);  !*css3中的一个计算属性*!
    overflow: hidden;
    margin-top: 44px;
  }*/

  .content{
    /*height: 300px;*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
