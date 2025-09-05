import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/Home.vue'
import States from '@/components/States.vue'
import Countries from '@/components/Countries.vue'
import Historical from '@/components/Historical.vue'

const NotFound = { template: '<p>Page not found</p>' }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/states',
    name: 'States',
    component: States,
    props: true,
  },
  {
    path: '/countries',
    name: 'Countries',
    component: Countries,
    props: true,
  },
  {
    path: '/historical',
    name: 'Historical',
    component: Historical,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
