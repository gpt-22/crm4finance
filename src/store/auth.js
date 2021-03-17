import firebase from 'firebase/app'

export default {
  actions: {
    async signIn({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async signOut({ commit }) {
      await firebase.auth().signOut()
      commit('clearAccountInfo')
    },
    async signUp({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`/users/${uid}/accountInfo`)
          .set({ name, money: 10000 })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}
