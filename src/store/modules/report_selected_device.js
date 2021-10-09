export default {
  namespaced: true,
  state: {
    report_selected: {},
  },
  getters: {
    get_report_selected: state => {
      return state.report_selected
    },
  },
  mutations: {
    set_report_selected(state, value) {
      state.report_selected = value
    },
  }
}
