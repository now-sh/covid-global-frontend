// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

import 'bootswatch/dist/darkly/bootstrap.min.css';
import Vue from 'vue';
import router from './router';
import { store } from './store';
import { LinkPlugin } from 'bootstrap-vue';

import BootstrapVue from 'bootstrap-vue';
import IconsPlugin from 'bootstrap-vue';

import App from './App';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(LinkPlugin)

Vue.config.productionTip = false;

const app = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>',
  data: {

    },
  computed: {

  },

  })

app.use(middleware.notFound);
app.use(middleware.errorHandler);
