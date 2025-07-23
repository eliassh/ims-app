import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'IMS | Home' }

  },
  {
    path: '/about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'IMS | About' }

  },
  {
    path: '/inventory',
    component: () => import('../views/inventory/InventoryShellView.vue'),
    meta: { title: 'IMS | Inventory' },
    children: [
      {
        path: '',
        name: 'inventory',
        component: () => import('../views/inventory/InventoryListingView.vue'),
        meta: { title: 'IMS | Inventory Listing' }
      },
      {
        path: ':id',
        name: 'inventory-details',
        component: () => import('../views/inventory/InventoryDetailsView.vue'),
        meta: { title: 'IMS | Inventory Item Details' }
      },
      {
        path: 'add',
        name: 'inventory-add',
        component: () => import('../views/inventory/InventoryAddView.vue'),
        meta: { title: 'IMS | Add Inventory Item' }
      },
      {
        path: 'edit/:id',
        name: 'inventory-edit',
        component: () => import('../views/inventory/InventoryEditView.vue'),
        meta: { title: 'IMS | Edit Inventory Item' }
      },
    ],


  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const defaultTitle = 'IMS'
  document.title = (to.meta.title as string) ?? defaultTitle
  next()
})

export default router
