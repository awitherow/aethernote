import Vue from 'vue'
import Aether from './Aether'

import store from './store'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Aether)
})
