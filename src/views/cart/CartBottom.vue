<template>
  <div class="cart-bottom-bar">
    <div class="cart-bottom-check">
      <check-button class="checked"
                    :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="cart-bottom-price">
      合计：
      <span>¥ {{ totalPrice }}</span>
      元
    </div>
    <div class="cart-bottom-btn" @click="calClick">
      <button>提交订单({{ checkLenth }})</button>
    </div>
  </div>
</template>

<script>
import CheckButton from "../../components/content/checkButton/CheckButton";

export default {
  name: "CartBottom",
  components: {CheckButton},
  computed: {
    totalPrice() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLenth() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    //全选按钮逻辑
    isSelectAll() {
      /* return !(this.$store.state.cartList.filter(item=>{
         return !item.checked
       }).length)*/
      if (this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => {
        return !item.checked
      })
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => {
          item.checked = false
        })
      } else {
        this.$store.state.cartList.forEach(item => {
          item.checked = true
        })
      }
    },
    calClick(){
      if(!this.isSelectAll){
        this.$mytoast.toastShow('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  font-size: 15px;
  position: fixed;
  right: 0;
  bottom: 49px;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-top: 1px solid #cccccc;
  background-color: #fff;
}

.cart-bottom-check {
  display: flex;
}

.cart-bottom-check .checked {
  height: 20px;
  width: 20px;
}

.cart-bottom-check span {
  font-size: 14px;
  margin-top: 2px;
  margin-left: 3px;
}

.cart-bottom-price {
  margin-left: 50px;
}

.cart-bottom-price span {
  color: red;
}

.cart-bottom-btn button {
  line-height: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
  display: block;
  height: 50px;
  padding: 0 15px;
  color: white;
  border: 0;
  outline: none;
  background: linear-gradient(to right, #ff6034, #ee0a24);
}

.cart-bottom-btn button:active {
  opacity: 0.8;
}
</style>