export default {
  namespaced: true,
  state: {
    test: 1,
    dataSource: [
      {
        title: "智能保温箱",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
        all: 0, //
        all_device: [],//
        un_activation: 0,
        online: 0,//
        online_device: [], //
        offline: 0,//
        offline_device: [], //
        un_activation_device: [], //
        err: 0,
        error_device: [],
        offline_timespan: 600000,
      },
      {
        title: "冷链车",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
        all: 0, //
        all_device: [],//
        un_activation: 0,
        online: 0,//
        online_device: [], //
        offline: 0,//
        offline_device: [], //
        un_activation_device: [], //
        err: 0,
        error_device: [],
        offline_timespan: 600000,
      },
      {
        title: "智慧冷库",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
        all: 0, //
        all_device: [],//
        un_activation: 0,
        online: 0,//
        online_device: [], //
        offline: 0,//
        offline_device: [], //
        un_activation_device: [], //
        err: 0,
        error_device: [],
        offline_timespan: 600000,
      },
      {
        title: "冷藏集装箱",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
        all: 0, //
        all_device: [],//
        un_activation: 0,
        online: 0,//
        online_device: [], //
        offline: 0,//
        offline_device: [], //
        un_activation_device: [], //
        err: 0,
        error_device: [],
        offline_timespan: 600000,
      },
    ],
  },
  getters: {
    test: state => {
      return state.test
    },
    dataSource: state => {
      return state.dataSource
    },
  },
  mutations: {
    settest(state, value) {
      state.test = value
    },
    set_cysb(state, value) {
      for (let key in value.data) {
        state.dataSource[value.index][key] = value.data[key]
      }
    }
  }
}
