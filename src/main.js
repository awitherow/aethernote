import Vue from 'vue'
import Aether from './Aether'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: new VueRouter({
    routes: [
      { path: '/', component: require('./components/views/Notelist') },
      { path: '/profile', component: require('./components/views/Profile') }
    ]
  }),
  render: h => h(Aether)
})
