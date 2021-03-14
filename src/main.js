import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'materialize-css/dist/js/materialize.min'
import toastMessagePlugin from './utils/toastMessage.plugin'

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

  Vue.use(toastMessagePlugin)

  app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
