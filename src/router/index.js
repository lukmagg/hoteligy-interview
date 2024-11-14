import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/customers',
      name: 'customers',
      component: () => import('../views/Customers.vue'),
    },
    {
      path: '/customers/new',
      name: 'customersNew',
      component: () => import('../views/CustomersNew.vue'),
    },
    {
      path: '/customers/edit/:id',
      name: 'customersEdit',
      component: () => import('../views/CustomersEdit.vue'),
    },
  ],
})

export default router
