<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import BackToTop from './components/BackToTop.vue'

const showBackToTop = ref(false)
const scrolled = ref(false)

function onScroll() {
  showBackToTop.value = window.scrollY > 400
  scrolled.value = window.scrollY > 8
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <a href="#main" class="skip-link">跳到主要内容</a>

  <NavBar :scrolled="scrolled" />

  <main id="main" class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <FooterBar />
  <BackToTop :visible="showBackToTop" />
</template>

<style scoped>
.app-main {
  min-height: 60vh;
}

/* 页面切换过渡：淡入 + 轻微上移 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.24s var(--ease-out), transform 0.24s var(--ease-out);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>
