import { ref, computed } from 'vue'

const STORAGE_KEY = 'zhangkm233-theme'

/** 当前主题：'dark' | 'light' */
const theme = ref('dark')

/** 是否已初始化 */
let initialized = false

/** 系统偏好是否为亮色 */
function systemPrefersLight() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: light)').matches
  )
}

/** 读取存储的主题，没有则跟随系统 */
function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* localStorage 不可用（隐私模式等）时忽略 */
  }
  return systemPrefersLight() ? 'light' : 'dark'
}

/** 把主题写到 <html data-theme> */
function applyTheme(value) {
  document.documentElement.setAttribute('data-theme', value)
}

/**
 * 初始化主题，必须在 app.mount 之前调用，避免首屏闪烁。
 * 会同时写入 DOM，保证首次渲染即为正确主题。
 */
export function initTheme() {
  if (initialized) return
  theme.value = readStoredTheme()
  applyTheme(theme.value)
  initialized = true
}

/** 设置主题 */
function setTheme(value) {
  theme.value = value
  applyTheme(value)
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* 忽略写入失败 */
  }
}

/** 在暗色 / 亮色之间切换 */
function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

/**
 * 主题 composable
 * @returns {{ theme, isDark, isLight, toggleTheme, setTheme }}
 */
export function useTheme() {
  return {
    theme: computed(() => theme.value),
    isDark: computed(() => theme.value === 'dark'),
    isLight: computed(() => theme.value === 'light'),
    toggleTheme,
    setTheme
  }
}
