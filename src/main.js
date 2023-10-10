import Vue from 'vue'

import App from './App.vue'

import 'normalize.css' // normalize.css初始化样式
import '@/style/index.scss' // 全局样式入口
import 'element-ui/lib/theme-chalk/index.css';

import router from '@/router' // 路由
import '@/router/config'// 路由配置必须在路由对象创建之后再引入，否则报错

import store from './store' //

import 'virtual:svg-icons-register'// svg-icons插件
import 'virtual:uno.css'// uno
import SvgIcon from '@/components/SvgIcon/index.vue'
import DarkSwitch from '@/components/DarkSwitch.vue'
// Vue.config.productionTip = false// 关闭生产环境提示

Vue.component('SvgIcon',SvgIcon)
Vue.component('DarkSwitch',DarkSwitch)
new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')
