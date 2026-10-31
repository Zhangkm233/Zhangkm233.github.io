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
        // 带 hash：滚到对应区块，留出固定导航高度
        if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
        return { top: 0 }
      }
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('../views/ProjectView.vue'),
      props: true,
      scrollBehavior() {
        return { top: 0 }
      }
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

/**
 * 路由后置钩子：更新页面标题
 * 详情页会在组件内覆盖为更具体的标题。
 */
router.afterEach((to) => {
  if (to.name === 'home') {
    document.title = '3KkM · 独立游戏制作人技术作品集'
  }
})

export default router
