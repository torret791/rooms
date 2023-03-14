import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/components/shared/RouteView'),
    redirect: {name: 'RoomsList'},
    name: 'Home'
  },
  {
    path: '/RoomsList',
    component: () => import('@/views/RoomsList'),
    name: 'RoomsList'
  },
  {
    path: '*',
    redirect: {name: 'RoomsList'}
  }
]

const router = new VueRouter({
  routes
})

export default router