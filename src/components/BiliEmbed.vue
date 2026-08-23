<script setup>
defineProps({
  bvid: { type: String, required: true },
  placeholder: { type: String, default: '' }
})
</script>

<template>
  <div class="bili-embed" :style="{ background: placeholder }">
    <iframe
      :src="`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&autoplay=0`"
      scrolling="no"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    ></iframe>
  </div>
</template>

<style scoped>
.bili-embed {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.bili-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>