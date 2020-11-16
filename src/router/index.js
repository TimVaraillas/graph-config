import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/overview',
    name: 'Aperçu des types de graphes',
    component: () => import('../views/Overview.vue')
  },
  {
    path: '/config',
    name: 'Configurer un graphe',
    component: () => import('../views/Config.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
