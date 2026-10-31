<script setup>
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProject, getAdjacentProjects } from '../data/projects'
import BiliEmbed from '../components/BiliEmbed.vue'
import Lightbox from '../components/Lightbox.vue'

const route = useRoute()

const project = computed(() => getProject(route.params.id))
const adjacent = computed(() => getAdjacentProjects(route.params.id))

const lightbox = ref(null)
const activeHeading = ref('')
const headings = ref([])
let headingObserver = null

/** 是否至少有一个外链按钮 */
const hasLinks = computed(() => {
  const l = project.value?.links
  if (!l) return false
  return Boolean(l.steam?.trim() || l.github?.trim() || l.download?.trim() || l.video?.trim())
})

/** 解析 description 中的 h2，生成目录 */
function buildToc() {
  headings.value = []
  const el = document.getElementById('project-description')
  if (!el) return

  const h2s = Array.from(el.querySelectorAll('h2'))
  headings.value = h2s.map((h, i) => {
    const id = `section-${i}`
    h.id = id
    return { id, text: h.textContent }
  })

  // 观察标题进入视口，高亮当前目录项
  headingObserver?.disconnect()
  headingObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) activeHeading.value = visible[0].target.id
    },
    { rootMargin: '-96px 0px -65% 0px', threshold: 0 }
  )
  h2s.forEach((h) => headingObserver.observe(h))
}

/** 平滑滚动到指定标题 */
function scrollToHeading(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({ top, behavior: 'smooth' })
  history.replaceState(null, '', `#${id}`)
}

// 标题与目录
watch(
  () => project.value,
  async (p) => {
    if (p) {
      document.title = `${p.title} · 3KkM 作品集`
      await nextTick()
      buildToc()
    } else {
      document.title = '作品不存在 · 3KkM 作品集'
    }
  },
  { immediate: true }
)

onMounted(async () => {
  await nextTick()
  buildToc()
})

onUnmounted(() => {
  headingObserver?.disconnect()
  document.title = '3KkM · 独立游戏制作人技术作品集'
})
</script>

