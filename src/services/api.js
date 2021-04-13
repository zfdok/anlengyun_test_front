//跨域代理前缀
const API_PROXY_PREFIX = 'https://anlengyun.com:3000'
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
  ONENET_GET_DEVICE_LATEST: `${BASE_URL}/onenet/get_device_latest`,
  ONENET_GET_DEVICE: `${BASE_URL}/onenet/get_device`,
  ONENET_GET_USER_DEVICE_LIST: `${BASE_URL}/onenet/get_user_devicelist`,
  ONENET_GET_DEVICE_HISTORY: `${BASE_URL}/onenet/get_device_history`,
}