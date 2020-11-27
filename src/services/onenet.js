import { request, METHOD } from '@/utils/request'
import {
  ONENET_GET_PROJECT_INFO,
  ONENET_GET_USER_PROJECT_INFO,
  ONENET_GET_USER_DEVICE_LIST_ZX,
  ONENET_GET_USER_DEVICE_LIST_LY,
} from '@/services/api'


export async function onenet_get_project_info(params) {
  return request(ONENET_GET_PROJECT_INFO, METHOD.GET, params)
}

export async function onenet_get_user_project_info(params) {
  return request(ONENET_GET_USER_PROJECT_INFO, METHOD.GET, params)
}
export async function get_user_devicelist_zx(params) {
  return request(ONENET_GET_USER_DEVICE_LIST_ZX, METHOD.GET, params)
}

export async function get_user_devicelist_ly(params) {
  return request(ONENET_GET_USER_DEVICE_LIST_LY, METHOD.GET, params)
}


export default {
  onenet_get_project_info,
  onenet_get_user_project_info,
  get_user_devicelist_zx,
  get_user_devicelist_ly,
}