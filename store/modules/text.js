export const state = () => ({
  Text: { }
})

export const getters = {
  getAllText (state) {
    return state.Text
  },
  getSpecificText (state, payLoad) {
    return state.Text[payLoad]
  }
}

export const mutations = {
  setAllText (state, payLoad) {
    state.Text = payLoad
  }
}

export const actions = {
  setAllText ({ commit }, payLoad) {
    commit('setAllText', payLoad)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
