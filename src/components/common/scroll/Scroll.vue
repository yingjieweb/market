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
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      //this.scroll = new BScroll(document.querySelector('.wrapper'),{})  /*这种方式不是很好，可能存在多个class类有重名wrapper*/
      this.scroll = new BScroll(this.$refs.wrapper,{  //通过ref这种凡是比较好

      })
    }
  }
</script>

<style scoped>

</style>
