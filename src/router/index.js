import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      scrollBehavior(to) {
        if (to.hash) return { el: to.hash, top: 80 }
        return { top: 0 }
      }
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('../views/ProjectView.vue'),
      scrollBehavior() {
        return { top: 0 }
      }
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router