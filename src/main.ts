import { createApp } from 'vue'
import App from './App.vue'
import Lenis from 'lenis'
import { MotionPlugin } from 'motion-v'
import router from './router'
import './assets/styles/global.less'
import 'lenis/dist/lenis.css'

document.documentElement.classList.add('scrollbar-hidden')
document.body.classList.add('scrollbar-hidden')

const lenis = new Lenis({
  autoRaf: true,
  lerp: 0.075,
  wheelMultiplier: 0.85
})

router.afterEach(() => {
  lenis.scrollTo(0, { immediate: true })
})

createApp(App).use(router).use(MotionPlugin).mount('#app')
