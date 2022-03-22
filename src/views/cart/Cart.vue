<template>
  <div class="cart">
<!--导航    -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
<!--列表    -->
    <cart-list></cart-list>
<!--底部    -->
    <cart-bottom></cart-bottom>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./CartList";
import CartBottom from "./CartBottom";

import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components: {
    CartBottom,
    CartList,
    NavBar
  },
  computed:{
    //将getter转为计算属性
      ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
