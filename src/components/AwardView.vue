<template>
  <section class="award-page" v-motion="pageMotion">
    <header class="award-hero" v-motion="revealMotion(0, 16)">
      <div>
        <div class="eyebrow">AWARD</div>
        <div class="hero-title"><em>Honors in Music</em></div>
      </div>
    </header>

    <section class="award-list">
      <article v-for="(award, index) in awards" :key="award.key" v-motion="revealMotion(index + 1, 18)" class="entry">
        <span class="year">{{ award.year }}</span>
        <div class="body">
          <div class="meta">{{ award.result }}</div>
          <div class="entry-title">{{ award.title }}</div>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup lang="ts">
import { pageMotion, revealMotion } from '../utils/motionPresets'
import { awardsContent } from '../content/siteContent'

const awards = awardsContent.awards
</script>

<style lang="less" scoped>
.award-page {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 90%;
  margin: 0 auto;
  padding-top: 1rem;

  .award-hero {
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

  .award-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .entry {
      position: relative;
      display: flex;
      gap: 1.25rem;
      padding: 1.8rem 0;
      border-bottom: 1px solid rgba(230, 226, 218, 0.88);
      transition:
        padding-left 420ms ease,
        border-color 420ms ease;

      &::before {
        content: '';
        position: absolute;
        left: 120px;
        top: 1.95rem;
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 50%;
        background: var(--accent-deep);
        opacity: 0;
        transform: translateX(-1.2rem);
        transition:
          opacity 360ms ease,
          transform 420ms ease;
      }

      &:hover {
        padding-left: 0.45rem;
        border-color: rgba(194, 123, 102, 0.3);

        &::before {
          opacity: 1;
          transform: translateX(-0.75rem);
        }
      }

      .year {
        flex: 0 0 120px;
        color: var(--accent);
        font-size: 0.78rem;
        font-weight: 500;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .body {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
        gap: 0.55rem;
        min-width: 0;

        .entry-title {
          margin: 0;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 1.55rem;
          font-weight: 400;
          line-height: 1.28;
        }
      }

      .meta {
        margin: 0;
        color: var(--accent-deep);
        font-family: var(--font-display);
        font-size: 2.08rem;
        font-weight: 500;
        line-height: 1.08;
        letter-spacing: 0;
      }
    }
  }
}

@media (max-width: 900px) {
  .award-page {
    width: 100%;
    gap: 2rem;

    .award-hero {
      align-items: stretch;
      padding-bottom: 1.1rem;

      .hero-title {
        font-size: 2.8rem;
      }
    }

    .award-list {
      .entry {
        flex-direction: column;
        gap: 0.55rem;
        padding: 1.35rem 0;

        &::before {
          display: none;
        }

        &:hover {
          padding-left: 0;
        }

        .year {
          flex-basis: auto;
          font-size: 0.72rem;
        }

        .body {
          .entry-title {
            font-size: 1.2rem;
            line-height: 1.34;
          }
        }

        .meta {
          font-size: 1.65rem;
        }
      }
    }
  }
}
</style>
