<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'

defineProps({
  scrolled: { type: Boolean, default: false }
})

const route = useRoute()
const router = useRouter()
const { isDark, toggleTheme } = useTheme()

const menuOpen = ref(false)
const activeSection = ref('home')

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'portfolio', label: '游戏项目' },
  { id: 'about', label: '关于' },
  { id: 'experience', label: '实习经历' },
  { id: 'contact', label: '联系' }
]

const isHome = computed(() => route.name === 'home')

/** 滚动时高亮当前区块（仅在首页有意义） */
function onScroll() {
  if (!isHome.value) return

  const sections = document.querySelectorAll('section[id]')
  let current = ''
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id
  })
  if (current) activeSection.value = current
}

/**
 * 导航点击：统一走 router，避免 <a href="#x"> 在 hash 路由下
 * 把 URL 变成 #about 导致路由丢失。
 */
function goTo(id) {
  menuOpen.value = false

  if (isHome.value) {
    // 已在首页：直接平滑滚动，并用 replaceState 同步 hash 但不触发跳转
    const el = document.getElementById(id)
    if (el) {
      const top = el.offsetTop - 80
      window.scrollTo({ top, behavior: 'smooth' })
      history.replaceState(null, '', `#${id}`)
      activeSection.value = id
    }
  } else {
    // 在详情页：回到首页对应区块
    router.push({ name: 'home', hash: `#${id}` })
  }
}

/** 关闭移动端菜单 */
function closeMenu() {
  menuOpen.value = false
}

/** Esc 关闭菜单 */
function onKeydown(e) {
  if (e.key === 'Escape') menuOpen.value = false
}

// 路由切换后收起菜单并重置高亮
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
    if (isHome.value) activeSection.value = 'home'
  }
)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="navbar" :class="{ 'is-scrolled': scrolled, 'is-open': menuOpen }">
    <div class="nav-container container">
      <router-link to="/" class="logo" aria-label="3KkM 首页" @click="closeMenu">
        <span class="logo-mark" aria-hidden="true">3KkM</span>
      </router-link>

      <nav id="nav-menu" class="nav-menu" :class="{ 'is-open': menuOpen }" aria-label="主导航">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          class="nav-link"
          :class="{ 'is-active': isHome && activeSection === item.id }"
          :aria-current="isHome && activeSection === item.id ? 'page' : undefined"
          @click="goTo(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>

      <div class="nav-actions">
        <button
          type="button"
          class="icon-btn theme-toggle"
          :aria-label="isDark ? '切换到亮色主题' : '切换到暗色主题'"
          :title="isDark ? '切换到亮色主题' : '切换到暗色主题'"
          @click="toggleTheme"
        >
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>

        <button
          type="button"
          class="hamburger"
          :class="{ 'is-active': menuOpen }"
          :aria-expanded="menuOpen"
          aria-controls="nav-menu"
          aria-label="打开导航菜单"
          @click="menuOpen = !menuOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  inset: 0 0 auto 0;
  height: var(--nav-height);
  z-index: 100;
  background: color-mix(in srgb, var(--bg-base) 78%, transparent);
  backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid transparent;
  transition: border-color var(--dur-base) var(--ease-out),
    background-color var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out);
}

/* 不支持 color-mix 的浏览器回退 */
@supports not (background: color-mix(in srgb, red 50%, transparent)) {
  .navbar {
    background: var(--bg-base);
  }
}

.navbar.is-scrolled {
  border-bottom-color: var(--border-subtle);
  box-shadow: var(--shadow-md);
}

.nav-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-5);
}

.logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.02em;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--brand-400);
  flex-shrink: 0;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--sp-1);
  margin-left: auto;
}

.nav-link {
  position: relative;
  padding: 0.5rem 0.9rem;
  font-size: var(--fs-sm);
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease-out),
    background-color var(--dur-fast) var(--ease-out);
}

.nav-link:hover {
  color: var(--text-primary);
  background: rgba(99, 102, 241, 0.1);
}

.nav-link.is-active {
  color: var(--text-primary);
}

.nav-link.is-active::after {
  content: '';
  position: absolute;
  left: 0.9rem;
  right: 0.9rem;
  bottom: 0.2rem;
  height: 2px;
  border-radius: 2px;
  background: var(--gradient-brand);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  flex-shrink: 0;
}

.icon-btn {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  border: 1px solid transparent;
  transition: var(--transition);
}

.icon-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
  background: rgba(99, 102, 241, 0.08);
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  align-items: center;
  border-radius: var(--radius-sm);
}

.hamburger span {
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: var(--text-primary);
  transition: transform var(--dur-base) var(--ease-out),
    opacity var(--dur-fast) var(--ease-out);
}

.hamburger.is-active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}
.hamburger.is-active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 820px) {
  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    margin: 0;
    padding: var(--sp-2) var(--sp-4) var(--sp-4);
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border-subtle);
    box-shadow: var(--shadow-lg);
    transform: translateY(-120%);
    opacity: 0;
    pointer-events: none;
    transition: transform var(--dur-base) var(--ease-out),
      opacity var(--dur-base) var(--ease-out);
  }

  .nav-menu.is-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    padding: 0.9rem var(--sp-3);
    font-size: var(--fs-base);
    text-align: left;
    border-radius: var(--radius-sm);
  }

  .nav-link.is-active::after {
    left: var(--sp-3);
    right: auto;
    width: 20px;
    bottom: 0.55rem;
  }
}
</style>
