import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      //1.payload是新添加的商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2.判断oldProduct是否有值
      if (oldProduct){
        context.commit(ADD_COUNTER,oldProduct);
        resolve('当前商品数量加1')
      }else{
        payload.count = 1;
        context.commit(ADD_TO_CART,payload);
        resolve('添加当前商品数量')
      }
    })
  }
}
