import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
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
      Origins: "*",
      component: Virtual,
      history: true,
      props: (route) => ({ query: route.query.q })
    }

  ],

 mode: 'history'

})
