import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({ dispatch, commit }, { categoryID, newRecordData }) {
      try {
        const uid = await dispatch('getUid')
        const path = `users/${uid}/categories/${categoryID}/records`
        const record = await firebase.database().ref(path)
          .push({ ...newRecordData })
        return { ...newRecordData, id: record.key }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
