import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/DashboardView.vue'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-in',
    name: 'SignIn',
    meta: { layout: 'auth' },
    component: () => import('../views/SignInView')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    meta: { layout: 'auth' },
    component: () => import('../views/SignUpView')
  },
  {
    path: '/dashboard',
    alias: ['/', '/home'],
    name: 'Dashboard',
    meta: { layout: 'main', auth: true },
    component: Dashboard
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/CategoriesView')
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/HistoryView')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/PlanningView')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/ProfileView')
  },
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/RecordView')
  },
  {
    path: '/record-detail/:category_id/:id',
    name: 'Record-detail',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/RecordDetailView')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(rout => rout.meta.auth)

  if (requireAuth && !currentUser) {
    next('/sign-in?message=sign-in')
  } else next()
})

export default router
