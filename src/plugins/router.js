import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/timer'
    },
    {
      name: 'timer',
      path: '/timer',
      component: () => import('@/components/Timer')
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('@/components/Settings')
    },
    {
      name: 'about',
      path: '/about',
      component: () => import('@/components/About')
    }
  ]
})
