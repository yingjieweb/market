<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from 'components/content/goods/GoodsListItem'

  export default {
    name: "GoodList",
    components:{
      GoodsListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;  /*每一行显示指定合适数量的小组件*/
    justify-content:space-around;  /*组件之间的空间均等分*/
  }


</style>
