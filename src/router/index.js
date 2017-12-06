import Vue from 'vue'
import Router from 'vue-router'
import Virtual from '@/views/Virtual'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Virtual,
      history: true

    },

    {
      path: '/virtual',
      name: 'VMC',
      component: Virtual,
      history: true,
      props: (route) => ({ query: route.query.q })
    }

  ],
  mode: 'history'
})
