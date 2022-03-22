<template>
<div class="cart-list">
  <scroller class="content">
   <cart-item v-for="(item,index) in cartList" :item="item" :key="index"></cart-item>
  </scroller>
</div>
</template>

<script>
import Scroller from "../../components/common/scroller/Scroller";
import CartItem from "./CartItem";
import {mapGetters} from 'vuex'
export default {
  name: "CartList",
  components: {
    CartItem,
    Scroller
  },
  computed:{
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
.content{
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 44px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}
</style>