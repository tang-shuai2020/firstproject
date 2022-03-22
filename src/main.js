import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import myToast from "./components/common/toast";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
//安装toast插件
Vue.use(myToast)
//使用懒加载插件
Vue.use(VueLazyload, {
    loading: require('./assets/images/common/placeholder.png')
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
