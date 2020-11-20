import { request, METHOD } from '@/utils/request'
import { ONENET_GET_ALL, ONENET_GET_PROJECT_INFO, ONENET_GET_USER_PROJECT_INFO } from '@/services/api'

export async function onenet_get_test(params) {
  return request(ONENET_GET_ALL, METHOD.GET, params)
}

export async function onenet_get_project_info(params) {
  return request(ONENET_GET_PROJECT_INFO, METHOD.GET, params)
}

export async function onenet_get_user_project_info(params) {
  return request(ONENET_GET_USER_PROJECT_INFO, METHOD.GET, params)
}

export default {
  onenet_get_test,
  onenet_get_project_info,
  onenet_get_user_project_info,
}