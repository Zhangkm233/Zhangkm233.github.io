<script setup>
defineProps({ visible: Boolean })

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <button v-show="visible" class="back-to-top" aria-label="返回顶部" @click="toTop">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </button>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #fff;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
  transition: var(--transition);
  z-index: 90;
}

.back-to-top:hover {
  transform: translateY(-4px);
}
</style>