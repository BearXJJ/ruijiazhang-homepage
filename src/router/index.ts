import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import AboutView from '../components/AboutView.vue'
import AwardView from '../components/AwardView.vue'
import GalleryView from '../components/GalleryView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/award',
    name: 'award',
    component: AwardView
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: GalleryView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
