import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import AboutView from '../components/AboutView.vue'
import ThreeDView from '../components/ThreeDView.vue'
import IllustrationView from '../components/IllustrationView.vue'
import GraphicView from '../components/GraphicView.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/graphic', name: 'graphic', component: GraphicView },
  { path: '/illustration', name: 'illustration', component: IllustrationView },
  { path: '/3d', name: '3d', component: ThreeDView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
