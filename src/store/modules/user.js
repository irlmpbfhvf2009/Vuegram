import { loginApi,getInfoApi,loginOutApi} from '@/api/admins'

const state = () => ({
  token: '', // 登入token
  info: {},  // 用户信息
})

// getters
const getters = {
  token(state) {
    return state.token
  }
}

// mutations
const mutations = {
  tokenChange(state, token) {
    state.token = token
  },
  infoChange(state, info) {
    state.info = info
  }
}

// actions
const actions = {
  // login by login.vue
  login({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      loginApi(params)
      .then(res => {
        commit('tokenChange', res.data.token)
        dispatch('getInfo', { token: res.data.token })
        .then(infoRes => {
          resolve(res.data.token)
        })
      })
    })
  },
  // get user info after user logined
  getInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      getInfoApi(params)
      .then(res => {
        commit('infoChange', res.data.info)
        resolve(res.data.info)
      })
    })
  },

  // login out the system after user click the loginOut button
  loginOut({ commit,getters }) {
    loginOutApi(getters)
    .then(res => {
      //{code: 200, data: {}, msg: 'success'}
    })
    .catch(error => {

    })
    .finally(() => {
      localStorage.removeItem('tabs')
      localStorage.removeItem('vuex')
      location.reload()
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}