<template>
  <div class="project-detail">
    <!-- ============ 未找到 ============ -->
    <div v-if="!project" class="not-found container">
      <h1>作品不存在</h1>
      <p>该链接可能已失效，或项目已被移除。</p>
      <router-link to="/#portfolio" class="btn btn--primary">返回游戏项目</router-link>
    </div>

    <template v-else>
      <!-- ============ 面包屑 ============ -->
      <div class="container">
        <nav class="breadcrumb" aria-label="面包屑导航">
          <router-link to="/">首页</router-link>
          <span aria-hidden="true">/</span>
          <router-link to="/#portfolio">游戏项目</router-link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ project.title }}</span>
        </nav>
      </div>

      <!-- ============ 头部 ============ -->
      <header class="project-header">
        <div class="container">
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <h1 class="project-title">{{ project.title }}</h1>
          <p class="project-subtitle">{{ project.subtitle }}</p>

          <dl class="project-meta">
            <div class="meta-item">
              <dt>类别</dt>
              <dd>{{ project.category }}</dd>
            </div>
            <div class="meta-item">
              <dt>时间</dt>
              <dd>{{ project.date }}</dd>
            </div>
            <div class="meta-item">
              <dt>角色</dt>
              <dd>{{ project.role }}</dd>
            </div>
            <div class="meta-item">
              <dt>工具</dt>
              <dd>{{ project.tools }}</dd>
            </div>
          </dl>

          <div v-if="hasLinks" class="project-links">
            <a
              v-if="project.links.steam"
              :href="project.links.steam"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn--steam"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.98 2C6.5 2 2.02 6.2 1.6 11.56l5.4 2.23a2.9 2.9 0 0 1 1.63-.5h.15l2.4-3.48v-.05a3.88 3.88 0 1 1 3.88 3.88h-.09l-3.43 2.45v.12a2.9 2.9 0 0 1-5.74.6L1.98 15.4A10 10 0 1 0 11.98 2Zm-4.1 15.16 1.24.51a2.18 2.18 0 0 0 1.24-4.16l-1.28-.53a2.9 2.9 0 0 1 1.13-.13 2.9 2.9 0 1 1-2.33 4.31Zm9.16-6.02a2.59 2.59 0 1 0-2.59-2.59 2.59 2.59 0 0 0 2.59 2.59Zm0-4.53a1.95 1.95 0 1 1-1.94 1.94 1.95 1.95 0 0 1 1.94-1.94Z" />
              </svg>
              在 Steam 查看
            </a>

            <a
              v-if="project.links.github"
              :href="project.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn--ghost"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              源码
            </a>

            <a
              v-if="project.links.download"
              :href="project.links.download"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn--ghost"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="M7 10l5 5 5-5M12 15V3" />
              </svg>
              下载
            </a>

            <a
              v-if="project.links.video"
              :href="project.links.video"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn--ghost"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="5" width="14" height="14" rx="2" />
                <path d="M16 10l6-3v10l-6-3z" />
              </svg>
              宣传视频
            </a>
          </div>
        </div>
      </header>

      <!-- ============ 头图 ============ -->
      <section class="project-hero">
        <div class="container">
          <BiliEmbed
            v-if="project.heroMedia.type === 'bilibili'"
            :bvid="project.heroMedia.bvid"
          />
          <img
            v-else-if="project.heroMedia.type === 'image'"
            :src="project.heroMedia.src"
            :alt="`${project.title} 主视觉`"
            class="hero-image"
            width="1920"
            height="1080"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      <!-- ============ 正文 + 目录 ============ -->
      <section class="project-content">
        <div class="container content-grid">
          <aside v-if="headings.length" class="toc" aria-label="本页目录">
            <p class="toc-title">目录</p>
            <ul>
              <li v-for="h in headings" :key="h.id">
                <button
                  type="button"
                  class="toc-link"
                  :class="{ 'is-active': activeHeading === h.id }"
                  @click="scrollToHeading(h.id)"
                >
                  {{ h.text }}
                </button>
              </li>
            </ul>
          </aside>

          <div class="project-main">
            <article
              id="project-description"
              class="project-description"
              v-html="project.description"
            ></article>

            <section v-if="project.highlights?.length" class="highlights">
              <h2 class="block-title">项目亮点</h2>
              <ul class="highlights-grid">
                <li v-for="h in project.highlights" :key="h.title" class="highlight-card">
                  <span class="highlight-icon" aria-hidden="true">{{ h.icon }}</span>
                  <h3>{{ h.title }}</h3>
                  <p>{{ h.description }}</p>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <!-- ============ 画廊 ============ -->
      <section v-if="project.gallery?.length" class="project-gallery">
        <div class="container">
          <h2 class="block-title">项目展示</h2>
          <div class="gallery-grid">
            <button
              v-for="(item, i) in project.gallery"
              :key="item.src + i"
              type="button"
              class="gallery-item"
              :class="{ 'is-wide': item.fullWidth }"
              :aria-label="`放大查看：${item.alt}`"
              @click="lightbox = item"
            >
              <img :src="item.src" :alt="item.alt" loading="lazy" decoding="async" />
              <span class="gallery-zoom" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      <!-- ============ 上下篇 ============ -->
      <nav class="project-nav" aria-label="项目导航">
        <div class="container project-nav-grid">
          <router-link
            v-if="adjacent.prev"
            :to="`/project/${adjacent.prev.id}`"
            class="nav-card nav-card--prev"
          >
            <span class="nav-dir">← 上一个</span>
            <span class="nav-name">{{ adjacent.prev.title }}</span>
          </router-link>
          <span v-else class="nav-card nav-card--empty" aria-hidden="true"></span>

          <router-link
            v-if="adjacent.next"
            :to="`/project/${adjacent.next.id}`"
            class="nav-card nav-card--next"
          >
            <span class="nav-dir">下一个 →</span>
            <span class="nav-name">{{ adjacent.next.title }}</span>
          </router-link>
          <span v-else class="nav-card nav-card--empty" aria-hidden="true"></span>
        </div>
      </nav>

      <div class="container back-row">
        <router-link to="/#portfolio" class="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          返回全部项目
        </router-link>
      </div>
    </template>

    <Lightbox
      v-if="lightbox"
      :src="lightbox.src"
      :alt="lightbox.alt"
      @close="lightbox = null"
    />
  </div>
