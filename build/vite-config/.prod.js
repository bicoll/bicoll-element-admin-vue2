import {defineConfig} from 'vite' // 动态配置函数
import vue from '@vitejs/plugin-vue2'
import {viteMockServe} from 'vite-plugin-mock'// vite-mock插件
import Components from 'unplugin-vue-components/vite'// 组件按需自动导入
import {
    ElementUiResolver
} from 'unplugin-vue-components/resolvers' // 为unplugin-vue-components导入Element-ui解析器
import UnoCSS from 'unocss/vite'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import path from "path";
// UnoCSS插件

export default defineConfig({
    plugins: [
        vue(),
        viteMockServe(),
        UnoCSS({}),
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
    }
})

