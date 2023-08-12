import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)// 安装路由插件

// 通用的路由
const commonRoutes = [
    {
        path: '/login',
        meta: {
            title: 'Login'
        },
        component: () => import('@/pages/login/index.vue')
    }
]

/**
 * 创建创建一个新的路由对象
 */
const createRouter = () => new Router({
    routes: commonRoutes
});

const router = createRouter();

/**
 * 重置（清空）路由
 */
export const resetRouter = () => {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router;

