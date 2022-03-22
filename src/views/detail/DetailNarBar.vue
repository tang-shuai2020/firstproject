<template>
  <div>
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="../../assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="item.index"
             class="title-item"
             :class="{active:currentIndex===index}" @click="indexClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
export default {
  name: "DetailNarBar",
  data(){
    return{
      titles: ['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    indexClick(index){
      this.currentIndex=index;
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back();
    }
  },
  components:{
    NavBar
  }
}
</script>

<style scoped>
.title{
  display: flex;
  font-size: 15px;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.left img{
  margin-top: 10px;
}
</style>