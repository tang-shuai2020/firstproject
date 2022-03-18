<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommond-view :recommends="recommends"></recommond-view>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommondView from "./childComps/RecommondView";
import {getHomeMultidata} from "../../network/home";
export default {
  name: "Home",
  data() {
    return {
      banners:[],
      recommends:[]
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommondView
  },
  created() {
    //1.请求多个数据(异步操作)
    getHomeMultidata().then(res => {
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
      console.log(this.banners)
    })
  }
}
</script>

<style scoped>
.home-nav {
  background-color:darkorange;
  color: white;
}
</style>
