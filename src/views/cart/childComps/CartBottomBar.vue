<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calculateClick">
      结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        /*if (this.cartList.length === 0)
          return false
        else
            return !(this.cartList.filter(item => !item.checked).length)*/

        if (this.cartList.length === 0)
          return false
        else
          return !this.cartList.find(item => !item.checked)
      }
    },
    methods:{
      checkClick(){
        if (this.isSelectAll){  //全部选中
          this.cartList.forEach(item => item.checked = false)
        }else{  //部分或者全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calculateClick(){
        console.log(this.totalPrice)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eeeeee;
  }

  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .total-price{
    margin-left: 25px;
    flex: 1;
  }

  .calculate{
    width: 80px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
