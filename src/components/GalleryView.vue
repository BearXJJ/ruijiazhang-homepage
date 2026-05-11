<template>
  <section class="gallery-page" v-motion="pageMotion">
    <header class="gallery-hero" v-motion="revealMotion(0, 16)">
      <div>
        <div class="eyebrow">GALLERY</div>
        <div class="hero-title"><em>Scenes and Stages</em></div>
      </div>
    </header>

    <section class="media-wall" aria-label="Gallery media">
      <div v-for="(item, index) in mediaItems" :key="item.id" v-motion="revealMotion(index + 1, 18)" class="media-reveal">
        <motion.button
          :ref="(element) => setMediaElement(item.id, element)"
          class="media-card"
          type="button"
          :aria-label="`Open ${item.alt || 'gallery video'}`"
          :while-hover="cardMotion.hover"
          :while-press="cardMotion.press"
          :transition="cardMotion.transition"
          @click="openItem(item, $event)">
          <img v-if="item.type === 'image'" class="media" :src="item.src" :alt="item.alt" />
          <video v-else class="media" :src="item.src" muted playsinline preload="metadata" aria-hidden="true"></video>
          <span v-if="item.type === 'video'" class="play-mark" aria-hidden="true"></span>
        </motion.button>
      </div>
    </section>

    <Teleport to="body">
      <div v-if="activeItem" :class="['viewer', { 'viewer--ready': viewerReady, 'viewer--closing': isClosing }]" role="dialog" aria-modal="true" @click.self="closeViewer">
        <div ref="viewerStageRef" class="viewer-stage">
          <img v-if="activeItem.type === 'image'" class="viewer-media" :src="activeItem.src" :alt="activeItem.alt" />
          <video v-else class="viewer-media" :src="activeItem.src" controls autoplay playsinline preload="metadata"></video>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { animate, motion } from 'motion-v'
import { galleryContent } from '../content/siteContent'
import { pageMotion, revealMotion } from '../utils/motionPresets'
import type { GalleryViewItem } from '../types/content'

type ElementRefValue = Element | { $el?: Element | null } | null

interface ViewerTransform {
  x: number
  y: number
  scaleX: number
  scaleY: number
}

const reduceMotion = Boolean(
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
)
const softEase = [0.22, 1, 0.36, 1] as const
const motionEaseOpen = [0.16, 1, 0.3, 1] as const
const motionEaseClose = [0.4, 0, 0.2, 1] as const
const cardMotion = {
  hover: {
    y: reduceMotion ? 0 : -7,
    scale: reduceMotion ? 1 : 1.018,
    filter: 'saturate(1.04)'
  },
  press: {
    scale: reduceMotion ? 1 : 0.985
  },
  transition: {
    duration: reduceMotion ? 0.01 : 0.42,
    ease: softEase
  }
}

const mediaItems = ref<GalleryViewItem[]>(
  shuffleItems(
    galleryContent.items.map((item) => ({
      id: item.key,
      type: item.type,
      src: item.srcPath,
      alt: item.alt
    }))
  )
)
const activeItem = ref<GalleryViewItem | null>(null)
const viewerReady = ref(false)
const isClosing = ref(false)
const viewerStageRef = ref<HTMLElement | null>(null)
const mediaElements = new Map<string, HTMLElement>()

function shuffleItems<T>(items: T[]): T[] {
  const shuffledItems = [...items]

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentItem = shuffledItems[index]

    shuffledItems[index] = shuffledItems[randomIndex]
    shuffledItems[randomIndex] = currentItem
  }

  return shuffledItems
}

function setMediaElement(id: string, element: ElementRefValue): void {
  const rawTarget = element && '$el' in element ? element.$el ?? null : element
  const target = rawTarget instanceof HTMLElement ? rawTarget : null

  if (target) {
    mediaElements.set(id, target)
    return
  }

  mediaElements.delete(id)
}

function getTransformFromRects(sourceRect: DOMRect, targetRect: DOMRect): ViewerTransform {
  return {
    x: sourceRect.left - targetRect.left,
    y: sourceRect.top - targetRect.top,
    scaleX: sourceRect.width / targetRect.width,
    scaleY: sourceRect.height / targetRect.height
  }
}

function animateStageFrom(sourceRect: DOMRect): void {
  requestAnimationFrame(() => {
    const stageElement = viewerStageRef.value

    if (!stageElement) {
      viewerReady.value = true
      return
    }

    const targetRect = stageElement.getBoundingClientRect()
    const transform = getTransformFromRects(sourceRect, targetRect)

    animate(
      stageElement,
      {
        opacity: [0.72, 1],
        transform: [`translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scaleX}, ${transform.scaleY})`, 'translate3d(0, 0, 0) scale(1, 1)'],
        borderRadius: ['18px', '18px']
      },
      {
        duration: reduceMotion ? 0.01 : 0.76,
        ease: motionEaseOpen
      }
    )

    viewerReady.value = true
  })
}

async function openItem(item: GalleryViewItem, event: MouseEvent): Promise<void> {
  if (isClosing.value) {
    return
  }

  const currentTarget = event.currentTarget

  if (!(currentTarget instanceof HTMLElement)) {
    return
  }

  const sourceRect = currentTarget.getBoundingClientRect()
  viewerReady.value = false
  activeItem.value = item

  await nextTick()
  animateStageFrom(sourceRect)
}

