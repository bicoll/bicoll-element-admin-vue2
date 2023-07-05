import {login, logout, getInfo, getMenu} from '@/api/user' // API
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

/**
 * 获取默认的状态
 */
const getDefaultState = () => {
    return {
        token: getToken(),// 用户Token
        username: '', // 用户名
        avatar: '', // 头像
        dynamicRoutes: [],// 动态路由，根据资源菜单生成
        menus: [],// 用户资源菜单，侧边栏根据资源菜单生成
    }
}
const state = getDefaultState() // 默认状态

const mutations = {
    /**
     * 重置(清空)状态
     * @param state
     * @constructor
     */
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    /**
     * 设置Token（状态）
     * @param state
     * @param token
     * @constructor
     */
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    /**
     * 设置用户名
     * @param state
     * @param name
     * @constructor
     */
    SET_USERNAME: (state, username) => {
        state.username = username
    },
    /**
     * 设置头像
     * @param state
     * @param avatar
     * @constructor
     */
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    /**
     * 设置动态路由，默认false
     */
    SET_DYNAMIC_ROUTES: (state, dynamicRoutes) => {
        state.dynamicRoutes = dynamicRoutes
    },
    /**
     * 设置资源菜单
     */
    SET_MENUS(state, menus) {
        state.menus = menus
    }
}

const actions = {
    /**
     * 处理用户登录
     * @param commit
     * @param LoginForm
     * @returns {Promise<unknown>}
     */
    login({commit}, LoginForm) {
        const {username, pwd} = LoginForm
        return new Promise((resolve, reject) => {
            login({username: username.trim(), pwd}).then(resp => {
                commit('SET_TOKEN', resp.token)// 设置Token（状态）
                setToken(resp.token) // 设置Token（Cookie）
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        })
    },

    /**
     * 获取用户状态
     */
    getInfo({commit}) {
        return new Promise((resolve, reject) => {
            getInfo().then(resp => {

                if (!resp) {
                    return reject('验证失败，请重新登录')
                }
                const {name, avatar} = resp
                commit('SET_USERNAME', name)
                commit('SET_AVATAR', avatar)
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        })
    },

    /**
     * 用户注销
     */
    logout({commit}) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    /**
     * 重置Token
     */
    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken() // 移除Cookie里的Token
            commit('RESET_STATE')// 移除Store里的Token
            resolve()
        })
    },

    /**
     * 设置动态路由
     */
    setDynamicRoutes({commit}, dynamicRoutes) {
        commit('SET_DYNAMIC_ROUTES', dynamicRoutes)
    },
    setMenus({commit}, menus) {
        commit('SET_MENUS', menus)
    }

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
