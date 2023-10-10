import { defineConfig } from 'vite' // 动态配置函数
import vue from '@vitejs/plugin-vue2'// 官方vue2插件
import { viteMockServe } from 'vite-plugin-mock'// vite-mock插件
import Components from 'unplugin-vue-components/vite'// 组件按需自动导入插件
import {
    ElementUiResolver
} from 'unplugin-vue-components/resolvers' // 为unplugin-vue-components导入Element-ui解析器
import UnoCSS from 'unocss/vite'// UnoCSS插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

/** @type import("vite").UserConfig  */
export default {
    // css: {
    //     // 指定传递给 CSS 预处理器的选项。文件扩展名用作选项的键
    //     preprocessorOptions: {
    //         // 全局样式引入
    //         scss: {
    //             additionalData: '@use "@/style/variable.scss" as *;',
    //             javascriptEnabled: true
    //         }
    //     }
    // },
    plugins: [
        vue(),
        viteMockServe({
            mockPath: 'mock',// mock文件夹路径
            prodEnabled: false,//生产环境下为false，这样就不会被打包到生产包中
            localEnabled: true// 是否启用Mock
        }),
        UnoCSS({
            // mode:'vue-scoped'
        }),
        Components({
            resolvers: [
                ElementUiResolver()
            ]
        }),
        createSvgIconsPlugin({
            // 指定图标文件夹，绝对路径（NODE代码）
            iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')]
        })
    ],
    server: {
        host: "0.0.0.0",// 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
        open: true, //自动打开浏览器
        port: 999 //端口号
    },
    development: {
        // 其他配置
        // ...
        productionTip: false,
    },
}

