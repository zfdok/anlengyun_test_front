export default {
  namespaced: true,
  state: {
    selected: {},
  },
  getters: {
    get_selected: state => {
      return state.selected
    },
  },
  mutations: {
    set_selected(state, value) {
      state.selected = value
    },
  }
}
