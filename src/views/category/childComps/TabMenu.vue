<template>
  <div class="tab-menu">
    <div class="menu-list-item" :class="{active: index===currentIndex}" v-for="(item, index) in categories" :key="index" @click="itemClick(index)">
      {{item.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabMenu",
    props:{
      categories:Array
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
        this.$emit('selectItem',index);
      }
    }
  }
</script>

<style scoped>
  .tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: #1296DB;
    background-color: #fff;
    border-left: 3px solid #1296DB;
  }
</style>
