import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Exemplo de outra página:
  // {
  //   path: '/sobre',
  //   name: 'Sobre',
  //   component: () => import('../pages/Sobre.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router