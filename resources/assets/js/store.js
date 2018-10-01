import menu from "./menu.js";

export default {
  state: {
    currentUser: localStorage.getItem('user') || null,
    menuLeft: null,
    ldapAuth: JSON.parse(process.env.MIX_ADLDAP_AUTHENTICATION)
  },
  getters: {
    ldapAuth(state) {
      return state.ldapAuth
    },
    currentUser(state) {
      return JSON.parse(state.currentUser)
    },
    menuLeft(state) {
      if (state.currentUser) {
        return menu[JSON.parse(state.currentUser).roles[0].name]
      }
      return null
    }
  },
  mutations: {
    'logout': function (state) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('token_type')
      state.currentUser = null
      state.menuLeft = null
    },
    'login': function (state, data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("token_type", data.token_type);
      localStorage.setItem("user", JSON.stringify(data.user));
      state.currentUser = localStorage.getItem('user');
    }
  },
  actions: {
    logout(context) {
      context.commit('logout')
    }
  }
}