<script setup>
import { ref, computed } from 'vue'
import { projects, categories } from '../data/projects'
import { experiences } from '../data/experiences'
import ProjectCard from '../components/ProjectCard.vue'

/* ---------------- 作品筛选 ---------------- */
const activeCategory = ref('全部')

const filterOptions = computed(() => ['全部', ...categories])

const filteredProjects = computed(() =>
  activeCategory.value === '全部'
    ? projects
    : projects.filter((p) => p.category === activeCategory.value)
)

/** 每个分类下的项目数量，用于筛选按钮的辅助文本 */
function countOf(cat) {
  return cat === '全部' ? projects.length : projects.filter((p) => p.category === cat).length
}

/* ---------------- 首页关键数据 ---------------- */
const stats = computed(() => {
  // Game Jam 类项目：分类为 Game Jam，或标签里含 Game Jam
  const jamCount = projects.filter(
    (p) => p.category === 'Game Jam' || p.tags.some((t) => t.includes('Game Jam'))
  ).length
  const steamCount = projects.filter((p) => p.links?.steam).length
  return [
    { value: String(projects.length), label: '个完整项目' },
    { value: String(jamCount), label: '次 Game Jam' },
    { value: String(steamCount), label: '款上线 Steam' }
  ]
})

/** 精选项目：优先取标记 featured 的，否则取第一个 */
const featuredProject = computed(
  () => projects.find((p) => p.featured) ?? projects[0]
)

/* ---------------- 技能数据 ---------------- */
const skills = [
  {
    title: '编程语言',
    items: [
      { name: 'C#', level: 'familiar' },
      { name: 'Java', level: 'familiar' },
      { name: 'Python', level: 'familiar' },
      { name: 'C / C++', level: 'familiar' },
      { name: 'Lua', level: 'familiar' },
      { name: 'HTML 等标记语言', level: 'basic' }
    ]
  },
  {
    title: '游戏引擎',
    items: [
      { name: 'Unity', level: 'proficient' },
      { name: 'Godot', level: 'basic' },
      { name: 'GMS2', level: 'basic' },
      { name: '虚幻 4 / 5', level: 'basic' }
    ]
  },
  {
    title: 'AI 工具',
    items: [
      { name: 'DeepSeek Harness', level: 'proficient' },
      { name: 'Cline', level: 'proficient' },
      { name: 'Cursor', level: 'proficient' },
      { name: 'GitHub Copilot', level: 'proficient' },
      { name: 'Codex', level: 'basic' },
      { name: 'Claude', level: 'basic' },
      { name: 'Zcode', level: 'basic' }
    ]
  },
  {
    title: '后端与工程协作',
    items: [
      { name: 'MySQL', level: 'familiar' },
      { name: 'Git', level: 'proficient' },
      { name: 'Docker', level: 'basic' },
      { name: 'Linux', level: 'basic' }
    ]
  },
  {
    title: '建模软件',
    items: [
      { name: 'Blender', level: 'basic' },
      { name: 'Maya', level: 'basic' }
    ]
  },
  {
    title: '多媒体制作',
    items: [
      { name: 'Premiere (PR)', level: 'proficient' },
      { name: 'Photoshop (PS)', level: 'proficient' },
      { name: 'Krita', level: 'basic' },
      { name: 'Reaper', level: 'basic' },
      { name: 'Aseprite', level: 'basic' }
    ]
  }
]

const levelLabel = {
  proficient: '熟练',
  familiar: '熟悉',
  basic: '了解'
}

/** 技能等级的中文描述，用于图例与无障碍提示 */
const levelDesc = {
  proficient: '可独立负责模块设计与实现',
  familiar: '有实际项目使用经验',
  basic: '掌握基础用法'
}

/* ---------------- 联系方式 ---------------- */
const contacts = [
  { label: '邮箱', value: 'zhangkm233@163.com', href: 'mailto:zhangkm233@163.com' },
  { label: '位置', value: '中国 · 北京' }
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/Zhangkm233', icon: 'github' },
  { label: 'Bilibili', href: 'https://space.bilibili.com/28464160', icon: 'bilibili' },
  { label: 'Email', href: 'mailto:zhangkm233@163.com', icon: 'mail' }
]
</script>

