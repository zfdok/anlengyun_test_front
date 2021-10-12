import { request, METHOD } from '@/utils/request'
import {
  ONENET_GET_PROJECT_INFO,
  ONENET_GET_USER_PROJECT_INFO,
  ONENET_GET_DEVICE_LATEST,
  ONENET_GET_DEVICE_LATEST_LBS,
  ONENET_GET_DEVICE,
  ONENET_GET_USER_DEVICE_LIST,
  ONENET_GET_USER_DEVICE_LIST_BY_TYPE,
  ONENET_GET_DEVICE_DESIRED,
  ONENET_SET_DEVICE_NAME,
  ONENET_GET_DEVICE_HISTORY,
  ONENET_SET_DEVICE_DESIRED,
} from '@/services/api'
// import {  } from './api'


export async function onenet_get_project_info(params) {
  return request(ONENET_GET_PROJECT_INFO, METHOD.GET, params)
}

export async function onenet_get_user_project_info(params) {
  return request(ONENET_GET_USER_PROJECT_INFO, METHOD.GET, params)
}
export async function get_device_latest(params) {
  return request(ONENET_GET_DEVICE_LATEST, METHOD.GET, params)
}

export async function get_device_latest_lbs(params) {
  return request(ONENET_GET_DEVICE_LATEST_LBS, METHOD.GET, params)
}

export async function get_device(params) {
  return request(ONENET_GET_DEVICE, METHOD.GET, params)
}

export async function get_user_devicelist(params) {
  return request(ONENET_GET_USER_DEVICE_LIST, METHOD.GET, params)
}

export async function get_user_devicelist_by_type(params) {
  return request(ONENET_GET_USER_DEVICE_LIST_BY_TYPE, METHOD.GET, params)
}


export async function get_device_history(params) {
  return request(ONENET_GET_DEVICE_HISTORY, METHOD.GET, params)
}

export async function get_device_desired(params) {
  return request(ONENET_GET_DEVICE_DESIRED, METHOD.GET, params)
}

export async function set_device_desired(params) {
  return request(ONENET_SET_DEVICE_DESIRED, METHOD.GET, params)
}

export async function set_device_name(params) {
  return request(ONENET_SET_DEVICE_NAME, METHOD.GET, params)
}

export default {
  onenet_get_project_info,
  onenet_get_user_project_info,
  get_device_latest,
  get_device,
  get_user_devicelist,
  get_device_history,
  get_device_desired,
  set_device_desired,
  set_device_name,
}