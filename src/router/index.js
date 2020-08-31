import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Tables',
    component: () => import('../views/Tables')
  },
  {
    path: '/table/:id',
    name: 'Table',
    component: () => import('../views/Table.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
