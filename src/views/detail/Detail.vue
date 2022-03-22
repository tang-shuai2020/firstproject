<template>
  <div id="detail">
    <detail-nar-bar class="detail-nar" @titleClick="titleClick" ref="nav"></detail-nar-bar>
    <div>{{$store.state.cartList.length}}</div>
    <scroller class="content"
              ref="scroll"
              @scroll="contentScroll"
              :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info :images-info="detailInfo" @imgLoad="imgLoad"></detail-images-info>
      <detail-param-info :param-info="paramsInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroller>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBakTop"></back-top>
  </div>
</template>

<script>
import DetailNarBar from "./DetailNarBar";
import {getDetail, Goods, Shop, GoodsParams, getRecommend} from "../../network/detail";
import DetailSwiper from "./DetailSwiper";
import DetailBaseInfo from "./DetailBaseInfo";
import DetailShopInfo from "./DetailShopInfo";
import DetailImagesInfo from "./DetailImagesInfo";
import DetailParamInfo from "./DetailParamInfo";
import DetailCommentInfo from "./DetailCommentInfo";
import DetailBottomBar from "./DetailBottomBar";
import BackTop from "../../components/content/backtop/BackTop";

import Scroller from "../../components/common/scroller/Scroller";
import GoodsList from "../../components/content/goods/GoodsList";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommend: [],
      themeTops: [],
      currentIndex: 0,
      isShowBakTop: false,
    }
  },
  components: {
    DetailBottomBar,
    GoodsList,
    DetailCommentInfo,
    DetailParamInfo,
    DetailImagesInfo,
    DetailShopInfo,
    DetailBaseInfo,
    DetailSwiper,
    DetailNarBar,
    Scroller,
    BackTop
  },
  methods: {
    //图片加载完成
    imgLoad() {
      this.$refs.scroll.scroller.refresh();
      //最新的数据，dom渲染完成（图片还没有完成）
      //offsettop的值不对，大部分是因为图片
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.params.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      //console.log(this.themeTops)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 500)
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTops.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i
            && (i < length - 1 && positionY >= this.themeTops[i] && positionY < this.themeTops[i + 1])
            || (i === length - 1 && positionY >= this.themeTops[i])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //回到顶部
      this.isShowBakTop = (-position.y) > 1000
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    addCart() {
      //1.获取购物车需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //2.将商品添加到购物车vuex
      this.$store.commit('addCart',product)
    }
  },
  created() {
    //1.保存iid
    this.iid = this.$route.params.iid;
    //2.请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //2.1.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //2.2.创建店铺信息
      this.shop = new Shop(data.shopInfo)
      //2.3.保存商品详情数据
      this.detailInfo = data.detailInfo;
      //2.4.获取参数信息
      this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});
      //2.5.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    })
    //3.请求推荐数据
    getRecommend().then(res => {
      //console.log(res)
      this.recommend = res.data.list;
    })
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px);
}

.detail-nar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>