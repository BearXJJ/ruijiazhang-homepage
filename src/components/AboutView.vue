<template>
  <section class="about-page" v-motion="pageMotion">
    <header class="about-hero" v-motion="revealMotion(0, 16)">
      <div>
        <div class="eyebrow">ABOUT</div>
        <div class="hero-title"><em>A Life in Voice</em></div>
      </div>
    </header>

    <section class="about-note">
      <div class="note-copy">
        <div class="eyebrow section-label" v-motion="revealMotion(1, 14)">PROFILE</div>

        <article class="about-story">
          <p
            v-for="(paragraph, index) in paragraphs"
            :key="paragraph.key"
            :class="{ closing: index === paragraphs.length - 1 }"
            v-motion="revealMotion(index + 2, 18)"
            v-html="paragraph.html"></p>
        </article>
      </div>

      <aside class="about-side">
        <figure class="note-photo" v-motion="revealMotion(2, 18)">
          <img :src="aboutImagePath" alt="Ruijia Zhang profile image" />
        </figure>

        <section class="timeline-wrap">
          <div class="eyebrow section-label" v-motion="revealMotion(3, 14)">EDUCATION & TRAINING</div>
          <div class="timeline">
            <article v-for="(entry, index) in educationTimeline" :key="entry.key" v-motion="revealMotion(index + 4, 14)" class="entry">
              <span class="period">{{ entry.time }}</span>
              <span class="marker" aria-hidden="true"></span>
              <div class="entry-copy">
                <div class="school-row">
                  <span :class="['school-logo-frame', `school-logo-frame--${entry.logoShape}`]">
                    <img v-if="entry.logoPath" :src="entry.logoPath" :alt="`${entry.school} logo`" class="school-logo" />
                  </span>
                  <div class="school">{{ entry.school }}</div>
                </div>
                <div class="major">{{ entry.major }}</div>
              </div>
            </article>
          </div>
        </section>
      </aside>
    </section>
  </section>
</template>

<script setup lang="ts">
import { pageMotion, revealMotion } from '../utils/motionPresets'
import { aboutContent } from '../content/siteContent'

const { paragraphs, aboutImagePath, educationTimeline } = aboutContent
</script>

