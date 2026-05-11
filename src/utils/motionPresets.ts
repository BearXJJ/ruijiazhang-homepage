const reducedMotion = Boolean(
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
)

const softEase = [0.22, 1, 0.36, 1] as const

function delayBy(index: number, step = 0.08): number {
  return reducedMotion ? 0 : Math.min(index * step, 0.64)
}

export const pageMotion = {
  initial: {
    opacity: 0,
    y: reducedMotion ? 0 : 18
  },
  animate: {
    opacity: 1,
    y: 0
  },
  transition: {
    duration: reducedMotion ? 0.01 : 0.72,
    ease: softEase
  }
}

export function revealMotion(index = 0, distance = 20) {
  return {
    initial: {
      opacity: 0,
      y: reducedMotion ? 0 : distance
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    inViewOptions: {
      once: true,
      amount: 0.18
    },
    transition: {
      duration: reducedMotion ? 0.01 : 0.76,
      delay: delayBy(index),
      ease: softEase
    }
  }
}
