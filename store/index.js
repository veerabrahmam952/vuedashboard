import Vuex from 'vuex'
import axios from 'axios'
import DataStore from '~/store/modules/lob.js'
import TextStore from '~/store/modules/text.js'
import CommonStore from '~/store/modules/common.js'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      DataStore,
      TextStore,
      CommonStore
    },
    actions: {
      async nuxtServerInit ({ dispatch }) {
        const label = await axios.get('http://localhost:3001/')
        await dispatch('setAllText', label.data)
      }
    }
  })
}

export default createStore
