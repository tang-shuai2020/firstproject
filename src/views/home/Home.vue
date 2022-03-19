<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control"
                 @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroller class="home-scroller"
              ref="scroll" :probe-type="3"
              @scroll="contentClick"
              :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @imageLoad="imageLoad"></home-swiper>
      <recommond-view :recommends="recommends"></recommond-view>
      <feature></feature>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroller>
    <back-top @click.native="backClick" v-show="isShowBakTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommondView from "./childComps/RecommondView";
import Feature from "./childComps/Feature";

import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroller from "../../components/common/scroller/Scroller";
import BackTop from "../../components/content/backtop/BackTop";

import {getHomeMultidata, getHomeGoods} from "../../network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType:'pop',
      isShowBakTop:false,
      tabOffsetTop:0,
      isTabFixed:false
    }
  },
  components: {
    HomeSwiper,
    RecommondView,
    Feature,
    NavBar,
    TabControl,
    GoodsList,
    Scroller,
    BackTop
  },
  created() {
    //1.请求多个数据(异步操作)
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {

  },
  methods: {
    /*点击事件相关方法*/
    //防抖函数
    /*debounce(func,delay){
      let timer =null
      return function (...args){
        if(timer) clearTimeout(timer)
        timer =setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    },*/
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.carIndex=index;
      this.$refs.tabControl2.carIndex=index;
    },
    backClick(){
       this.$refs.scroll.scrollTo(0,0,500)
    },
    contentClick(position){
      //1.判断backtop是否显示
      this.isShowBakTop = (-position.y)>1000
      //2.选项栏是否吸顶
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType);
      //解决滑不动的bug
      this.$refs.scroll.scroller.refresh();
    },
    imageLoad(){
      //1.获取tabControl的offsettop   所有组件都有一个属性$el，用于获取组件里的元素
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
    },
    /*网络请求相关方法*/
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();//刷新多次数据
        console.log(res.data.list)
      })
    }
  }
}
</script>

<style scoped>
#home {
  margin-top: 44px;
}

.home-nav {
  background-color: pink;
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
/*.tab-control {
  position: sticky;
  top: 43px;
}*/
.home-scroller{
  /*height:300px;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
