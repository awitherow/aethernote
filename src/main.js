import Vue from 'vue'
import Aether from './Aether'
import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Aether)
})
