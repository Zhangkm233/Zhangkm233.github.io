import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/font.css'
import './assets/styles/main.css'
import { initTheme } from './composables/useTheme'

// 在挂载前同步主题，避免首屏闪烁
initTheme()

const app = createApp(App)

/**
 * v-reveal 自定义指令：元素进入视口时添加 is-visible 类触发动画
 *
 * 用法：
 *   v-reveal            —— 默认
 *   v-reveal="100"      —— 延迟 100ms
 *
 * 降级策略：
 *   1. 尊重 prefers-reduced-motion，直接显示；
 *   2. 不支持 IntersectionObserver 时直接显示；
 *   3. 兜底：若 1.5s 内观察器未触发（如自动化环境、观察器异常），
 *      强制显示，避免内容永久停留在 opacity: 0 而不可见。
 */
app.directive('reveal', {
  mounted(el, binding) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || !('IntersectionObserver' in window)) {
      el.classList.add('reveal', 'is-visible')
      return
    }

    el.classList.add('reveal')

    const delay = Number(binding.value) || 0
    if (delay) el.style.transitionDelay = `${delay}ms`

    const reveal = (target) => {
      target.classList.add('is-visible')
      target._revealObserver?.unobserve(target)
      clearTimeout(target._revealFallback)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    el._revealObserver = observer

    // 兜底：即使观察器不工作，内容也一定会显示
    el._revealFallback = setTimeout(() => reveal(el), 1500)
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
    clearTimeout(el._revealFallback)
    delete el._revealObserver
    delete el._revealFallback
  }
})

app.use(router)
app.mount('#app')
