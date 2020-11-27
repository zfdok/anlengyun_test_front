export default {
  namespaced: true,
  state: {
    test: 1,
    dataSource: [
      {
        title: "在线温湿度监测仪",
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
        offline_timespan:600000,
      },
      {
        title: "蓝牙温湿度记录仪",
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
        offline_timespan:600000,
      },
    ],
    zx_device: {
      all: 0,
      online: 0,
      un_activation: 0,
      online_device: [],
      un_activation_device: [],
      device: [],
      error: []
    }
  },
  getters: {
    test: state => {
      return state.test
    },
    dataSource: state => {
      return state.dataSource
    },
    zx_device: state => {
      return state.zx_device
    }
  },
  mutations: {
    settest(state, value) {
      state.test = value
    },
    set_zx(state, value) {
      for (let key in value) {
        state.dataSource[0][key] = value[key]
      }
    },
    set_ly(state, value) {
      for (let key in value) {
        state.dataSource[1][key] = value[key]
      }
    }
  }
}
