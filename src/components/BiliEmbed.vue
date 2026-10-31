<script setup>
import { ref } from 'vue'

defineProps({
  bvid: { type: String, required: true },
  title: { type: String, default: '游戏演示视频' }
})

const loaded = ref(false)

function load() {
  loaded.value = true
}
</script>

<template>
  <div class="bili-embed">
    <iframe
      v-if="loaded"
      :src="`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&autoplay=0&danmaku=0`"
      :title="title"
      scrolling="no"
      frameborder="0"
      framespacing="0"
      allowfullscreen="true"
      loading="lazy"
    ></iframe>

    <!-- 点击后才加载 iframe，避免首屏加载第三方播放器拖慢页面 -->
    <button
      v-else
      type="button"
      class="bili-placeholder"
      :aria-label="`播放 ${title}`"
      @click="load"
    >
      <span class="play-icon" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span class="play-text">播放演示视频</span>
      <span class="play-note">来自 Bilibili</span>
    </button>
  </div>
</template>

<style scoped>
.bili-embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--bg-inset);
}

.bili-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.bili-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  color: var(--text-secondary);
  background: radial-gradient(circle at 50% 45%, rgba(99, 102, 241, 0.18), transparent 60%),
    var(--bg-inset);
  transition: background-color var(--dur-base) var(--ease-out);
}

.bili-placeholder:hover {
  color: var(--text-primary);
}

.play-icon {
  width: 64px;
  height: 64px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  background: var(--gradient-cta);
  box-shadow: var(--shadow-brand);
  transition: transform var(--dur-base) var(--ease-out);
  padding-left: 3px;
}

.bili-placeholder:hover .play-icon {
  transform: scale(1.08);
}

.play-text {
  font-size: var(--fs-md);
  font-family: var(--font-display);
}

.play-note {
  font-size: var(--fs-xs);
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}
</style>
