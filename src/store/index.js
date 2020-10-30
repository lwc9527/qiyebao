import Vue from "vue";
import Vuex from "vuex";
import storage from "@c/lib/util/storage";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // header,
  },
  state: {
    // 访问历史记录
    history: [],
    token:window.localStorage.getItem("token")||""
  },
  mutations: {
    SET_HISTORY(state, history) {
      state.history = history;
    },
    EMPTY_IHSTORY(state) {
      state.history = [];
    },
    
    set_token(state, token) {
      state.token = token;
      window.localStorage.setItem("token",token);
    },
  },
  actions: {}
});