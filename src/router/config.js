import router from './index.js'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import {getToken} from '@/utils/auth.js'
import getPageTitle from '@/utils/getPageTitle.js'
import store from '@/store'
import {start, close} from "@/plugins/NProgress";
const whiteList = ['/login'] // 白名单页面，不需要进行页面访问权限控制

/**
 * 路由前置行为，在这里进行路由权限控制
 */
router.beforeEach(async (to, from, next) => {
    start()// 开启进度条
    document.title = getPageTitle(to.meta.title)// 设置页面标题（从路由的元数据中获取）
    const token = getToken()// Token
    // 1、Token存在
    if (token) {
        // 1.1 Token存在的情况下访问登录页面，直接放行
        if ('/login' === to.path) {
            next()
            close()
        } else {
            // 1.2、Token存在的情况下访问其它页面：存在用户信息直接放行，不存在后台获取（双重判断）
            const name = store.getters.name// 用户名
            if (name) {
                next()
                close()
            } else {
                try {
                    await store.dispatch('user/getInfo')
                    next()
                    close()
                } catch (e) {
                    // 后台获取用户信息失败：重置Token，重定向到登录界面
                    await store.dispatch('user/resetToken')// 重置Token（Cookie里的和Store里的）
                    Message.error(e || '获取用户信息失败，请重新登录')// 提示用户
                    next(`/login?redirect=${to.path}`)// 重定向到登录页
                    close()
                }
            }
        }
    } else {
        // 2、Token不存在
        // 2.1、访问白名单内的页面直接放行
        // debugger
        if (whiteList.indexOf(to.path) !== -1) {
            next()
            close()
        } else {
            // 2.2、非白名单内的页面，重定向到登录页面。
            next(`/login?redirect=${to.path}`)
            close()
        }
    }
})

// 路由后置行为：
router.afterEach((to, from, next) => {
    close()// 关闭进度条
})
