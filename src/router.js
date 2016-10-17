import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: require('./components/views/Notelist') },
    { path: '/profile', component: require('./components/views/Profile') }
  ]
})

export default router
