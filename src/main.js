// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Carousel from './Carousel'
// import { createRouter } from './router'
// import { createStore } from './store'
import store from './store'
import { sync } from 'vuex-router-sync'

import Sortable from 'sortablejs'

Vue.directive('sortable', {
  inserted: function (el, binding) {
    var sortable = new Sortable(el, binding.value || {});
  }
});
import 'cropperjs/dist/cropper.css';

// Vue.use(Sortable)
Vue.config.productionTip = false
// const store = createStore();
// const router = createRouter()
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
  // render: h => h(Carousel)
})