function closeViewer(): void {
  if (!activeItem.value || isClosing.value) {
    return
  }

  const stageElement = viewerStageRef.value
  const activeElement = mediaElements.get(activeItem.value.id)

  if (!stageElement || !activeElement) {
    activeItem.value = null
    isClosing.value = false
    viewerReady.value = false
    return
  }

  isClosing.value = true
  viewerReady.value = false

  const stageRect = stageElement.getBoundingClientRect()
  const sourceRect = activeElement.getBoundingClientRect()
  const transform = getTransformFromRects(sourceRect, stageRect)

  const stageAnimation = animate(
    stageElement,
    {
      opacity: [1, 0.72],
      transform: ['translate3d(0, 0, 0) scale(1, 1)', `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scaleX}, ${transform.scaleY})`]
    },
    {
      duration: reduceMotion ? 0.01 : 0.56,
      ease: motionEaseClose
    }
  )

  stageAnimation.finished.finally(() => {
    activeItem.value = null
    isClosing.value = false
  })
}

function handleKeydown(event: KeyboardEvent): void {
  if (!activeItem.value) {
    return
  }

  if (event.key === 'Escape') {
    closeViewer()
  }
}

watch(activeItem, (item) => {
  document.body.style.overflow = item ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style lang="less" scoped>
.gallery-page {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 90%;
  margin: 0 auto;
  padding-top: 1rem;

  .gallery-hero {
    display: flex;
    gap: 2rem;
    align-items: end;
    justify-content: space-between;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(230, 226, 218, 0.92);

    .hero-title {
      max-width: 13ch;
      margin: 0.65rem 0 0;
      font-family: var(--font-display);
      font-size: 4.8rem;
      line-height: 0.95;
      letter-spacing: -0.03em;
    }
  }

  .media-wall {
    columns: 3 16rem;
    column-gap: 1.25rem;

    .media-reveal {
      display: inline-block;
      width: 100%;
      margin: 0 0 1.25rem;
      break-inside: avoid;
    }

    .media-card {
      position: relative;
      display: block;
      width: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      border-radius: 18px;
      border: 0;
      background: rgba(255, 255, 255, 0.34);
      box-shadow:
        0 12px 28px -24px rgba(45, 58, 49, 0.28),
        inset 0 1px 0 rgba(255, 255, 255, 0.34);
      transition:
        box-shadow 620ms ease,
        background 420ms ease;
      cursor: zoom-in;

      &::after {
        content: '';
        position: absolute;
        inset: 1px;
        border-radius: 17px;
        border: 1px solid rgba(255, 255, 255, 0.32);
        pointer-events: none;
      }

      &:hover {
        box-shadow:
          0 18px 40px -24px rgba(45, 58, 49, 0.34),
          0 28px 60px -36px rgba(194, 123, 102, 0.2);

        .media {
          transform: scale(1.025);
        }
      }

      .media {
        display: block;
        width: 100%;
        height: auto;
        transform: scale(1);
        transition: transform 860ms cubic-bezier(0.22, 1, 0.36, 1);
      }

      .play-mark {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 2;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        background: rgba(249, 248, 244, 0.82);
        box-shadow:
          0 12px 28px -18px rgba(45, 58, 49, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.54);
        transform: translate3d(-50%, -50%, 0) scale(1);
        transition:
          background 360ms ease,
          transform 520ms cubic-bezier(0.22, 1, 0.36, 1);

        &::before {
          content: '';
          position: absolute;
          left: 1.27rem;
          top: 0.96rem;
          width: 0;
          height: 0;
          border-top: 0.64rem solid transparent;
          border-bottom: 0.64rem solid transparent;
          border-left: 0.95rem solid var(--accent-deep);
        }
      }

      &:hover,
      &:focus-visible {
        .play-mark {
          background: rgba(255, 255, 255, 0.92);
          transform: translate3d(-50%, -50%, 0) scale(1.08);
        }
      }
    }
  }
}

.viewer {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5.5rem 5rem;
  background:
    radial-gradient(circle at 50% 42%, rgba(249, 248, 244, 0.16), transparent 22rem),
    rgba(22, 25, 22, 0.74);
  backdrop-filter: blur(18px);
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 420ms ease,
    backdrop-filter 420ms ease;

  &--ready {
    opacity: 1;
    pointer-events: auto;
  }

  &--closing {
    pointer-events: none;
  }

  .viewer-stage {
    position: relative;
    display: flex;
    max-width: min(86vw, 1100px);
    max-height: 82vh;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 18px;
    box-shadow:
      0 30px 90px -36px rgba(0, 0, 0, 0.7),
      0 16px 38px -30px rgba(249, 248, 244, 0.28);
    transform-origin: top left;
    will-change: transform, opacity;
  }

  .viewer-media {
    display: block;
    max-width: 86vw;
    max-height: 82vh;
    width: auto;
    height: auto;
    object-fit: contain;
    background: rgba(0, 0, 0, 0.24);
  }
}

@media (max-width: 900px) {
  .gallery-page {
    width: 100%;
    gap: 2rem;

    .gallery-hero {
      align-items: stretch;
      padding-bottom: 1.1rem;

      .hero-title {
        font-size: 2.8rem;
      }
    }

    .media-wall {
      columns: 1;
      column-gap: 0;

      .media-reveal {
        margin-bottom: 1rem;
      }

      .media-card {
        border-radius: 16px;

        &::after {
          border-radius: 15px;
        }
      }
    }
  }

  .viewer {
    padding: 3.6rem 1rem;

    .viewer-stage,
    .viewer-media {
      max-width: 92vw;
      max-height: 78vh;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-page {
    .media-wall {
      .media-card,
      .media-card .media,
      .media-card .play-mark {
        transition: none;
      }
    }
  }

  .viewer,
  .viewer .viewer-stage {
    transition: none;
  }
}
</style>
