import router from './index.js'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/getPageTitle'
import { start, close } from "@/plugins/NProgress";
import { getMenu } from "@/api/user";

const whiteList = ['/login'] // 白名单页面，不需要进行页面访问权限控制
const modules = import.meta.glob(["/src/pages/**/index.vue", '/src/layout/index.vue'])

/**
 * 将菜单对象转换为路由对象，将component属性的字符串型转换为import
 */
function transformImport(route) {
    if (route.component === 'layout') {
        route.component = modules[`/src/layout/index.vue`]
    } else {
        route.component = modules[`/src/pages/${route.component}/index.vue`]
    }

    if (route.children) {
        route.children.forEach(child => transformImport(child))
    }
}

function initMenu(obj) {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string') {
            obj[key] = ''
        } else if (typeof obj[key] === 'number') {
            obj[key] = 1
        } else if (typeof obj[key] === 'object') {
            initMenu(obj[key])
        }
    })
}

function cloneDeep(obj) {
    let _obj = JSON.stringify(obj), objClone = JSON.parse(_obj);
    return objClone;
}


// 将后台获取到的资源菜单转换为路由表
const refreshRoutes = function refreshRoutes(menus) {
    menus.forEach(item => {
        // 处理一级路由
        if (!item.children || item.children.length === 0) {
            const child = { ...item }
            child.meta = { ...item.meta }
            initMenu(item)// 将自己置空
            // item.name=`layout-${index}`
            // item.path=''
            item.children = [{ ...child }]
            item.component = 'layout'
        }
        // 将所有component选项进行转换
        transformImport(item)
        router.addRoute(item)
    })
    // console.log(menus)
    return menus
}

// 路由前置行为，在这里进行路由权限控制
router.beforeEach(async (to, from, next) => {
    start()// 开启进度条
    document.title = getPageTitle(to.meta.title)// 设置页面标题（从路由的元数据中获取）
    const token = getToken()// Token(Cookie中)
    // 1、Token存在
    if (token) {
        // 1.1 Token存在的情况下访问登录页面，直接放行
        if ('/login' === to.path) {
            next()
        } else {
            // 1.2、Token存在的情况下访问其它页面：存在异步路由表直接放行，不存在从后台获取
            const dynamicRoutes = store.getters.dynamicRoutes
            if (dynamicRoutes && dynamicRoutes.length !== 0) {
                next()
            } else {
                getMenu().then(resp => {
                    const menus = cloneDeep(resp)// 资源菜单
                    const routes = refreshRoutes(resp)// 动态添加路由
                    store.dispatch('user/setDynamicRoutes', routes)
                    store.dispatch('user/setMenus', menus)
                    next({ ...to })
                }).catch(e => {
                    // 后台获取用户信息失败：重置Token，重定向到登录界面
                    store.dispatch('user/resetToken')// 重置Token（Cookie里的和Store里的）
                    Message.error(e || '获取用户信息失败，请重新登录')// 提示用户
                    next(`/login?redirect=${to.path}`)// 重定向到登录页
                })
            }
        }
    } else {
        // 2、Token不存在
        // 2.1、访问白名单内的页面直接放行
        // debugger
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            // 2.2、非白名单内的页面，重定向到登录页面。
            // next({path: `/login?redirect=${to.path}`, replace: true})
            // console.log({path: `/login?redirect=${to.path}`, replace: true})
            next('/login')
        }
    }
})


// 路由后置行为：
router.afterEach((to, from, next) => {
    close()// 关闭进度条
})
