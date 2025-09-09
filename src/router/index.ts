import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TestUseQueryView from '@/views/TestUseQueryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/test-use-query',
      name: 'testUseQuery',
      component: TestUseQueryView,
    },
  ],
})

export default router