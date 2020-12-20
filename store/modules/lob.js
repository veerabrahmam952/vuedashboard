export const state = () => ({
  LOBs: [{
    LinesId: '',
    LinesDesc: '',
    GeographyId: '',
    GeograpghyDesc: '',
    BureauId: '',
    BureauDesc: '',
    LOBId: '',
    LOBDesc: ''
  }]
})

export const getters = {
  getData (state) {
    return state.Data
  }
}

export const mutations = {
  setData (state, payLoad) {
    state.Data = payLoad
  }
}

export const actions = {
  setData ({ commit }, payLoad) {
    commit('setData', payLoad)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
