// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueRouter from 'vue-router'
import router from './router'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//缓存
import store from './vuex/store'
import Vuex from 'vuex'
 




Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(router)


router.beforeEach((to, from, next) => {
  // sessionStorage.setItem('user', JSON.stringify({"user":"baiyang"}));
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
