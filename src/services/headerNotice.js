import { request, METHOD } from '@/utils/request'
import { HEADERNOTICE,READNOTICE,GET_AD } from '@/services/api'

export async function get_headernotice() {
  return request(HEADERNOTICE, METHOD.GET)
}

export async function read_notice(pram) {
  return request(READNOTICE, METHOD.POST,pram)
}

export async function getad(pram) {
  return request(GET_AD, METHOD.POST,pram)
}
export default {
  get_headernotice,
  read_notice,
  getad
}