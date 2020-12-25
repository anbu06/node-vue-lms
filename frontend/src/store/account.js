import axios from 'axios'

const mutations = {
  SET_USER: 'setUser',
  SET_USER_PROFILE_TYPE: 'setUserProfileType'
}

const actions = {
  REGISTER_USER: 'registerUser',
  LOGIN: 'login',
  LOGOUT: 'logout',
  FETCH_SESSION: 'fetchSession',
  INIT: 'init',
  CHANGE_USER_PROFILE_TYPE: 'changeUserProfileType'
}

const account = {
  namespaced: true,
  state: () => ({
    user: null,
    userProfileType: 'student'
  }),
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user
    },
    [mutations.SET_USER_PROFILE_TYPE](state, type) {
      state.userProfileType = type
    }
  },
  actions: {
    async [actions.INIT]({ commit, dispatch }) {
      await dispatch(actions.FETCH_SESSION)

      commit(mutations.SET_USER_PROFILE_TYPE, localStorage.getItem('userProfileType'))
    },
    async [actions.REGISTER_USER](store, user) {
      return axios.post('/account/register', { user })
    },
    async [actions.LOGIN]({ commit }, credentials) {
      const user = await axios.post('/account/login', credentials)

      commit(mutations.SET_USER, user.data)
    },
    async [actions.LOGOUT]({ commit }) {
      await axios.delete('/account/logout')

      commit(mutations.SET_USER, null)
    },
    async [actions.FETCH_SESSION]({ commit }) {
      const user = await axios.get('/account/session')

      commit(mutations.SET_USER, user.data)
    },
    [actions.CHANGE_USER_PROFILE_TYPE]({ state, commit }) {
      let type = state.userProfileType == 'student' ? 'lecturer' : 'student'

      localStorage.setItem('userProfileType', type)

      commit(mutations.SET_USER_PROFILE_TYPE, type)
    }
  }
}

export default account
