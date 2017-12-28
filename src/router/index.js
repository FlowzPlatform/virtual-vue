import Vue from 'vue'
import Router from 'vue-router'
import Virtual from '@/views/Virtual'
import ImageApi from '@/views/ImageApi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/image-api',
      name: 'Leafo API',
      component: ImageApi,
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
