import { login, logout, getInfo, getMenu } from '@/api/user' // API
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import store from 'vuex'

/**
 * 获取默认的（初始化）状态
 */
let state =  {
    token: '',// 用户Token
    username: '', // 用户名
    avatar: '', // 头像
    dynamicRoutes: [],// 动态路由，根据资源菜单生成
    menus: [],// 用户资源菜单，侧边栏根据资源菜单生成
    permissiones: []
}
const USER_KEY = 'user'
const localUser = window.localStorage.getItem(USER_KEY)
if (localUser !== null) {
    const json = JSON.parse(localUser)
    // 生成路由表
    // const dynamicRoutes = json.dynamicRoutes
    // if (dynamicRoutes && dynamicRoutes.length != 0) {
    //     dynamicRoutes.forEach(item => {
    //         router.addRoute(item)
    //     });
    // }
    json.dynamicRoutes = []
    state = json
}


const actions = {
    // 处理用户登录
    login({ commit }, LoginForm) {
        const { username, pwd } = LoginForm
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), pwd: pwd.trim() }).then(resp => {
                const { avatar, username, token } = resp
                commit('SET_TOKEN', token)
                commit('SET_USERNAME', username)
                commit('SET_AVATAR', avatar)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // 获取用户信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(resp => {
                if (!resp) {
                    return reject('验证失败，请重新登录')
                }
                const { name, avatar } = resp
                commit('SET_USERNAME', name)
                commit('SET_AVATAR', avatar)
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 用户注销
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                removeToken()
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 重置Token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // 移除Cookie里的Token
            commit('RESET_STATE')// 移除Store里的Token
            resolve()
        })
    },
    // 设置动态路由
    setDynamicRoutes({ commit }, dynamicRoutes) {
        // router.addRoutes
        commit('SET_DYNAMIC_ROUTES', dynamicRoutes)
    },
    // 设置资源菜单
    setMenus({ commit }, menus) {
        commit('SET_MENUS', menus)
    },
    reset({ commit }) {
        commit('RESET')
    }
}
const mutations = {
    //重置
    RESET: (state) => {
        state.username=''
        state.token=''
        state.avatar=''
        state.dynamicRoutes=[]
        state.menus=[]
        window.localStorage.removeItem(USER_KEY)
    },
    /**
     * 重置(清空)状态
     */
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    /**
     * 设置Token（状态）
     */
    SET_TOKEN: (state, token) => {
        state.token = token
        window.localStorage.setItem(USER_KEY, JSON.stringify(state))
    },
    /**
     * 设置用户名
     */
    SET_USERNAME: (state, username) => {
        state.username = username
        window.localStorage.setItem(USER_KEY, JSON.stringify(state))
    },
    /**
     * 设置头像
     */
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
        window.localStorage.setItem(USER_KEY, JSON.stringify(state))
    },
    /**
     * 设置动态路由，默认false
     */
    SET_DYNAMIC_ROUTES: (state, dynamicRoutes) => {
        state.dynamicRoutes = dynamicRoutes
        window.localStorage.setItem(USER_KEY, JSON.stringify(state))
    },
    /**
     * 设置资源菜单
     */
    SET_MENUS(state, menus) {
        state.menus = menus
        window.localStorage.setItem(USER_KEY, JSON.stringify(state))
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