<template>
  <div class="home">
    <!-- ==================== Hero ==================== -->
    <section id="home" class="hero">
      <div class="hero-bg" aria-hidden="true">
        <span class="orb orb--1"></span>
        <span class="orb orb--2"></span>
        <span class="orb orb--3"></span>
        <span class="grid-lines"></span>
      </div>

      <div class="hero-inner container">
        <div class="hero-copy">
          <p class="eyebrow">Indie Game Developer</p>

          <h1 class="hero-title">
            <span class="hero-name">3KkM</span>
            <span class="hero-role">独立游戏制作人</span>
          </h1>

          <p class="hero-desc">
            专注于后端架构与 Unity 引擎开发，致力于构建稳定、高效的游戏系统。
            通过数据驱动设计与模块化架构，把复杂的游戏逻辑拆解成可维护的部分。
          </p>

          <div class="hero-actions">
            <a href="#portfolio" class="btn btn--primary">
              查看游戏项目
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#contact" class="btn btn--ghost">联系我</a>
          </div>

          <dl class="hero-stats">
            <div v-for="s in stats" :key="s.label" class="stat">
              <dt class="stat-value">{{ s.value }}</dt>
              <dd class="stat-label">{{ s.label }}</dd>
            </div>
          </dl>
        </div>

        <!-- 精选项目卡片：替代原版纯装饰的空白右栏 -->
        <div class="hero-visual">
          <router-link
            v-if="featuredProject"
            :to="`/project/${featuredProject.id}`"
            class="featured-card"
            :aria-label="`查看最新项目：${featuredProject.title}`"
          >
            <div class="featured-media">
              <img
                :src="featuredProject.cover"
                :alt="`${featuredProject.title} 游戏画面`"
                width="960"
                height="540"
                loading="eager"
                decoding="async"
              />
              <span class="featured-badge">{{ featuredProject.badge || '最新作品' }}</span>
            </div>
            <div class="featured-body">
              <h2 class="featured-title">{{ featuredProject.title }}</h2>
              <p class="featured-desc">{{ featuredProject.cardDescription }}</p>
              <span class="featured-more">
                查看详情
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ==================== 作品集 ==================== -->
    <section id="portfolio" class="section portfolio">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Portfolio</p>
          <h2 class="section-title">游戏项目</h2>
          <p class="section-subtitle">
            技术导向的独立游戏开发实践，从 Game Jam 原型到 Steam 上线的完整项目。
          </p>
        </div>

        <!-- 分类筛选 -->
        <div class="filters" role="group" aria-label="按类型筛选项目">
          <button
            v-for="cat in filterOptions"
            :key="cat"
            type="button"
            class="filter-btn"
            :class="{ 'is-active': activeCategory === cat }"
            :aria-pressed="activeCategory === cat"
            @click="activeCategory = cat"
          >
            {{ cat }}
            <span class="filter-count">{{ countOf(cat) }}</span>
          </button>
        </div>

        <!-- 项目网格 -->
        <div class="project-grid">
          <ProjectCard
            v-for="(project, i) in filteredProjects"
            :key="project.id"
            :project="project"
            v-reveal="i * 60"
          />
        </div>

        <p v-if="!filteredProjects.length" class="empty-hint">该分类下暂无项目。</p>
      </div>
    </section>

    <!-- ==================== 关于 ==================== -->
    <section id="about" class="section about">
      <div class="container">
        <div class="about-text" v-reveal>
          <p class="eyebrow">About</p>
          <h2 class="section-title">关于我</h2>

          <p class="about-desc">
            我是计算机网络工程专业在读学生，具备扎实全面的计算机基础知识，有完整的项目经历和丰富的比赛经验，
            善于沟通协作，多次组队开展项目的合作开发。能够积极跟进国内外科技发展趋势并融入实践，
            喜欢浏览国内外的计算机类技术前沿文章和演讲，有较强的自学能力、动手能力和较高的后端开发热情。
          </p>
          <p class="about-desc">
            在游戏开发中，我注重系统架构的合理性与代码的可维护性。擅长使用
            ScriptableObject 进行数据资产管理，通过面向对象设计实现灵活的扩展性，
            并关注性能优化与内存管理，确保游戏运行的流畅性。
          </p>

          <ul class="about-points">
            <li>数据驱动设计，策划与代码解耦</li>
            <li>模块化架构，便于玩法快速迭代</li>
            <li>关注性能与内存，保障低端设备流畅</li>
          </ul>

          <dl class="about-facts">
            <div class="fact">
              <dt>教育</dt>
              <dd>北京信息科技大学 · 计算机学院 · 网络工程（2023.9 — 2027.6）</dd>
            </div>
            <div class="fact">
              <dt>语言</dt>
              <dd>英语 CET-6 · 523 分</dd>
            </div>
            <div class="fact">
              <dt>方向</dt>
              <dd>游戏程序开发 · 后端与系统架构</dd>
            </div>
          </dl>
        </div>

        <!-- 技术技能：整宽网格，分类卡片 -->
        <div class="skills" v-reveal="120">
          <div class="skills-head">
            <h3 class="skills-title">技术技能</h3>
            <ul class="skills-legend" aria-label="熟练度图例">
              <li v-for="lv in ['proficient', 'familiar', 'basic']" :key="lv" class="legend-item">
                <span class="legend-dot" :class="`legend-dot--${lv}`" aria-hidden="true"></span>
                <span class="legend-text">
                  <strong>{{ levelLabel[lv] }}</strong>
                  <span class="legend-desc">{{ levelDesc[lv] }}</span>
                </span>
              </li>
            </ul>
          </div>

          <div class="skill-grid">
            <div v-for="cat in skills" :key="cat.title" class="skill-group">
              <h4 class="skill-group-title">
                {{ cat.title }}
                <span class="skill-count">{{ cat.items.length }}</span>
              </h4>
              <ul class="skill-list">
                <li
                  v-for="item in cat.items"
                  :key="item.name"
                  class="skill-item"
                  :class="`skill-item--${item.level}`"
                >
                  <span class="skill-name">{{ item.name }}</span>
                  <span class="skill-level">{{ levelLabel[item.level] }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== 实习经历 ==================== -->
    <section id="experience" class="section experience">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Experience</p>
          <h2 class="section-title">实习经历</h2>
          <p class="section-subtitle">
            在网络安全与信息技术方向的工程实践，积累了对真实系统部署、测试与安全演练的经验。
          </p>
        </div>

        <ol class="timeline">
          <li
            v-for="(exp, i) in experiences"
            :key="exp.company + exp.period"
            class="timeline-item"
            v-reveal="i * 80"
          >
            <div class="timeline-marker" aria-hidden="true"></div>

            <div class="timeline-card">
              <div class="exp-head">
                <div class="exp-main">
                  <h3 class="exp-title">{{ exp.title }}</h3>
                  <p class="exp-company">
                    {{ exp.company }}
                    <span v-if="exp.department" class="exp-dept">{{ exp.department }}</span>
                  </p>
                </div>
                <time class="exp-period">{{ exp.period }}</time>
              </div>

              <p class="exp-summary">{{ exp.summary }}</p>

              <ul v-if="exp.highlights.length" class="exp-highlights">
                <li v-for="h in exp.highlights" :key="h">{{ h }}</li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ==================== 联系 ==================== -->
    <section id="contact" class="section contact">
      <div class="container">
        <div class="contact-card" v-reveal>
          <div class="contact-copy">
            <p class="eyebrow">Contact</p>
            <h2 class="section-title">聊聊游戏，或者一起做点什么</h2>
            <p class="contact-desc">
              欢迎技术交流与合作，期待与志同道合的伙伴共同创造优秀的游戏作品。
            </p>

            <dl class="contact-list">
              <div v-for="c in contacts" :key="c.label" class="contact-row">
                <dt>{{ c.label }}</dt>
                <dd>
                  <a v-if="c.href" :href="c.href">{{ c.value }}</a>
                  <span v-else>{{ c.value }}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div class="contact-side">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="social-icon" aria-hidden="true">
                <svg v-if="s.icon === 'github'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <svg v-else-if="s.icon === 'bilibili'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="7" width="18" height="13" rx="3" />
                  <path d="M8 3l2 4M16 3l-2 4M9 13v2M15 13v2" />
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </span>
              <span class="social-label">{{ s.label }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ============================================================
   Hero
   ============================================================ */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: clamp(560px, 86vh, 800px);
  padding-top: calc(var(--nav-height) + var(--sp-8));
  padding-bottom: var(--sp-8);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.3;
  animation: float 16s var(--ease-in-out) infinite;
}

.orb--1 {
  width: min(420px, 45vw);
  aspect-ratio: 1;
  background: var(--brand-500);
  top: 6%;
  right: 6%;
}

.orb--2 {
  width: min(320px, 34vw);
  aspect-ratio: 1;
  background: var(--accent-500);
  bottom: 8%;
  right: 32%;
  animation-delay: -5s;
}

.orb--3 {
  width: min(260px, 28vw);
  aspect-ratio: 1;
  background: #14b8a6;
  top: 44%;
  right: 46%;
  animation-delay: -10s;
  opacity: 0.18;
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(var(--border-subtle) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 75%);
  opacity: 0.5;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-32px) scale(1.08);
  }
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--sp-4);
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  margin-block: var(--sp-1);
}

