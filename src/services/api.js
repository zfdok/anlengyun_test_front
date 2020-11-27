//跨域代理前缀
const API_PROXY_PREFIX = 'http://localhost:3000'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/user/login`,
  ROUTES: `${BASE_URL}/routes`,
  //headernotice
  HEADERNOTICE: `${BASE_URL}/headernotice`,
  READNOTICE: `${BASE_URL}/headernotice/readnotice`,
  GET_AD: `${BASE_URL}/headernotice/getad`,
  //onenet
  ONENET_GET_PROJECT_INFO: `${BASE_URL}/onenet/get_project_info`,
  ONENET_GET_USER_PROJECT_INFO: `${BASE_URL}/onenet/get_user_project_info`,
  ONENET_GET_USER_DEVICE_LIST_ZX: `${BASE_URL}/onenet/get_user_devicelist_zx`,
  ONENET_GET_USER_DEVICE_LIST_LY: `${BASE_URL}/onenet/get_user_devicelist_ly`,
}
