import firebase from 'firebase/app'

export default {
  state: {
    accountInfo: {}
  },
  mutations: {
    setAccountInfo(state, accountInfo) {
      state.accountInfo = accountInfo
    },
    clearAccountInfo(state) {
      state.accountInfo = {}
    }
  },
  actions: {
    async fetchAccountInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const dataSnapshot = await firebase.database()
          .ref(`/users/${uid}/accountInfo`)
          .once('value')
        const accountInfo = dataSnapshot.val()
        commit('setAccountInfo', accountInfo)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async updateAccountInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updatedInfo = { ...getters.accountInfo, ...toUpdate }
        await firebase.database().ref(`/users/${uid}/accountInfo`).update(updatedInfo)
        commit('setAccountInfo', updatedInfo)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  },
  getters: {
    accountInfo: state => state.accountInfo
  }
}