.hero-name {
  font-size: var(--fs-hero);
  line-height: 1;
  letter-spacing: -0.01em;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--brand-400);
}

@media (forced-colors: active) {
  .hero-name {
    -webkit-text-fill-color: currentColor;
    background: none;
    color: CanvasText;
  }
}

.hero-role {
  font-size: var(--fs-xl);
  color: var(--text-secondary);
}

.hero-desc {
  max-width: 46ch;
  color: var(--text-secondary);
  font-size: var(--fs-md);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3);
  margin-top: var(--sp-2);
}

.hero-stats {
  display: flex;
  gap: clamp(1.5rem, 4vw, 3rem);
  margin-top: var(--sp-5);
  padding-top: var(--sp-5);
  border-top: 1px solid var(--border-subtle);
  width: 100%;
  max-width: 460px;
}

.stat {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.15rem;
}

.stat-value {
  font-family: var(--font-display);
  font-size: var(--fs-xl);
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  font-size: var(--fs-xs);
  color: var(--text-tertiary);
  letter-spacing: 0.02em;
}

/* 精选卡片 */
.hero-visual {
  display: flex;
  justify-content: flex-end;
}

.featured-card {
  display: block;
  width: 100%;
  max-width: 460px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transform: rotate(-1.2deg);
  transition: transform var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out);
}

