import Cookies from 'js-cookie'

const TOKEN_KEY = 'admin-token' // Token Key

// Token存储与Cookie中

/**
 * 获取Token
 */
export function getToken() {
    return Cookies.get(TOKEN_KEY)
}

/**
 * 设置Token
 */
export function setToken(token) {
    return Cookies.set(TOKEN_KEY, token)
}

/**
 * 移除Token
 */
export function removeToken() {
    return Cookies.remove(TOKEN_KEY)
}
