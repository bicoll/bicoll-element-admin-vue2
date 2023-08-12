import Vue from 'vue'

import App from './App.vue'

import 'normalize.css' // normalize.css初始化样式
import '@/style/index.scss' // 全局样式入口

import router from '@/router' // 路由
import '@/router/config'// 路由配置必须在路由对象创建之后再引入，否则报错

import store from './store' //

import 'virtual:svg-icons-register'// svg-icons插件
import 'virtual:uno.css'// uno

Vue.config.productionTip = false// 关闭生产环境提示

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')
