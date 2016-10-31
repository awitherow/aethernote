import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: require('./components/views/Notelist')
    },
    {
      name: 'login',
      path: '/login',
      component: require('./components/views/Login')
    },
    {
      name: 'profile',
      path: '/profile',
      component: require('./components/views/Profile')
    },
    {
      name: 'note',
      path: '/note/:id',
      component: require('./components/views/Note')
    }
  ]
})

export default router
