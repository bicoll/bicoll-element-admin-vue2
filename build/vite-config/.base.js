import {defineConfig} from 'vite'

const viteConfig = defineConfig(config => {
    return {
        // 注意：以下两个变量决定了loadEnv()函数加载来的所有环境变量中挑选：在envDir目录下具有envPrefix前缀的变量会被注入到vite客户端中（import.meta.env） important！
        envPrefix: ['APP_', 'VITE'], // vite客户端env环境变量的前缀，默认'VITE_'
        envDir: './build/env', // 用于指定要加载哪个目录下的环境变量
        resolve: {
            alias: {
                "@": "/src"
            },
        },
    }
})

export default viteConfig
