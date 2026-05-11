<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type CSSProperties } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

type NavigationName = 'home' | 'about' | 'award' | 'gallery'

interface NavigationItem {
  name: NavigationName
  to: string
  label: string
}

interface IndicatorState {
  x: number
  y: number
  width: number
  height: number
  visible: boolean
}

type ElementRefValue = Element | { $el?: Element | null } | null

const route = useRoute()
const activeRouteName = computed<NavigationName | null>(() => {
  return typeof route.name === 'string' ? (route.name as NavigationName) : null
})
const isHome = computed(() => activeRouteName.value === 'home')
const navRef = ref<HTMLElement | null>(null)
const indicator = ref<IndicatorState>({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  visible: false
})

const navigation: NavigationItem[] = [
  { name: 'home', to: '/', label: 'Home' },
  { name: 'about', to: '/about', label: 'About' },
  { name: 'award', to: '/award', label: 'Award' },
  { name: 'gallery', to: '/gallery', label: 'Gallery' }
]

const linkElements = new Map<NavigationName, HTMLElement>()
let resizeObserver: ResizeObserver | undefined

const indicatorStyle = computed<CSSProperties>(() => ({
  width: `${indicator.value.width}px`,
  height: `${indicator.value.height}px`,
  transform: `translate3d(${indicator.value.x}px, ${indicator.value.y}px, 0)`,
  opacity: indicator.value.visible ? 1 : 0
}))

function toHtmlElement(element: ElementRefValue): HTMLElement | null {
  const target = element && '$el' in element ? element.$el ?? null : element

  return target instanceof HTMLElement ? target : null
}

function setLinkElement(name: NavigationName, element: ElementRefValue): void {
  const target = toHtmlElement(element)

  if (target) {
    linkElements.set(name, target)
    return
  }

  linkElements.delete(name)
}

function updateIndicator(): void {
  const navElement = navRef.value
  const activeLinkName = activeRouteName.value
  const activeLink = activeLinkName ? linkElements.get(activeLinkName) : null

  if (!navElement || !activeLink) {
    indicator.value.visible = false
    return
  }

  const navRect = navElement.getBoundingClientRect()
  const linkRect = activeLink.getBoundingClientRect()

  indicator.value = {
    x: linkRect.left - navRect.left,
    y: linkRect.top - navRect.top,
    width: linkRect.width,
    height: linkRect.height,
    visible: true
  }
}

async function syncIndicator(): Promise<void> {
  await nextTick()
  updateIndicator()
}

watch(activeRouteName, syncIndicator, { immediate: true })

onMounted(() => {
  resizeObserver = new ResizeObserver(updateIndicator)

  if (navRef.value) {
    resizeObserver.observe(navRef.value)
  }

  linkElements.forEach((element) => resizeObserver?.observe(element))
  window.addEventListener('resize', updateIndicator)
  void syncIndicator()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIndicator)
  resizeObserver?.disconnect()
})
</script>

<template>
  <div :class="['shell', { 'home-mode': isHome }]">
    <header class="header">
      <RouterLink class="brand" to="/">
        <span class="name">Ruijia Zhang</span>
      </RouterLink>
      <nav ref="navRef" class="nav" aria-label="Main navigation">
        <span class="nav-indicator" :style="indicatorStyle" aria-hidden="true"></span>
        <RouterLink v-for="item in navigation" :key="item.name" :ref="(element) => setLinkElement(item.name, element)" :class="{ active: activeRouteName === item.name }" :to="item.to">
          {{ item.label }}
        </RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>

    <footer class="footer">
      <span>RuijiaZhang.art</span>
      <span>Personal Music Archive</span>
    </footer>
  </div>
</template>

<style lang="less" scoped>
.shell {
  --topbar-offset: 6.6rem;

  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &.home-mode {
    height: 100dvh;
    min-height: 100dvh;
    overflow: hidden;

    .content {
      min-height: 0;
      padding: var(--topbar-offset) 0 0.9rem;
    }

    .footer {
      padding: 0.7rem 0 0.9rem;
    }
  }

  .header {
    position: fixed;
    top: 0.7rem;
    left: var(--page-gutter);
    right: var(--page-gutter);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.82rem 0.95rem 0.82rem 1.1rem;
    background: linear-gradient(135deg, rgba(249, 248, 244, 0.9), rgba(255, 255, 255, 0.68));
    border: 1px solid rgba(230, 226, 218, 0.92);
    border-radius: 999px;
    box-shadow:
      0 16px 38px -28px rgba(45, 58, 49, 0.28),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);

    &::before {
      content: '';
      position: absolute;
      inset: 1px;
      border-radius: inherit;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0));
      pointer-events: none;
    }
  }

  .brand {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    color: var(--text-primary);
    text-decoration: none;
    transition:
      color 300ms ease,
      transform 400ms ease;

    .name {
      margin-left: 1rem;
      font-family: var(--font-display);
      font-size: 1.48rem;
      letter-spacing: 0.01em;
      line-height: 1;
    }

    &:hover {
      color: var(--accent-deep);
      transform: translateY(-1px);
    }
  }

  .nav {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.28rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.45);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);

    .nav-indicator {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 244, 238, 0.94));
      border: 1px solid rgba(222, 214, 203, 0.9);
      pointer-events: none;
      transition:
        transform 1020ms cubic-bezier(0.22, 1, 0.36, 1),
        width 1020ms cubic-bezier(0.22, 1, 0.36, 1),
        height 1020ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 560ms ease;
    }

    a {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.58rem 0.9rem;
      border-radius: 999px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      transition:
        color 300ms ease,
        transform 400ms ease,
        background-color 300ms ease,
        box-shadow 400ms ease;

      &:not(.active):hover,
      &:not(.active):focus-visible {
        color: var(--accent-deep);
        background: rgba(255, 255, 255, 0.52);
        transform: translateY(-1px);
      }

      &.active {
        color: var(--text-primary);
      }

      &:hover,
      &:focus-visible {
        transform: translateY(-1px);
      }
    }
  }

  .content {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: calc(var(--topbar-offset) + 1.35rem) 0 3rem;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0 1.1rem;
    color: var(--text-muted);
    font-size: 0.74rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    border-top: 1px solid rgba(230, 226, 218, 0.92);
  }
}

@media (max-width: 900px) {
  .shell {
    --topbar-offset: 4.2rem;

    &.home-mode {
      height: auto;
      min-height: 100vh;
      overflow: visible;

      .content {
        min-height: auto;
        padding: var(--topbar-offset) 0 1.2rem;
      }
    }

    .header {
      top: 0.55rem;
      flex-direction: column;
      align-items: stretch;
      gap: 0.7rem;
      padding: 0.66rem;
      border-radius: 15px;
    }

    .brand {
      display: none;
      justify-content: center;

      .name {
        margin-left: 0;
        font-size: 1.26rem;
      }
    }

    .nav {
      width: 100%;
      gap: 0.24rem;
      padding: 0.22rem;

      a {
        flex: 1 1 0;
        min-width: 0;
        padding: 0.48rem 0.2rem;
        font-size: 0.8rem;
        letter-spacing: 0.04em;
        white-space: nowrap;
      }
    }

    .footer {
      align-items: flex-start;
      gap: 0.3rem;
      font-size: 0.68rem;
      letter-spacing: 0.12em;
    }
  }
}
</style>
