import { request, METHOD } from '@/utils/request'
import { HEADERNOTICE,READNOTICE,FIRSTSHOW_READED } from '@/services/api'

export async function get_headernotice(pram) {
  return request(HEADERNOTICE, METHOD.GET,pram)
}

export async function read_notice(pram) {
  return request(READNOTICE, METHOD.POST,pram)
}

export async function set_firstshow_readed(pram) {
  return request(FIRSTSHOW_READED, METHOD.GET,pram)
}
export default {
  get_headernotice,
  read_notice,
  set_firstshow_readed
}