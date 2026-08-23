<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard.vue'

const currentIndex = ref(0)
const total = projects.length
let timer = null

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`
}))

function goTo(i) {
  currentIndex.value = i
  resetTimer()
}
function prev() {
  if (currentIndex.value > 0) goTo(currentIndex.value - 1)
}
function next() {
  if (currentIndex.value < total - 1) goTo(currentIndex.value + 1)
}
function startTimer() {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % total
  }, 10000)
}
function resetTimer() {
  clearInterval(timer)
  startTimer()
}

function onKey(e) {
  const el = document.getElementById('portfolio')
  if (!el) return
  const rect = el.getBoundingClientRect()
  const visible = rect.top < window.innerHeight && rect.bottom > 0
  if (!visible) return
  if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

// 触摸滑动
let touchStartX = 0
function onTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX
}
function onTouchEnd(e) {
  const diff = touchStartX - e.changedTouches[0].screenX
  if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
}

onMounted(() => {
  document.addEventListener('keydown', onKey)
  startTimer()
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  clearInterval(timer)
})

const skills = [
  {
    title: '编程语言',
    items: [
      { name: 'C# (Unity游戏开发)', level: 'proficient' },
      { name: 'JAVA', level: 'familiar' },
      { name: 'Python', level: 'familiar' },
      { name: 'C', level: 'familiar' },
      { name: 'C++', level: 'familiar' }
    ]
  },
  {
    title: '游戏引擎',
    items: [
      { name: 'Unity', level: 'proficient' },
      { name: 'GMS2', level: 'familiar' },
      { name: 'RenPy', level: 'basic' },
      { name: 'Godot', level: 'basic' },
      { name: '虚幻4', level: 'basic' }
    ]
  },
  {
    title: '计算机方向',
    items: [
      { name: 'SQL', level: 'basic' },
      { name: 'Web', level: 'basic' },
      { name: 'Linux', level: 'basic' }
    ]
  },
  {
    title: '多媒体制作软件',
    items: [
      { name: 'Premiere', level: 'proficient' },
      { name: 'Aseprite', level: 'basic' },
      { name: 'FL Studio', level: 'basic' },
      { name: 'Photoshop', level: 'basic' }
    ]
  }
]
</script>

<template>
  <main>
    <!-- 英雄横幅区 -->
    <section class="hero" id="home">
      <div class="hero-content container">
        <h1 class="hero-title">
          <span class="hero-name">3KkM</span>
          <span class="hero-subtitle">独立游戏制作人</span>
        </h1>
        <p class="hero-description">
          专注于后端架构与Unity引擎开发，致力于构建稳定、高效的游戏系统。
          通过数据驱动设计与模块化架构，实现复杂游戏逻辑的优雅实现。
        </p>
        <a href="#portfolio" class="btn-primary">查看游戏项目</a>
      </div>
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
    </section>

    <!-- 作品集展示区 -->
    <section class="portfolio" id="portfolio">
      <div class="container">
        <h2 class="section-title">游戏项目</h2>
        <p class="section-subtitle">技术导向的独立游戏开发实践</p>

        <div
          class="carousel-container"
          @mouseenter="clearInterval(timer)"
          @mouseleave="resetTimer()"
        >
          <div class="carousel-track" :style="trackStyle" @touchstart="onTouchStart" @touchend="onTouchEnd">
            <div v-for="project in projects" :key="project.id" class="carousel-slide">
              <ProjectCard :project="project" />
            </div>
          </div>

          <button class="carousel-btn prev" aria-label="上一个项目" :disabled="currentIndex === 0" @click="prev">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="carousel-btn next" aria-label="下一个项目" :disabled="currentIndex === total - 1" @click="next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div class="carousel-indicators">
            <button
              v-for="(p, i) in projects"
              :key="p.id"
              class="indicator"
              :class="{ active: i === currentIndex }"
              :aria-label="`第${i + 1}个项目`"
              @click="goTo(i)"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- 关于与技能区 -->
    <section class="about" id="about">
      <div class="container about-content">
        <div class="about-text" v-reveal>
          <h2 class="section-title left">关于我</h2>
          <p class="about-description">
            一名计算机专业在读学生，具备扎实的面向对象编程与数据结构基础。
            爱好广泛，喜欢沟通交流，善于合作，有扎实的计算机基础，有较好的动手能力
            和对游戏开发的热情。多次与团队进行游戏合作开发，共同制作自己喜欢玩的游戏。
          </p>
          <p class="about-description">
            在游戏开发中，我注重系统架构的合理性与代码的可维护性。擅长使用
            ScriptableObject进行数据资产管理，通过面向对象设计实现灵活的扩展性，
            并关注性能优化与内存管理，确保游戏运行的流畅性。
          </p>
        </div>
        <div class="skills" v-reveal>
          <h3 class="skills-title">技术技能</h3>
          <div v-for="cat in skills" :key="cat.title" class="skill-category">
            <h4 class="skill-category-title">{{ cat.title }}</h4>
            <div class="skill-tags">
              <span v-for="item in cat.items" :key="item.name" class="skill-tag" :class="`skill-${item.level}`">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系区 -->
    <section class="contact" id="contact">
      <div class="container">
        <h2 class="section-title">联系我</h2>
        <p class="section-subtitle">欢迎技术交流与合作，期待与志同道合的伙伴共同创造优秀的游戏作品</p>
        <div class="contact-content" v-reveal>
          <div class="contact-item">
            <div class="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div>
              <h4>邮箱</h4>
              <p>zhangkm233@163.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <h4>位置</h4>
              <p>中国 · 北京</p>
            </div>
          </div>
        </div>
        <div class="social-links" v-reveal>
          <a href="https://github.com/Zhangkm233" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="https://space.bilibili.com/28464160" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Bilibili">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16" fill="currentColor"></polygon>
            </svg>
          </a>
          <a href="mailto:zhangkm233@163.com" class="social-link" aria-label="Email">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Hero */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: var(--nav-height);
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.hero-name {
  font-size: clamp(3rem, 8vw, 5rem);
  background: linear-gradient(135deg, #818cf8, #f472b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  color: var(--text-secondary);
}

.hero-description {
  max-width: 560px;
  color: var(--text-secondary);
  font-size: 1.05rem;
  margin-bottom: 2rem;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  animation: float 12s ease-in-out infinite;
}

.orb-1 { width: 400px; height: 400px; background: #6366f1; top: 10%; right: 10%; }
.orb-2 { width: 300px; height: 300px; background: #ec4899; bottom: 15%; right: 30%; animation-delay: -4s; }
.orb-3 { width: 250px; height: 250px; background: #14b8a6; top: 40%; right: 45%; animation-delay: -8s; }

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-30px) scale(1.08); }
}

/* 轮播 */
.portfolio {
  padding: 6rem 0;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  flex: 0 0 100%;
  padding: 0.25rem;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: rgba(15, 23, 42, 0.75);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  transition: var(--transition);
  z-index: 5;
}

.carousel-btn:hover:not(:disabled) {
  background: var(--primary);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.carousel-btn.prev { left: 1rem; }
.carousel-btn.next { right: 1rem; }

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(148, 163, 184, 0.4);
  transition: var(--transition);
  padding: 0;
}

.indicator.active {
  background: linear-gradient(135deg, #818cf8, #f472b6);
  transform: scale(1.25);
}

/* 关于 */
.about {
  padding: 4rem 0;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.section-title.left {
  text-align: left;
}

.about-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.skills-title {
  font-size: 1.3rem;
  margin-bottom: 1.25rem;
}

.skill-category {
  margin-bottom: 1.25rem;
}

.skill-category-title {
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.3rem 0.9rem;
  font-size: 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.skill-proficient {
  background: rgba(99, 102, 241, 0.18);
  border-color: rgba(99, 102, 241, 0.45);
  color: #a5b4fc;
}

.skill-familiar {
  background: rgba(236, 72, 153, 0.12);
  border-color: rgba(236, 72, 153, 0.35);
  color: #f9a8d4;
}

/* 联系 */
.contact {
  padding: 4rem 0;
}

.contact-content {
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
}

.social-link {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: var(--transition);
}

.social-link:hover {
  color: var(--text-primary);
  border-color: var(--primary);
  transform: translateY(-4px);
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>