import {login, logout, getInfo} from '@/api/user' // API
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'
import request from "@/utils/request";

/**
 * 获取默认的状态
 * @returns {{name: string, avatar: string, token: *}}
 */
const getDefaultState = () => {
    return {
        token: getToken(),// 用户Token
        username: '', // 用户名
        avatar: '' // 头像
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
    SET_USERNAME: (state, name) => {
        state.name = name
    },
    /**
     * 设置头像
     * @param state
     * @param avatar
     * @constructor
     */
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
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
            login({username: username.trim(), pwd}).then(response => {
                const {data} = response
                commit('SET_TOKEN', data.token)// 设置Token（状态）
                setToken(data.token) // 设置Token（Cookie）
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    /**
     * 获取用户状态
     * @param commit
     * @param state
     * @returns {Promise<unknown>}
     */
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const {data} = response

                if (!data) {
                    return reject('Verification failed, please Login again.')
                }

                const {name, avatar} = data

                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    /**
     * 用户注销
     * @param commit
     * @param state
     * @returns {Promise<unknown>}
     */
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
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
     * @param commit
     * @returns {Promise<unknown>}
     */
    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken() // 移除Cookie里的Token
            commit('RESET_STATE')// 移除Store里的Token
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
