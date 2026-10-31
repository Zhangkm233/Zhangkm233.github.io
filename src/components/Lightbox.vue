<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' }
})

const emit = defineEmits(['close'])

const closeBtn = ref(null)
let previousActive = null

function onKey(e) {
  if (e.key === 'Escape') {
    emit('close')
    return
  }
  // 焦点陷阱：Tab 始终停留在关闭按钮上
  if (e.key === 'Tab') {
    e.preventDefault()
    closeBtn.value?.focus()
  }
}

// 打开时锁定滚动 + 记住焦点
onMounted(async () => {
  previousActive = document.activeElement
  document.body.style.overflow = 'hidden'
  document.addEventListener('keydown', onKey)
  await nextTick()
  closeBtn.value?.focus()
})

// 关闭时恢复滚动与焦点
onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKey)
  if (previousActive instanceof HTMLElement) previousActive.focus()
})

// src 变化时重新聚焦
watch(
  () => props.src,
  () => closeBtn.value?.focus()
)
</script>

<template>
  <Teleport to="body">
    <div
      class="lightbox-mask"
      role="dialog"
      aria-modal="true"
      :aria-label="alt || '图片预览'"
      @click="emit('close')"
    >
      <figure class="lightbox-figure" @click.stop>
        <img :src="props.src" :alt="props.alt" />
        <figcaption v-if="alt">{{ alt }}</figcaption>
      </figure>

      <button
        ref="closeBtn"
        type="button"
        class="lightbox-close"
        aria-label="关闭预览"
        @click="emit('close')"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.lightbox-mask {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--overlay);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vw, 3rem);
  cursor: zoom-out;
  animation: fade-in var(--dur-fast) var(--ease-out);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.lightbox-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-3);
  cursor: default;
  max-width: min(1200px, 94vw);
}

.lightbox-figure img {
  max-width: 100%;
  max-height: 82vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  background: var(--bg-inset);
}

.lightbox-figure figcaption {
  font-size: var(--fs-sm);
  color: var(--text-secondary);
  text-align: center;
}

.lightbox-close {
  position: absolute;
  top: clamp(1rem, 3vw, 2rem);
  right: clamp(1rem, 3vw, 2rem);
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--text-primary);
  background: rgba(148, 163, 184, 0.16);
  border: 1px solid var(--border-strong);
  transition: var(--transition);
}

.lightbox-close:hover {
  background: rgba(148, 163, 184, 0.3);
  transform: rotate(90deg);
}
</style>
