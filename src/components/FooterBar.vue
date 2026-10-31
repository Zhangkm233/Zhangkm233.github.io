<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="footer-logo">3KkM</span>
        <p class="footer-tagline">独立游戏制作人 · 后端架构与 Unity 开发</p>
      </div>

      <nav class="footer-links" aria-label="页脚导航">
        <a href="https://github.com/Zhangkm233" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://space.bilibili.com/28464160" target="_blank" rel="noopener noreferrer">Bilibili</a>
        <a href="mailto:zhangkm233@163.com">邮箱</a>
      </nav>

      <p class="footer-copy">&copy; {{ year }} 3KkM · 由 Vite + Vue 3 构建</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border-subtle);
  padding-block: var(--sp-6);
  margin-top: var(--sp-8);
  background: var(--bg-base);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-4);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 1.25rem;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--brand-400);
}

.footer-tagline {
  font-size: var(--fs-xs);
  color: var(--text-tertiary);
}

.footer-links {
  display: flex;
  gap: var(--sp-4);
  font-size: var(--fs-sm);
}

.footer-links a {
  color: var(--text-secondary);
  transition: color var(--dur-fast) var(--ease-out);
}

.footer-links a:hover {
  color: var(--brand-400);
}

.footer-copy {
  font-size: var(--fs-xs);
  color: var(--text-tertiary);
  width: 100%;
  padding-top: var(--sp-4);
  border-top: 1px solid var(--border-subtle);
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
