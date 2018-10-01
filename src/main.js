import Vue from 'vue'
//主页
import App from './App'
//引入 vue -router
import router from './router/index'
//引入 vuex
import store from './store/index'
//引入 element ui框架
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element,{size:'small'})
//引入vant 手机框架
import vant from 'vant'
import 'vant/lib/vant-css/index.css'
Vue.use(vant)
//引入新设计的 store仓库//
import {set_main_obj} from './Utils/store'

Vue.config.productionTip = false

var vx=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

//存储主流程的 vue
set_main_obj(vx)