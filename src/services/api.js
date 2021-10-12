//跨域代理前缀
// const API_PROXY_PREFIX = 'http://localhost:3000'
const API_PROXY_PREFIX = 'https://anlengyun.com:3000'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/user/login`,
  ROUTES: `${BASE_URL}/routes`,
  //headernotice
  HEADERNOTICE: `${BASE_URL}/headernotice`,
  READNOTICE: `${BASE_URL}/headernotice/readnotice`,
  FIRSTSHOW_READED: `${BASE_URL}/headernotice/firstshow_readed`,
  //onenet
  ONENET_GET_PROJECT_INFO: `${BASE_URL}/onenet/get_project_info`,
  ONENET_GET_USER_PROJECT_INFO: `${BASE_URL}/onenet/get_user_project_info`,
  ONENET_GET_DEVICE_LATEST: `${BASE_URL}/onenet/get_device_latest`,
  ONENET_GET_DEVICE_LATEST_LBS: `${BASE_URL}/onenet/get_device_latest_lbs`,
  ONENET_GET_DEVICE: `${BASE_URL}/onenet/get_device`,
  ONENET_GET_USER_DEVICE_LIST: `${BASE_URL}/onenet/get_user_devicelist`,
  ONENET_GET_USER_DEVICE_LIST_BY_TYPE: `${BASE_URL}/onenet/get_user_devicelist_by_type`,
  ONENET_GET_DEVICE_HISTORY: `${BASE_URL}/onenet/get_device_history`,
  ONENET_GET_DEVICE_DESIRED: `${BASE_URL}/onenet/get_device_desired`,
  ONENET_SET_DEVICE_NAME: `${BASE_URL}/onenet/set_device_name`,
  ONENET_SET_DEVICE_DESIRED: `${BASE_URL}/onenet/set_device_desired`,
  //Report
  HISTORY_GET_DEVICE_HISTORY_LIST: `${BASE_URL}/history/get_device_history_list`,
  REPORT_GEN_REPORT: `${BASE_URL}/history/gen_report`,
  REPORT_GET_REPORT: `${BASE_URL}/history/get_report`,
  REPORT_SET_RECINFO: `${BASE_URL}/history/set_rec_info`,
  //History
  HISTORY_GET_DEVICE_HISTORY: `${BASE_URL}/history/get_device_history`,
}