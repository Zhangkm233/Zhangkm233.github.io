import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/font.css'
import './assets/styles/main.css'

const app = createApp(App)

/**
 * v-reveal 自定义指令：元素进入视口时添加 visible 类触发动画
 */
app.directive('reveal', {
  mounted(el) {
    el.classList.add('reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(el)
  }
})

app.use(router)
app.mount('#app')