const history = {
  state: {
    // 访问历史记录
    history: [],
  },
  mutations: {
    SET_IHSTORY(state, history) {
      state.history = history;
    },
    EMPTY_IHSTORY(state) {
      state.history = [];
    }
  },
}
export default history