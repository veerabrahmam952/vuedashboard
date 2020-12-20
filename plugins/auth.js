import createStore from '../store/index.js'

export default function ({ $auth }) {
  if ($auth.loggedIn) {
    const _data = createStore.getters.getData
    // eslint-disable-next-line
    console.log(_data)
  }
}
