import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import States from '@/components/States';
import Countries from '@/components/Countries';
import Historical from '@/components/Historical';

const NotFound = { template: '<p>Page not found</p>' };

const middleWare = require('@/router/middleware');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      force: true,
      props: true,
    },
    {
      path: '/States',
      name: 'States',
      component: States,
      force: true,
      props: true,
    },
    {
      path: '/Countries',
      name: 'Countries',
      component: Countries,
      force: true,
      props: true,
    },
    {
      path: '/Historical',
      name: 'Historical',
      component: Historical,
      force: true,
      props: true,
    },
    {
      path: 'https://wherescovid.casjay.now.sh/',
      name: 'WheresCovid',
      force: true,
    },
  ],
  NotFound,
  middleWare,

});

export default router