import request from '@/utils/request'

/**
 * 用户登录
 * @param data
 * @returns {*}
 */
export function getUsers() {
  return request({
    url: '/api/sys/user',
    method: 'get',
  })
}