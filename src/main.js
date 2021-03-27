import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'

import AppPreloader from '@/components/AppPreloader'
import AppPagination from '@/components/AppPagination'

import localizeFilter from './filters/localize.filter'
import formatDatetimeFilter from './filters/format-datetime.filter'

import tooltipDirective from './directives/tooltip.directive'

import toastMessagePlugin from './utils/toastMessage.plugin'
import appTitlePlugin from './utils/appTitle.plugin'

import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import 'chart.js/dist/Chart.bundle.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Your web app's Firebase configuration from .env.local
const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  // this method can be called several times so prevent new app creation
  if (app) return

  Vue.config.productionTip = false

  // components
  Vue.component('Preloader', AppPreloader)
  Vue.component('Pagination', AppPagination)

  // filters
  Vue.filter('localize', localizeFilter)
  Vue.filter('datetime', formatDatetimeFilter)

  // directives
  Vue.directive('tooltip', tooltipDirective)

  // plugins
  Vue.use(VueMeta)
  Vue.use(appTitlePlugin)
  Vue.use(toastMessagePlugin)

  app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
