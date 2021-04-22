export default {
  namespaced: true,
  state: {
    test: 1,
    dataSource: [
      {
        title: "在线温湿度监测仪",
        avatar:
          "https://img.anlengyun.com/zxjcy.png",
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
        offline_timespan:600000,
      },
      {
        title: "蓝牙温湿度记录仪",
        avatar:
          "https://img.anlengyun.com/lyjcy.png",
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
        offline_timespan:600000,
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
    set_jcsb(state, value) {
      for (let key in value.data) {
        state.dataSource[value.index][key] = value.data[key]
      }
    }
  }
}
