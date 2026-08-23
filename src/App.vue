<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import BackToTop from './components/BackToTop.vue'

const route = useRoute()
const showBackToTop = ref(false)

function onScroll() {
  showBackToTop.value = window.scrollY > 300
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <NavBar :key="route.fullPath" />
  <router-view />
  <FooterBar />
  <BackToTop :visible="showBackToTop" />
</template>