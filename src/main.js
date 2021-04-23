import Vue from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import './theme/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import '@/mock'
import store from './store'
import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import { initI18n } from '@/utils/i18n'
import bootstrap from '@/bootstrap'
import Axios from 'axios'
// import AmapVue from '@amap/amap-vue'
import echarts from 'echarts'

// AmapVue.config.key = 'f705f0bad2d7aa04a7cd954b754223ea'

const router = initRouter(store.state.setting.asyncRoutes)
const i18n = initI18n('CN', 'US')

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = Axios

Vue.use(Antd)
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Plugins)
// Vue.use(AmapVue);


bootstrap({ router, store, i18n, message: Vue.prototype.$message ,notification: Vue.prototype.$notification})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
