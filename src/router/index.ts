import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Info from '../views/Info.vue'
import Extras from '../views/Extras.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/extras',
    name: 'Extras',
    component: Extras
  }
]

const router = new VueRouter({
  routes
})

export default router
