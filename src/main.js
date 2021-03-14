import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import toastMessagePlugin from './utils/toastMessage.plugin'

Vue.config.productionTip = false

Vue.use(toastMessagePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
