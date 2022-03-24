import { request, METHOD } from '@/utils/request'
import { HISTORY_GET_DEVICE_HISTORY_LIST, REPORT_GEN_REPORT, REPORT_GET_REPORT, REPORT_SET_RECINFO, HISTORY_GET_DEVICE_HISTORY, HISTORY_GET_DEVICE_HISTORY_BY_TIME } from '@/services/api'

export async function get_device_history_list(pram) {
    return request(HISTORY_GET_DEVICE_HISTORY_LIST, METHOD.GET, pram)
}

export async function gen_reports(pram) {
    return request(REPORT_GEN_REPORT, METHOD.GET, pram)
}

export async function get_reports(pram) {
    return request(REPORT_GET_REPORT, METHOD.GET, pram)
}


export async function set_rec_info(pram) {
    return request(REPORT_SET_RECINFO, METHOD.POST, pram)
}

export async function get_device_historys(pram) {
    return request(HISTORY_GET_DEVICE_HISTORY, METHOD.GET, pram)
}
export async function get_device_historys_by_time(pram) {
    return request(HISTORY_GET_DEVICE_HISTORY_BY_TIME, METHOD.GET, pram)
}
export default {
    get_device_history_list,
    gen_reports,
    get_reports,
    set_rec_info,
    get_device_historys,
    get_device_historys_by_time,
}