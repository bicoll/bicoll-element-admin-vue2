import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)// 安装路由插件
// 路由规则
const routes = [

    {
        path: '/login',
        meta: {
            title: 'Login'
        },
        component: () => import('@/pages/login/index.vue')
    },
    {
        path: '/home',
        meta: {
            title: 'Home'
        },
        component: () => import('@/pages/home/index.vue')
    }
]
/**
 * 创建路由实例
 * @returns {VueRouter} 路由实例
 */
const createRouter = () => new Router({
    routes
});

/**
 * 重置（清空）路由
 */
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

const router = createRouter();
export default router;

