import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/DashboardView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    alias: ['/', '/home'],
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'auth' },
    component: () => import('../views/LoginView')
  },
  {
    path: '/registration',
    name: 'Registration',
    meta: { layout: 'auth' },
    component: () => import('../views/RegistrationView')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: { layout: 'main' },
    component: () => import('../views/CategoriesView')
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'main' },
    component: () => import('../views/HistoryView')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: { layout: 'main' },
    component: () => import('../views/PlanningView')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main' },
    component: () => import('../views/ProfileView')
  },
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'main' },
    component: () => import('../views/RecordView')
  },
  {
    path: '/record-detail',
    name: 'Record-detail',
    meta: { layout: 'main' },
    component: () => import('../views/RecordDetailView')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
