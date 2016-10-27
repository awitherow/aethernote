import Vue from 'vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

import Aether from './Aether'

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Aether)
})
