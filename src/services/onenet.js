import { request, METHOD } from '@/utils/request'
import {
  ONENET_GET_PROJECT_INFO,
  ONENET_GET_USER_PROJECT_INFO,
  ONENET_GET_USER_DEVICE_LIST_ZX,
  ONENET_GET_USER_DEVICE_LIST_LY,
  ONENET_GET_DEVICEDETAIL,
  ONENET_GET_DEVICE,
  ONENET_GET_USER_DEVICE_LIST_ZNBWX,
  ONENET_GET_USER_DEVICE_LIST_LLC,
  ONENET_GET_USER_DEVICE_LIST_ZHLK,
  ONENET_GET_USER_DEVICE_LIST_LCJZX,
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
export async function get_devicedetail(params) {
  return request(ONENET_GET_DEVICEDETAIL, METHOD.GET, params)
}
export async function get_device(params) {
  return request(ONENET_GET_DEVICE, METHOD.GET, params)
}

export async function get_user_devicelist_znbwx(params) {
  return request(ONENET_GET_USER_DEVICE_LIST_ZNBWX, METHOD.GET, params)
}

export async function get_user_devicelist_llc(params) {
  return request(ONENET_GET_USER_DEVICE_LIST_LLC, METHOD.GET, params)
}
export async function get_user_devicelist_zhlk(params) {
  return request(ONENET_GET_USER_DEVICE_LIST_ZHLK, METHOD.GET, params)
}

export async function get_user_devicelist_lcjzx(params) {
  return request(ONENET_GET_USER_DEVICE_LIST_LCJZX, METHOD.GET, params)
}

export default {
  onenet_get_project_info,
  onenet_get_user_project_info,
  get_user_devicelist_zx,
  get_user_devicelist_ly,
  get_devicedetail,
  get_device,
  get_user_devicelist_znbwx,
  get_user_devicelist_llc,
  get_user_devicelist_zhlk,
  get_user_devicelist_lcjzx,
}