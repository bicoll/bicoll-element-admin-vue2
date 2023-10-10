import { defineConfig } from 'vite'; // 动态配置函数
import devConfig from "./build/config/.dev.js"; // 开发环境配置
import prodConfig from "./build/config/.prod.js"; // 生产环境配置
import baseConfig from "./build/config/.base.js"; // 基础配置

// 环境解析器
// const envResolver = {
//     build: config => {
//         console.log("正在使用生产环境配置");
//         return { ...prodConfig, ...baseConfig, };
//     },
//     serve: config => {
//         console.log("正在使用开发环境配置");
//         return { ...(devConfig(config)), ...baseConfig(config), };
//     },
// };


const envResolver = {
    // build: () => ({...viteBaseConfig,... viteProdConfig}) 这种方式也可以
    // 后面添加的配置项会覆盖前面的
    build: () => {
        console.log("正在使用生产环境配置");
        return Object.assign({}, baseConfig, prodConfig)
    },
    serve: () => {
        console.log("正在使用开发环境配置");
        return Object.assign(baseConfig, devConfig)
    },
}

export default defineConfig(config => {
    const { command, mode } = config
    console.table(config);
    return envResolver[command]();
})

