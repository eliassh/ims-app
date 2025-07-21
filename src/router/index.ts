import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/AddInventoryView.vue'),
  },
  {
    path: '/inventory/:id',
    name: 'inventory',
    component: () => import('../views/InventoryDetailsView.vue'),
    props: true,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/InventoryItemEditView.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
