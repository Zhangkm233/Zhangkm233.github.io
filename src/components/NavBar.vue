<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('home')

function onScroll() {
  scrolled.value = window.scrollY > 100
  const sections = document.querySelectorAll('section[id]')
  let current = ''
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id
  })
  if (current) activeSection.value = current
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <nav class="navbar" :class="{ scrolled }">
    <div class="nav-container container">
      <router-link to="/" class="logo">3KkM</router-link>
      <ul class="nav-menu" :class="{ active: menuOpen }">
        <li><a href="#home" class="nav-link" :class="{ active: activeSection === 'home' }" @click="closeMenu">首页</a></li>
        <li><a href="#portfolio" class="nav-link" :class="{ active: activeSection === 'portfolio' }" @click="closeMenu">游戏项目</a></li>
        <li><a href="#about" class="nav-link" :class="{ active: activeSection === 'about' }" @click="closeMenu">关于</a></li>
        <li><a href="#contact" class="nav-link" :class="{ active: activeSection === 'contact' }" @click="closeMenu">联系</a></li>
      </ul>
      <div class="hamburger" :class="{ active: menuOpen }" @click="menuOpen = !menuOpen">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 100;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: var(--transition);
}

.navbar.scrolled {
  border-bottom-color: var(--border-color);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.nav-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #818cf8, #f472b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  transition: var(--transition);
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: var(--text-primary);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(135deg, #818cf8, #f472b6);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.hamburger span {
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: var(--transition);
}

@media (max-width: 768px) {
  .hamburger { display: flex; }

  .nav-menu {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(12px);
    padding: 1rem 0;
    transform: translateY(-120%);
    transition: transform 0.3s ease;
    border-bottom: 1px solid var(--border-color);
  }

  .nav-menu.active { transform: translateY(0); }

  .nav-link {
    display: block;
    padding: 0.9rem 2rem;
  }
}
</style>