.featured-card:hover {
  transform: rotate(0deg) translateY(-6px);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 28px 60px rgba(2, 6, 16, 0.55);
}

.featured-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.featured-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease-out);
}

.featured-card:hover .featured-media img {
  transform: scale(1.04);
}

.featured-badge {
  position: absolute;
  top: var(--sp-3);
  left: var(--sp-3);
  padding: 0.25em 0.7em;
  font-size: var(--fs-xs);
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
  color: #fff;
  background: var(--gradient-cta);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-sm);
}

.featured-body {
  padding: var(--sp-5);
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.featured-title {
  font-size: var(--fs-lg);
}

.featured-desc {
  font-size: var(--fs-sm);
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured-more {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-1);
  font-size: var(--fs-sm);
  color: var(--brand-400);
  margin-top: var(--sp-1);
}

/* ============================================================
   作品集
   ============================================================ */
.portfolio {
  padding-top: var(--section-py);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  margin-bottom: var(--sp-6);
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 0.45rem 0.95rem;
  font-size: var(--fs-sm);
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  background: transparent;
  transition: var(--transition);
}

.filter-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
  background: rgba(99, 102, 241, 0.08);
}

.filter-btn.is-active {
  color: #fff;
  background: var(--gradient-cta);
  border-color: transparent;
  box-shadow: var(--shadow-brand);
}

