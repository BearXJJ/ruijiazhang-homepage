<template>
  <section class="screen" v-motion="pageMotion">
    <section class="copy">
      <div class="top">
        <div class="eyebrow" v-motion="revealMotion(0, 16)">Soprano Portfolio</div>
        <div class="mark" v-motion="revealMotion(1, 16)">Opera, recital, performance.</div>
      </div>

      <div class="middle">
        <div class="hero-name" v-motion="revealMotion(2, 28)">{{ profile.name }}</div>
        <div class="hero-headline" v-motion="revealMotion(3, 24)">{{ profile.headline }}</div>
        <div class="lead" v-motion="revealMotion(4, 24)">{{ profile.intro }}</div>
      </div>

      <div class="bottom" v-motion="revealMotion(5, 18)">
        <div class="meta">
          <span>{{ profile.location }}</span>
          <span>Soprano</span>
          <a v-if="profile.email" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </div>
      </div>
    </section>

    <aside class="photo-side" v-motion="revealMotion(1, 32)">
      <figure class="photo">
        <img :src="profile.homeImagePath" alt="Ruijia Zhang portrait" />
      </figure>
    </aside>
  </section>

  <section class="mobile-home" v-motion="pageMotion" aria-label="Home introduction">
    <div class="mobile-copy" v-motion="revealMotion(0, 22)">
      <div class="mobile-kicker">Soprano Portfolio</div>
      <h1>{{ profile.name }}</h1>
      <p class="mobile-line">Opera, recital and performance</p>
    </div>

    <figure class="mobile-photo" v-motion="revealMotion(1, 28)">
      <img :src="profile.homeImagePath" alt="Ruijia Zhang portrait" />
    </figure>

    <div class="mobile-text" v-motion="revealMotion(2, 24)">
      <p class="mobile-intro">{{ profile.intro }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pageMotion, revealMotion } from '../utils/motionPresets'
import { siteContent } from '../content/siteContent'

const profile = siteContent.profile
</script>

<style lang="less" scoped>
.screen {
  flex: 1;
  min-height: 0;
  display: flex;
  gap: 3.4rem;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  padding: 0.8rem 3rem 1.2rem;

  .copy,
  .photo-side {
    flex: 1 1 0;
    min-height: 0;
  }

  .copy {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.8rem 0 1.3rem;
    z-index: 1;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 18%;
      width: 24rem;
      height: 24rem;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(140, 154, 132, 0.14), transparent 72%);
      z-index: 0;
      pointer-events: none;
      transition:
        transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 700ms ease;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -4rem;
      left: -4rem;
      width: 18rem;
      height: 12rem;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(194, 123, 102, 0.12), transparent 74%);
      z-index: 0;
      pointer-events: none;
      transition:
        transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 700ms ease;
    }

    .top,
    .middle,
    .bottom {
      position: relative;
      z-index: 1;
    }

    .top {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .middle,
    .bottom {
      transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .hero-name {
      position: relative;
      z-index: 1;
      max-width: 9ch;
      margin: 0.4rem 0 0;
      font-family: var(--font-display);
      font-size: 6.6rem;
      line-height: 0.9;
      letter-spacing: -0.03em;
      transition:
        transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
        color 400ms ease;
    }

    .hero-headline {
      position: relative;
      z-index: 1;
      max-width: 33rem;
      margin: 1.4rem 0 0;
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 1.58rem;
      line-height: 1.58;
      transition:
        transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
        color 400ms ease;
    }

    .mark {
      margin: 0;
      color: var(--accent);
      font-size: 0.84rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      transition:
        color 400ms ease,
        letter-spacing 500ms ease;
    }

    .lead {
      max-width: 42rem;
      margin: 1.55rem 0 0;
      color: var(--text-secondary);
      font-size: 1.16rem;
      line-height: 1.95;
      transition:
        transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
        color 400ms ease;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem 1rem;
      color: var(--text-secondary);
      font-size: 0.98rem;
      transition:
        transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
        color 400ms ease;

      a {
        color: var(--accent-deep);
        transition:
          color 300ms ease,
          opacity 300ms ease;

        &:hover,
        &:focus-visible {
          opacity: 0.78;
        }
      }
    }
  }

  .photo-side {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.6rem 0;
    z-index: 2;

    &::before {
      content: '';
      position: absolute;
      right: 1.5rem;
      top: 50%;
      width: 22rem;
      height: 22rem;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(140, 154, 132, 0.16), transparent 68%);
      transform: translateY(-50%);
      pointer-events: none;
      z-index: 0;
    }

    .photo {
      position: relative;
      width: min(100%, 50rem);
      aspect-ratio: 14 / 10;
      margin: 0;
      overflow: hidden;
      border-radius: 32px;
      border: 1px solid rgba(230, 226, 218, 0.96);
      background:
        radial-gradient(circle at 20% 18%, rgba(255, 255, 255, 0.46), transparent 24%),
        linear-gradient(180deg, rgba(249, 248, 244, 0.42), rgba(242, 240, 235, 0.18));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
      z-index: 1;

      &::after {
        content: '';
        position: absolute;
        inset: auto 0 0;
        height: 34%;
        background: linear-gradient(180deg, rgba(249, 248, 244, 0), rgba(249, 248, 244, 0.38));
        pointer-events: none;
      }

      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center 32%;
        filter: saturate(0.94) contrast(1.02);
        transition:
          transform 1200ms cubic-bezier(0.22, 1, 0.36, 1),
          filter 500ms ease;
      }
    }
  }
}