</template>

<style scoped>
.project-detail {
  padding-top: calc(var(--nav-height) + var(--sp-5));
  padding-bottom: var(--sp-8);
}

/* ============ 未找到 ============ */
.not-found {
  text-align: center;
  padding-block: var(--sp-9);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-4);
}

.not-found h1 {
  font-size: var(--fs-2xl);
}

.not-found p {
  color: var(--text-secondary);
}

/* ============ 面包屑 ============ */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: var(--fs-sm);
  color: var(--text-tertiary);
  padding-block: var(--sp-3);
}

.breadcrumb a:hover {
  color: var(--brand-400);
}

.breadcrumb span[aria-current] {
  color: var(--text-secondary);
}

/* ============ 头部 ============ */
.project-header {
  padding-block: var(--sp-4) var(--sp-6);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  margin-bottom: var(--sp-4);
}

.project-title {
  font-size: var(--fs-3xl);
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--brand-400);
  margin-bottom: var(--sp-3);
}

@media (forced-colors: active) {
  .project-title {
    -webkit-text-fill-color: currentColor;
    background: none;
    color: CanvasText;
  }
}

.project-subtitle {
  max-width: var(--measure);
  color: var(--text-secondary);
  font-size: var(--fs-md);
}

.project-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--sp-4);
  margin-top: var(--sp-6);
  padding: var(--sp-5);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.meta-item dt {
  font-size: var(--fs-xs);
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: var(--sp-1);
}

.meta-item dd {
  font-size: var(--fs-sm);
  color: var(--text-primary);
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3);
  margin-top: var(--sp-5);
}

.btn--steam {
  background: linear-gradient(135deg, #1b2838, #2a475e);
  color: #fff;
  border: 1px solid rgba(102, 192, 244, 0.35);
  box-shadow: 0 8px 24px rgba(27, 40, 56, 0.5);
}

.btn--steam:hover {
  transform: translateY(-2px);
  border-color: #66c0f4;
  box-shadow: 0 12px 30px rgba(102, 192, 244, 0.3);
}

/* ============ 头图 ============ */
.project-hero {
  padding-block: var(--sp-3);
}

.hero-image {
  width: 100%;
  /* 覆盖 width/height 属性带来的固定高度，保持原始宽高比 */
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
}

/* ============ 正文布局 ============ */
.project-content {
  padding-block: var(--sp-7);
}

.content-grid {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: start;
}

/* 目录 */
.toc {
  position: sticky;
  top: calc(var(--nav-height) + var(--sp-5));
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.toc-title {
  font-size: var(--fs-xs);
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.toc ul {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-left: 1px solid var(--border-subtle);
}

.toc-link {
  display: block;
  width: 100%;
  text-align: left;
  padding: var(--sp-1) var(--sp-3);
  font-size: var(--fs-sm);
  color: var(--text-tertiary);
  border-left: 2px solid transparent;
  margin-left: -1px;
  transition: color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out);
}

.toc-link:hover {
  color: var(--text-primary);
}

.toc-link.is-active {
  color: var(--brand-400);
  border-left-color: var(--brand-400);
}

/* 正文 */
.project-main {
  max-width: var(--measure);
  min-width: 0;
}

.project-description :deep(p) {
  color: var(--text-secondary);
  margin-bottom: var(--sp-4);
}

.project-description :deep(h2) {
  font-size: var(--fs-xl);
  margin-block: var(--sp-7) var(--sp-3);
  padding-left: var(--sp-3);
  border-left: 3px solid var(--brand-500);
  scroll-margin-top: calc(var(--nav-height) + var(--sp-5));
}

.project-description :deep(h2:first-child) {
  margin-top: 0;
}

.project-description :deep(strong) {
  color: var(--text-primary);
}

.project-description :deep(ul) {
  list-style: disc;
  padding-left: var(--sp-5);
  margin-bottom: var(--sp-4);
  color: var(--text-secondary);
}

.project-description :deep(li) {
  margin-bottom: var(--sp-1);
}

.project-description :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  padding: 0.1em 0.4em;
  border-radius: var(--radius-sm);
  background: var(--bg-inset);
  border: 1px solid var(--border-subtle);
}

/* ============ 亮点 ============ */
.block-title {
  font-size: var(--fs-xl);
  margin-bottom: var(--sp-5);
}

.highlights {
  margin-top: var(--sp-8);
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--sp-4);
}

