import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth'
import accountInfo from '@/store/accountInfo'
import categories from '@/store/categories'
import records from '@/store/records'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: state => state.error
  },
  actions: {
    async fetchCurrencies({ getters }, queries) {
      const baseURL = 'https://free.currconv.com/api/v7/convert'
      const apiKey = process.env.VUE_APP_currconv_apiKey
      const getURL = `${baseURL}?apiKey=${apiKey}&q=${queries}`
      return await fetch(getURL)
        .then(r => r.json())
        .then(r => r.results)
    }
  },
  modules: {
    auth,
    accountInfo,
    categories,
    records
  }
})
