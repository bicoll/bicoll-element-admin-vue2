/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * 验证是否为外部链接
 * @param {string} path URL路径
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证用户名是否是
 * @param str 用户名
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