.highlight-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--sp-5);
  transition: var(--transition);
}

.highlight-card:hover {
  transform: translateY(-3px);
  border-color: rgba(99, 102, 241, 0.45);
}

.highlight-icon {
  display: block;
  font-size: 1.6rem;
  margin-bottom: var(--sp-2);
  line-height: 1;
}

.highlight-card h3 {
  font-size: var(--fs-base);
  margin-bottom: var(--sp-1);
}

.highlight-card p {
  font-size: var(--fs-sm);
  color: var(--text-secondary);
}

/* ============ 画廊 ============ */
.project-gallery {
  padding-block: var(--sp-6);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--sp-4);
}

.gallery-item {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--bg-inset);
  padding: 0;
  display: block;
  cursor: zoom-in;
}

.gallery-item.is-wide {
  grid-column: 1 / -1;
}

.gallery-item img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: transform var(--dur-base) var(--ease-out);
}

.gallery-item:hover img {
  transform: scale(1.03);
}

.gallery-zoom {
  position: absolute;
  bottom: var(--sp-3);
  right: var(--sp-3);
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: #fff;
  background: rgba(6, 10, 20, 0.6);
  backdrop-filter: blur(6px);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.gallery-item:hover .gallery-zoom,
.gallery-item:focus-visible .gallery-zoom {
  opacity: 1;
  transform: none;
}

/* ============ 上下篇 ============ */
.project-nav {
  padding-block: var(--sp-6);
  border-top: 1px solid var(--border-subtle);
  margin-top: var(--sp-6);
}

.project-nav-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-4);
}

.nav-card {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  padding: var(--sp-4) var(--sp-5);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  transition: var(--transition);
}

.nav-card--next {
  text-align: right;
  align-items: flex-end;
}

.nav-card:not(.nav-card--empty):hover {
  border-color: var(--brand-400);
  transform: translateY(-2px);
}

.nav-card--empty {
  background: transparent;
  border-style: dashed;
  opacity: 0.35;
  pointer-events: none;
}

.nav-dir {
  font-size: var(--fs-xs);
  font-family: var(--font-mono);
  color: var(--text-tertiary);
}

.nav-name {
  font-family: var(--font-display);
  font-size: var(--fs-md);
  color: var(--text-primary);
}

/* ============ 返回 ============ */
.back-row {
  padding-top: var(--sp-4);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: var(--fs-sm);
  color: var(--text-secondary);
  transition: color var(--dur-fast) var(--ease-out);
}

.back-link:hover {
  color: var(--brand-400);
}

/* ============ 响应式 ============ */
@media (max-width: 960px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .toc {
    position: static;
    padding: var(--sp-4);
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    margin-bottom: var(--sp-4);
  }

  .toc ul {
    flex-direction: row;
    flex-wrap: wrap;
    border-left: none;
    gap: var(--sp-2);
  }

  .toc-link {
    padding: 0.25rem 0.6rem;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    margin-left: 0;
  }

  .toc-link.is-active {
    border-color: var(--brand-400);
    background: rgba(99, 102, 241, 0.1);
  }
}

@media (max-width: 720px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .project-nav-grid {
    grid-template-columns: 1fr;
  }

  .nav-card--next {
    text-align: left;
    align-items: flex-start;
  }

  .project-meta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
