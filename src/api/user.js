import request from '@/utils/request'

/**
 * 用户登录
 * @param data
 * @returns {*}
 */
export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/user/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export function getMenu() {
  return request({
    url: '/api/user/menu',
    method: 'get'
  })
}
