import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
// 声明全局状态
const state = {
  // 路由前进和后退 forward:前进  reverse:后退
  direction: "", 
  token: null,
  count: 0,
  loading: false
}

// 异步方法
const actions = {
  "setDirect": ({commit}) => commit("setDirect"),
  "setToken": ({commit}) => commit("setToken"),
  "showLoading": ({commit}) => commit("showLoading")
}

// 改变状态的方法
const mutations = {
  setDirect (state, {direction}) {
    state.direction = direction;
  },
  setToken (state,token) {
    if (token) {
      state.token = token;
    } else {
      state.token = null;
    }
  },
  increment (state,amount) {
    state.count += amount
  },
  showLoading (state, status) {
    if (status) {
      state.loading = true;
    } else {
      state.loading = false;
    }
  }
}

const getters = {
  getLoading (state) {
    return state.loading;
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [createPersistedState()]
});
