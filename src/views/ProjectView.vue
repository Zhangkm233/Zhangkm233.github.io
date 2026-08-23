<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProject } from '../data/projects'
import BiliEmbed from '../components/BiliEmbed.vue'
import Lightbox from '../components/Lightbox.vue'

const route = useRoute()
const project = computed(() => getProject(route.params.id))
const lightbox = ref(null)

watch(
  () => project.value,
  (p) => {
    if (p) document.title = `${p.title} - 独立游戏制作人技术作品集`
  },
  { immediate: true }
)

const hasLinks = computed(() => {
  const l = project.value?.links
  return !!(l && ((l.github && l.github.trim()) || (l.download && l.download.trim())))
})
</script>

<template>
  <main class="project-detail">
    <!-- 未找到项目 -->
    <div v-if="!project" class="container not-found">
      <h1>作品不存在</h1>
      <router-link to="/#portfolio" class="btn-primary">返回游戏项目</router-link>
    </div>

    <template v-else>
      <div class="container">
        <router-link to="/#portfolio" class="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>返回游戏项目</span>
        </router-link>
      </div>

      <!-- 作品头部 -->
      <section class="project-header">
        <div class="container">
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <h1 class="project-title">{{ project.title }}</h1>
          <p class="project-subtitle">{{ project.subtitle }}</p>
        </div>
      </section>

      <!-- 封面媒体 -->
      <section class="project-hero">
        <div class="container">
          <BiliEmbed v-if="project.heroMedia.type === 'bilibili'" :bvid="project.heroMedia.bvid" :placeholder="project.heroMedia.placeholder" />
          <img
            v-else-if="project.heroMedia.type === 'image'"
            :src="project.heroMedia.src"
            :alt="project.title"
            class="hero-image"
          />
        </div>
      </section>

      <!-- 介绍 + 侧边栏 -->
      <section class="project-content">
        <div class="container content-wrapper">
          <div class="project-description" v-html="project.description"></div>

          <aside class="project-sidebar">
            <div class="info-card">
              <h3>项目信息</h3>
              <div class="info-item"><span class="info-label">类别</span><span class="info-value">{{ project.category }}</span></div>
              <div class="info-item"><span class="info-label">时间</span><span class="info-value">{{ project.date }}</span></div>
              <div class="info-item"><span class="info-label">角色</span><span class="info-value">{{ project.role }}</span></div>
              <div class="info-item"><span class="info-label">工具</span><span class="info-value">{{ project.tools }}</span></div>
            </div>

            <div v-if="hasLinks" class="info-card">
              <h3>项目链接</h3>
              <div class="link-buttons">
                <a v-if="project.links.github" :href="project.links.github" target="_blank" rel="noopener noreferrer" class="link-btn github">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a v-if="project.links.download" :href="project.links.download" target="_blank" rel="noopener noreferrer" class="link-btn download">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>下载</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <!-- 图片画廊 -->
      <section v-if="project.gallery?.length" class="project-gallery">
        <div class="container">
          <h2 class="gallery-title">项目展示</h2>
          <div class="gallery-grid">
            <div
              v-for="(item, i) in project.gallery"
              :key="item.src + i"
              class="gallery-item"
              :class="{ 'full-width': item.fullWidth }"
              @click="lightbox = item"
            >
              <img :src="item.src" :alt="item.alt" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- 项目亮点 -->
      <section v-if="project.highlights?.length" class="project-highlights">
        <div class="container">
          <div class="highlights-grid">
            <div v-for="h in project.highlights" :key="h.title" class="highlight-card">
              <div class="highlight-icon">{{ h.icon }}</div>
              <h3>{{ h.title }}</h3>
              <p>{{ h.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </template>

    <Lightbox
      v-if="lightbox"
      :src="lightbox.src"
      :alt="lightbox.alt"
      @close="lightbox = null"
    />
  </main>
</template>

<style scoped>
.project-detail {
  padding-top: calc(var(--nav-height) + 2rem);
}

.not-found {
  text-align: center;
  padding: 6rem 0;
}

.not-found h1 {
  margin-bottom: 1.5rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  transition: var(--transition);
}

.back-button:hover {
  color: var(--text-primary);
}

/* 头部 */
.project-header {
  padding: 2rem 0;
  text-align: center;
}

.project-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.project-title {
  font-size: clamp(2rem, 5vw, 3rem);
  background: linear-gradient(135deg, #818cf8, #f472b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.project-subtitle {
  max-width: 760px;
  margin: 1rem auto 0;
  color: var(--text-secondary);
}

/* 封面 */
.project-hero {
  padding: 1.5rem 0;
}

.hero-image {
  width: 100%;
  border-radius: var(--radius-lg);
}

/* 内容布局 */
.project-content {
  padding: 2rem 0;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 3rem;
  align-items: start;
}

.project-description :deep(h2) {
  font-size: 1.4rem;
  margin: 2rem 0 0.75rem;
  padding-left: 0.75rem;
  border-left: 4px solid var(--primary);
}

.project-description :deep(p) {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.info-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.info-card h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.9rem;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  color: var(--text-secondary);
  flex-shrink: 0;
}

.info-value {
  text-align: right;
}

.link-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: var(--transition);
}

.link-btn.github {
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.35);
}

.link-btn.download {
  background: rgba(236, 72, 153, 0.12);
  color: #f9a8d4;
  border: 1px solid rgba(236, 72, 153, 0.35);
}

.link-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.2);
}

/* 画廊 */
.project-gallery {
  padding: 2rem 0;
}

.gallery-title {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.gallery-item {
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: zoom-in;
  border: 1px solid var(--border-color);
}

.gallery-item.full-width {
  grid-column: 1 / -1;
}

.gallery-item img {
  width: 100%;
  transition: transform 0.4s ease;
}

.gallery-item:hover img {
  transform: scale(1.03);
}

/* 亮点 */
.project-highlights {
  padding: 2rem 0 4rem;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.highlight-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  transition: var(--transition);
}

.highlight-card:hover {
  transform: translateY(-4px);
  border-color: rgba(99, 102, 241, 0.5);
}

.highlight-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.highlight-card h3 {
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
}

.highlight-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 900px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>