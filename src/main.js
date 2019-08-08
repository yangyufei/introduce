// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '../src/assets/css/base.css'
import ajax from './config/fetch.js'
import Meta from 'vue-meta';
import '@/assets/js/common.js' // 移动端适配common

Vue.use(Meta);

Vue.prototype.$ajax = ajax;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
	router,
	store,
  components: { App },
  template: '<App/>'
})
