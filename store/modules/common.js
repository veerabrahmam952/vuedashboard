export const state = () => ({
  storeInitialized: Boolean(false),
  storeKey: String('')
})

export const getters = {
  isStoreInitialized (state) {
    return state.storeInitialized
  },
  getCurrentStoreKey (state) {
    return state.storeKey
  }
}

export const mutations = {
  initializeStore (state, payLoad) {
    state.storeInitialized = payLoad
  },
  setCurrentStoreKey (state, payLoad) {
    state.storeKey = payLoad
  }
}

export const actions = {
  initializeStore ({ commit }, payLoad) {
    commit('initializeStore', payLoad)
  },
  setCurrentStoreKey ({ commit }, payLoad) {
    commit('setCurrentStoreKey', payLoad)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