.filter-count {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 0.05em 0.4em;
  border-radius: var(--radius-sm);
  background: rgba(148, 163, 184, 0.18);
}

.filter-btn.is-active .filter-count {
  background: rgba(255, 255, 255, 0.25);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--sp-5);
}

.empty-hint {
  color: var(--text-tertiary);
  text-align: center;
  padding-block: var(--sp-8);
}

/* ============================================================
   关于
   ============================================================ */
.about {
  background: var(--bg-elevated);
  border-block: 1px solid var(--border-subtle);
}

.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  align-items: flex-start;
  max-width: 78ch;
}

.about-desc {
  color: var(--text-secondary);
  max-width: var(--measure);
}

.about-points {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2) var(--sp-5);
  margin-top: var(--sp-2);
}

.about-points li {
  position: relative;
  padding-left: var(--sp-5);
  color: var(--text-secondary);
  font-size: var(--fs-sm);
}

.about-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 12px;
  height: 2px;
  border-radius: 2px;
  background: var(--gradient-brand);
}

/* 个人信息速览 */
.about-facts {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  margin-top: var(--sp-4);
  padding-top: var(--sp-4);
  border-top: 1px solid var(--border-subtle);
  width: 100%;
}

.fact {
  display: flex;
  gap: var(--sp-4);
  font-size: var(--fs-sm);
}

.fact dt {
  flex-shrink: 0;
  width: 3.5em;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--text-tertiary);
  padding-top: 0.2em;
}

.fact dd {
  color: var(--text-secondary);
}

/* ---------- 技术技能 ---------- */
.skills {
  margin-top: var(--sp-8);
  padding-top: var(--sp-6);
  border-top: 1px solid var(--border-subtle);
}

.skills-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--sp-4);
  margin-bottom: var(--sp-5);
}

.skills-title {
  font-size: var(--fs-xl);
}

/* 图例 */
.skills-legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2) var(--sp-5);
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: var(--fs-xs);
  color: var(--text-tertiary);
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-dot--proficient {
  background: var(--brand-500);
}
.legend-dot--familiar {
  background: var(--accent-500);
}
.legend-dot--basic {
  background: var(--text-tertiary);
}

.legend-text {
  display: inline-flex;
  gap: 0.35em;
}

.legend-text strong {
  color: var(--text-secondary);
  font-weight: 500;
}

.legend-desc {
  color: var(--text-tertiary);
}

/* 分类网格：整宽自适应，2-3 列 */
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--sp-4);
  align-items: stretch;
}

.skill-group {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--sp-5);
  transition: border-color var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.skill-group:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

.skill-group-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-2);
  font-family: var(--font-body);
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--sp-3);
}

.skill-count {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 400;
  color: var(--text-tertiary);
  padding: 0.05em 0.45em;
  border-radius: var(--radius-sm);
  background: var(--bg-inset);
  border: 1px solid var(--border-subtle);
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  align-content: flex-start;
  flex: 1;
}

.skill-item {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 0.28rem 0.65rem;
  font-size: var(--fs-sm);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-inset);
  transition: var(--transition);
  white-space: nowrap;
}

.skill-item:hover {
  transform: translateY(-1px);
  border-color: var(--border-strong);
}

.skill-name {
  color: var(--text-primary);
}

.skill-level {
  font-size: 0.68rem;
  font-family: var(--font-mono);
  color: var(--text-tertiary);
}

.skill-item--proficient {
  border-color: rgba(99, 102, 241, 0.45);
  background: rgba(99, 102, 241, 0.12);
}
.skill-item--proficient .skill-level {
  color: var(--brand-400);
}

