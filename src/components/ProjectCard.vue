<script setup>
defineProps({
  project: { type: Object, required: true }
})
</script>

<template>
  <router-link :to="`/project/${project.id}`" class="card-link">
    <article class="project-card">
      <div class="card-media">
        <img
          :src="project.cover"
          :alt="`${project.title} 游戏截图`"
          width="960"
          height="540"
          loading="lazy"
          decoding="async"
        />
        <div class="card-badges">
          <span v-if="project.badge" class="card-badge card-badge--accent">{{ project.badge }}</span>
          <span v-if="project.links?.steam" class="card-badge">Steam</span>
        </div>
      </div>

      <div class="card-body">
        <div class="card-tags">
          <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <h3 class="card-title">{{ project.title }}</h3>
        <p class="card-desc">{{ project.cardDescription }}</p>

        <div class="card-footer">
          <span class="card-meta">{{ project.date }}</span>
          <span class="card-arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  </router-link>
</template>

<style scoped>
.card-link {
  display: block;
  height: 100%;
}

.project-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out);
}

.card-link:hover .project-card {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: var(--shadow-lg);
}

.card-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-inset);
}

.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease-out);
}

.card-link:hover .card-media img {
  transform: scale(1.045);
}

.card-badges {
  position: absolute;
  top: var(--sp-3);
  right: var(--sp-3);
  display: flex;
  gap: var(--sp-2);
}

.card-badge {
  padding: 0.2em 0.6em;
  font-size: var(--fs-xs);
  font-family: var(--font-mono);
  color: #fff;
  background: rgba(23, 26, 38, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-sm);
  backdrop-filter: blur(6px);
  white-space: nowrap;
}

.card-badge--accent {
  background: var(--gradient-cta);
  border-color: transparent;
  box-shadow: var(--shadow-sm);
}

.card-body {
  padding: var(--sp-5);
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
}

.card-title {
  font-size: var(--fs-lg);
  transition: color var(--dur-fast) var(--ease-out);
}

.card-link:hover .card-title {
  color: var(--brand-400);
}

.card-desc {
  color: var(--text-secondary);
  font-size: var(--fs-sm);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--sp-2);
  padding-top: var(--sp-3);
  border-top: 1px solid var(--border-subtle);
}

.card-meta {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--text-tertiary);
}

.card-arrow {
  display: inline-flex;
  color: var(--text-tertiary);
  transition: transform var(--dur-base) var(--ease-out),
    color var(--dur-base) var(--ease-out);
}

.card-link:hover .card-arrow {
  color: var(--brand-400);
  transform: translateX(4px);
}
</style>
