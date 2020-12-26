import axios from "axios";

const mutations = {
  SET_USER: "setUser",
  SWITCH_USER_PROFILE: "switchUserProfile"
};

const actions = {
  REGISTER_USER: "registerUser",
  LOGIN: "login",
  LOGOUT: "logout",
  FETCH_SESSION: "fetchSession",
  INIT: "init",
  SWITCH_USER_PROFILE: "switchUserProfile"
};

const account = {
  namespaced: true,
  state: () => ({
    user: null,
    userProfile: "student"
  }),
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user;
    },
    [mutations.SWITCH_USER_PROFILE](state, profile) {
      state.userProfile = profile;
    }
  },
  actions: {
    async [actions.INIT]({ commit, dispatch }) {
      await dispatch(actions.FETCH_SESSION);

      commit(mutations.SWITCH_USER_PROFILE, localStorage.getItem("userProfile"))
    },
    async [actions.REGISTER_USER](store, user) {
      return axios.post("/account/register", { user });
    },
    async [actions.LOGIN]({ commit }, credentials) {
      const user = await axios.post("/account/session", credentials);

      commit(mutations.SET_USER, user.data);
    },
    async [actions.LOGOUT]({ commit }) {
      await axios.delete("/account/session");

      commit(mutations.SET_USER, null);
    },
    async [actions.FETCH_SESSION]({ commit }) {
      const user = await axios.get("/account/session");

      commit(mutations.SET_USER, user.data);
    },
    [actions.SWITCH_USER_PROFILE]({ state, commit }) {
      const newProfile =
        state.userProfile === "lecturer" ? "student" : "lecturer";

      localStorage.setItem("userProfile", newProfile);
      commit(mutations.SWITCH_USER_PROFILE, newProfile);
    }
  }
};

export default account;
