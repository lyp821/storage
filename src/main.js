// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import { Cell, CellGroup, Popup } from 'vant';

Vue.prototype.$axios = axios

Vue.use(VueCookies)

Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Popup)




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

})
