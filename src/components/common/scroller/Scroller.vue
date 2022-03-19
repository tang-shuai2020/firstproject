<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "scroller",
  data() {
    return {
      scroller: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  },
  //接收父组件来的值
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    //1.创建scroller对象
    this.scroller = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType:this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //2.监听滚动位置
    this.scroller.on('scroll', (postion) => {
      //自定义事件传出值
      this.$emit('scroll', postion)
    })
    //3.监听上拉事件
     this.scroller.on('pullingUp',()=>{
       this.$emit('pullingUp')
     })

  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroller.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroller.finishPullUp();
    }
  }
}
</script>

<style scoped>

</style>