.skill-item--familiar {
  border-color: rgba(236, 72, 153, 0.35);
  background: rgba(236, 72, 153, 0.08);
}
.skill-item--familiar .skill-level {
  color: var(--accent-400);
}

/* ============================================================
   实习经历
   ============================================================ */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
  padding-left: var(--sp-6);
}

/* 竖线 */
.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 12px;
  bottom: 12px;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(
    to bottom,
    var(--brand-500),
    var(--accent-500),
    transparent
  );
  opacity: 0.5;
}

.timeline-item {
  position: relative;
}

.timeline-marker {
  position: absolute;
  left: calc(var(--sp-6) * -1 + 2px);
  top: 1.6rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bg-base);
  border: 2px solid var(--brand-500);
  box-shadow: 0 0 0 3px var(--bg-base);
}

.timeline-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: clamp(1.25rem, 3vw, 1.75rem);
  transition: border-color var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.timeline-card:hover {
  border-color: rgba(99, 102, 241, 0.45);
  transform: translateY(-2px);
}

.exp-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--sp-2) var(--sp-4);
  margin-bottom: var(--sp-3);
}

.exp-main {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.exp-title {
  font-size: var(--fs-lg);
  color: var(--text-primary);
}

.exp-company {
  font-size: var(--fs-sm);
  color: var(--text-secondary);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--sp-2);
}

.exp-dept {
  font-size: var(--fs-xs);
  font-family: var(--font-mono);
  color: var(--text-tertiary);
  padding: 0.1em 0.5em;
  border-radius: var(--radius-sm);
  background: var(--bg-inset);
  border: 1px solid var(--border-subtle);
}

.exp-period {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--brand-400);
  padding: 0.2em 0.7em;
  border-radius: var(--radius-pill);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.25);
  white-space: nowrap;
}

.exp-summary {
  color: var(--text-secondary);
  font-size: var(--fs-sm);
  margin-bottom: var(--sp-3);
}

.exp-highlights {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
}

.exp-highlights li {
  position: relative;
  padding-left: var(--sp-5);
  font-size: var(--fs-sm);
  color: var(--text-secondary);
}

.exp-highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 12px;
  height: 2px;
  border-radius: 2px;
  background: var(--gradient-brand);
}

/* ============================================================
   联系
   ============================================================ */
.contact-card {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  padding: clamp(1.75rem, 5vw, 3.5rem);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: -40%;
  right: -10%;
  width: 380px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--brand-500);
  filter: blur(100px);
  opacity: 0.14;
  pointer-events: none;
}

.contact-copy {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  align-items: flex-start;
  position: relative;
}

.contact-desc {
  color: var(--text-secondary);
  max-width: 46ch;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  margin-top: var(--sp-2);
}

.contact-row {
  display: flex;
  gap: var(--sp-4);
  font-size: var(--fs-sm);
}

.contact-row dt {
  width: 4em;
  flex-shrink: 0;
  color: var(--text-tertiary);
}

.contact-row dd {
  color: var(--text-primary);
}

.contact-row a:hover {
  color: var(--brand-400);
  text-decoration: underline;
}

.contact-side {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--bg-inset);
  color: var(--text-secondary);
  transition: var(--transition);
}

.social-link:hover {
  color: var(--text-primary);
  border-color: var(--brand-400);
  transform: translateX(4px);
}

.social-icon {
  display: inline-flex;
  color: var(--brand-400);
}

.social-label {
  font-size: var(--fs-sm);
}

/* ============================================================
   响应式
   ============================================================ */
@media (max-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .hero {
    min-height: auto;
    padding-top: calc(var(--nav-height) + var(--sp-7));
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: var(--sp-7);
  }

  .hero-visual {
    justify-content: flex-start;
  }

  .featured-card {
    transform: none;
    max-width: 100%;
  }

  .contact-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .project-grid {
    grid-template-columns: 1fr;
  }

  .skill-grid {
    grid-template-columns: 1fr;
  }

  .skills-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-stats {
    gap: var(--sp-5);
  }

  .filter-btn {
    padding: 0.4rem 0.8rem;
  }
}
</style>
