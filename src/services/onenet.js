import { request, METHOD } from '@/utils/request'
import {
  ONENET_GET_PROJECT_INFO,
  ONENET_GET_USER_PROJECT_INFO,
  ONENET_GET_DEVICEDETAIL,
  ONENET_GET_DEVICE,
  ONENET_GET_USER_DEVICE_LIST,
} from '@/services/api'
import { ONENET_GET_DEVICE_HISTORY } from './api'


export async function onenet_get_project_info(params) {
  return request(ONENET_GET_PROJECT_INFO, METHOD.GET, params)
}

export async function onenet_get_user_project_info(params) {
  return request(ONENET_GET_USER_PROJECT_INFO, METHOD.GET, params)
}
export async function get_devicedetail(params) {
  return request(ONENET_GET_DEVICEDETAIL, METHOD.GET, params)
}
export async function get_device(params) {
  return request(ONENET_GET_DEVICE, METHOD.GET, params)
}


export async function get_user_devicelist(params) {
  return request(ONENET_GET_USER_DEVICE_LIST, METHOD.GET, params)
}

export async function get_device_history(params) {
  return request(ONENET_GET_DEVICE_HISTORY, METHOD.GET, params)
}

export default {
  onenet_get_project_info,
  onenet_get_user_project_info,
  get_devicedetail,
  get_device,
  get_user_devicelist,
  get_device_history,
}