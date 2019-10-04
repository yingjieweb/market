<template>
  <!--ref一般绑定给子组件，明确拿到给哪个子组件-->
  <div class="wrapper" ref="wrapper"> <!--wrapper内部必须要有一个包裹-->
    <div class="content">
      <slot></slot>   <!--可滚动区域必须有一个根-->
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      }
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      //1.创建BScroll对象
      //this.scroll = new BScroll(document.querySelector('.wrapper'),{})  /*这种方式不是很好，可能存在多个class类有重名wrapper*/
      this.scroll = new BScroll(this.$refs.wrapper,{  //通过ref这种凡是比较好
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })

      //2.监听滚动的位置
      this.scroll.on('scroll',(position) => {
        //console.log(position);
        this.$emit('scroll',position)
      })

      //3.监听上拉事件
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
