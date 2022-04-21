import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SingleRepo from '@/views/SingleRepo.vue'
import ReadmeDialog from '@/views/ReadmeDialog.vue'

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
        component: ReadmeDialog
      },
    ]
  },
  { 
    path: '/repos/:id',
    component: SingleRepo
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