<style lang="less" scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
  width: 90%;
  margin: 0 auto;
  padding-top: 1rem;

  .about-hero {
    display: flex;
    gap: 2rem;
    align-items: end;
    justify-content: space-between;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(230, 226, 218, 0.92);

    > div:first-child {
      flex: 1.1 1 0;
      min-width: 0;
    }

    .hero-title {
      max-width: 15ch;
      margin: 0.65rem 0 0;
      font-family: var(--font-display);
      font-size: 4.8rem;
      line-height: 0.95;
      letter-spacing: -0.03em;
    }
  }

  .section-label {
    position: relative;
    width: fit-content;
    padding-bottom: 0.34rem;
    color: var(--accent);
    font-family: var(--font-display);
    font-size: 1.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 1;

    &::before {
      display: none;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0.02rem;
      bottom: 0;
      width: 3.4rem;
      height: 1px;
      border-radius: 999px;
      background: rgba(140, 154, 132, 0.42);
    }
  }

  .about-note {
    display: flex;
    flex-direction: row;
    gap: 1.8rem 4rem;
    align-items: start;
    padding-top: 1.6rem;

    .note-copy {
      display: flex;
      flex: 1 1 0;
      flex-direction: column;
      gap: 1.35rem;
      min-width: 0;

      .about-story {
        display: flex;
        flex-direction: column;
        gap: 1.1rem;

        p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 1.2rem;
          line-height: 1.9;
        }

        .closing {
          margin-top: 0.3rem;
        }

        :deep(.highlight) {
          color: var(--accent-deep);
          font-weight: 700;
          text-decoration-line: underline;
          text-decoration-color: rgba(194, 123, 102, 0.24);
          text-decoration-thickness: 0.42em;
          text-underline-offset: -0.18em;
          text-decoration-skip-ink: none;
        }
      }
    }

    .about-side {
      display: flex;
      flex: 0 0 30%;
      flex-direction: column;
      gap: 2.1rem;
      align-items: stretch;
      min-width: 18rem;

      .note-photo {
        width: 100%;
        margin: 0;
        aspect-ratio: 16 / 10;
        overflow: hidden;
        border-radius: 18px;
        box-shadow: 0 16px 34px -26px rgba(45, 58, 49, 0.28);

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
      }

      .timeline-wrap {
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 1.2rem;
        padding-top: 0;

        .timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-top: 1rem;

          &::before {
            content: '';
            position: absolute;
            left: 0.35rem;
            top: 0.2rem;
            bottom: 0.6rem;
            width: 1px;
            background: linear-gradient(180deg, rgba(140, 154, 132, 0.18), rgba(140, 154, 132, 0.5));
          }

          .entry {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            padding: 0 0 1.45rem 1.75rem;

            .period {
              display: inline-flex;
              width: auto;
              min-height: auto;
              padding-top: 0;
              color: var(--accent);
              text-transform: uppercase;
              letter-spacing: 0.14em;
              font-size: 0.68rem;
              font-weight: 600;
              line-height: 1.6;
            }

            .marker {
              position: absolute;
              top: 0.88rem;
              left: 0;
              display: flex;
              width: 0.7rem;
              min-height: 0;
              align-items: center;
              justify-content: center;

              &::before {
                content: '';
                position: relative;
                width: 0.7rem;
                height: 0.7rem;
                border-radius: 50%;
                background: var(--accent);
                box-shadow: 0 0 0 0.3rem rgba(249, 248, 244, 0.96);
              }
            }

            .entry-copy {
              display: flex;
              flex-direction: column;
              gap: 0.35rem;
              min-width: 0;
              padding-top: 0;

              .school-row {
                display: flex;
                min-width: 0;
                min-height: 2.45rem;
                align-items: center;
                gap: 0.7rem;

                .school-logo-frame {
                  display: inline-flex;
                  width: 2.45rem;
                  height: 2.45rem;
                  flex: 0 0 auto;
                  align-items: center;
                  justify-content: center;
                  border-radius: 999px;
                  background: rgba(255, 255, 255, 0.72);
                  border: 1px solid rgba(230, 226, 218, 0.92);

                  .school-logo {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    padding: 0.24rem;
                  }

                  &--wide {
                    width: 4.85rem;
                    border-radius: 10px;

                    .school-logo {
                      padding: 0.28rem 0.38rem;
                    }
                  }
                }

                .school {
                  margin: 0;
                  font-family: var(--font-display);
                  font-size: 1.32rem;
                  line-height: 1.18;
                }
              }

              .major {
                margin: 0;
                color: var(--text-secondary);
                font-size: 0.98rem;
                line-height: 1.65;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .about-page {
    width: 100%;
    gap: 2rem;

    .about-hero {
      flex-direction: column;
      align-items: stretch;
      padding-bottom: 1.1rem;

      .hero-title {
        font-size: 2.8rem;
      }
    }
    .section-label {
      font-size: 1.42rem;
    }
    .about-note {
      flex-direction: column;
      align-items: start;
      gap: 2rem;
      padding-top: 0.5rem;

      .note-copy {
        .about-story {
          p {
            font-size: 1rem;
            line-height: 1.82;
          }
        }
      }

      .about-side {
        width: 100%;
        min-width: 0;
        gap: 1.7rem;

        .note-photo {
          aspect-ratio: 4 / 3;
        }

        .timeline-wrap {
          .timeline {
            .entry {
              padding-left: 1.45rem;

              .entry-copy {
                .school-row {
                  align-items: flex-start;
                  gap: 0.62rem;

                  .school-logo-frame {
                    width: 2.3rem;
                    height: 2.3rem;

                    &--wide {
                      width: 4.15rem;
                    }
                  }

                  .school {
                    font-size: 1.14rem;
                  }
                }

                .major {
                  font-size: 0.92rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
