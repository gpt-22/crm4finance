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
    async signOut() {
      await firebase.auth().signOut()
    },
    async signUp({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/accountInfo`).set({ name })
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