.mobile-home {
  display: none;
}

@media (hover: hover) {
  .screen {
    .copy {
      &:hover,
      &:focus-within {
        &::before {
          opacity: 0.92;
          transform: translate3d(0, -10px, 0) scale(1.04);
        }

        &::after {
          opacity: 0.86;
          transform: translate3d(8px, 8px, 0) scale(1.04);
        }

        .top {
          transform: translateY(-2px);
        }

        .middle {
          transform: translateY(-5px);
        }

        .bottom {
          transform: translateY(-3px);
        }

        .mark {
          color: var(--accent-deep);
          letter-spacing: 0.18em;
        }

        .hero-name {
          color: rgba(45, 58, 49, 0.96);
          transform: translateY(-3px);
        }

        .hero-headline {
          color: rgba(45, 58, 49, 0.92);
          transform: translateY(-2px);
        }

        .lead {
          color: rgba(45, 58, 49, 0.9);
          transform: translateY(-1px);
        }

        .meta {
          color: rgba(91, 103, 94, 0.96);
          transform: translateY(-1px);
        }
      }
    }

    .photo-side {
      .photo {
        &:hover,
        &:focus-within {
          img {
            transform: scale(1.03);
            filter: saturate(0.98) contrast(1.04);
          }
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .screen {
    display: none;
  }

  .mobile-home {
    display: flex;
    min-height: calc(100svh - var(--topbar-offset) - 5rem);
    flex-direction: column;
    justify-content: flex-start;
    gap: 1.25rem;
    padding: 2rem 0 0;

    .mobile-copy {
      display: flex;
      flex-direction: column;
      gap: 0.52rem;
    }

    .mobile-kicker {
      color: var(--accent);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      color: var(--text-primary);
      font-family: var(--font-display);
      font-size: 3.65rem;
      font-weight: 600;
      line-height: 0.92;
    }

    .mobile-line {
      max-width: 18rem;
      margin: 0.12rem 0 0;
      color: var(--accent-deep);
      font-family: var(--font-display);
      font-size: 1.02rem;
      font-weight: 600;
      line-height: 1.3;
    }

    .mobile-photo {
      align-self: center;
      width: 90vw;
      margin: 0.2rem 0 0.05rem;
      overflow: hidden;
      border-radius: 22px;
      border: 1px solid rgba(230, 226, 218, 0.96);
      background: rgba(255, 255, 255, 0.36);
      box-shadow:
        0 20px 40px -30px rgba(45, 58, 49, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.42);

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 18%;
      }
    }

    .mobile-text {
      display: flex;
      flex-direction: column;
      gap: 0.72rem;
      padding-top: 0.1rem;
    }

    .mobile-intro {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.96rem;
      line-height: 1.7;
    }
  }
}
</style>
