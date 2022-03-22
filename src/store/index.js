import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCart(state,payload){
      //payload:新添加的商品
      let oldProduct=null;
      for (let item of state.cartList) {
          if(item.iid===payload.iid){
            oldProduct=item;
          }
      }
      //2.判断oldProduct
      if(oldProduct){
        oldProduct.count+=1
      }else {
        payload.count=1
        state.cartList.push(payload)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
