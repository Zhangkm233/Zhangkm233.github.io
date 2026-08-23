<script setup>
defineProps({
  project: { type: Object, required: true }
})
</script>

<template>
  <router-link :to="`/project/${project.id}`" class="card-link">
    <article class="portfolio-card">
      <div class="card-image">
        <img :src="project.cover" :alt="`${project.title}游戏截图`" loading="lazy" />
      </div>
      <div class="card-content">
        <div class="card-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <h3 class="card-title">{{ project.title }}</h3>
        <p class="card-description">{{ project.cardDescription }}</p>
      </div>
    </article>
  </router-link>
</template>

<style scoped>
.card-link {
  display: block;
  height: 100%;
}

.portfolio-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
}

.portfolio-card:hover {
  transform: translateY(-6px);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
}

.card-image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
}

.portfolio-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-title {
  font-size: 1.35rem;
}

.card-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
}
</style>