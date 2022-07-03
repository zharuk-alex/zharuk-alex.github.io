import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: false,
    children: [
      {
        path: '/readme/:id',
        component: import('@/views/ReadmeDialog.vue')
      },
    ]
  },
  {
    path: '/repos/:id',
    component: () => import('@/views/SingleRepo.vue')
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
