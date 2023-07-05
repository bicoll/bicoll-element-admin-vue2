import Vue from 'vue'
import App from './App.vue'
import 'normalize.css' // normalize.css初始化样式
import 'element-ui/lib/theme-chalk/index.css';// 引入Element-UI样式
import '@/styles/index.scss' // 全局样式入口
import router from '@/router' // 路由
import '@/router/config'// 路由配置必须在路由对象创建之后再引入，否则报错

import store from './store' //
import 'virtual:svg-icons-register'// svg-icons插件
import 'virtual:uno.css'// uno预设
// import path from "path";
//
// console.log(path.resolve('12','32'))
const app = new Vue({
    render: h => h(App),
    router,
    store
});
// const modules = import.meta.glob(["/src/pages/**/index.vue", '/src/layout/index.vue'])
// router.addRoute({
//     name: '',
//     path: '',
//     component: () => import('@/layout/index.vue'),
//     children: [
//         {
//             name: 'dashboard',
//             path:'dashboard',
//             // component: () => import('@/pages/dashboard/index.vue'),
//             component: modules[`/src/pages/dashboard/index.vue`],
//             meta: {
//                 title: 'dashboard',
//             }
//         }, {
//             name: 'user',
//             path:'/user',
//             // component: () => import('@/pages/dashboard/index.vue'),
//             component: modules[`/src/pages/sys/user/index.vue`],
//             meta: {
//                 title: 'user',
//             }
//         },
//     ]
// })
app.$mount('#app')
console.log(app)
