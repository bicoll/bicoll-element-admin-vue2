import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'

// 创建Axios实例
const request = axios.create({
    baseURL: import.meta.env.APP_BASE_, // 后台地址的Base URL，URL = Base URL + Request url
    timeout: 5000 // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use(
    // 在请求发出之前的回调
    config => {
        // if (store.getters.token) {
        //     // 让每个请求的请求头都加上token，以'X-Token'为key
        //     config.headers['X-Token'] = getToken()
        // }
        return config
    },
    error => {
        // 请求发生错误时的回调
        console.log(error) // 控制台输出log日志
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    // 当请求正常响应时的回调
    response => {
        const res = response.data // response.data为HTTP请求响应的响应体
        // 当状态码不是200，直接Message提示报错
        if (res.code !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008：非法令牌;
            // 50012：其他客户端已登录;
            // 50014：令牌已过期;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // ”注销确认“弹窗
                MessageBox.confirm('您已注销，您可以取消以留在此页面，或重新登录。', '注销确认', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 清空Token，刷新页面
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            // 状态码是200，表明后台处理请求成功
            return res
        }
    },
    // 响应出错的回调
    error => {
        console.log('err' + error) // 控制台输出日志
        // Message提醒
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default request
