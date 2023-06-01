import {defineConfig} from 'vite'; // 动态配置函数
import devConfig from "./build/vite-config/.dev.js"; // 开发环境配置
import prodConfig from "./build/vite-config/.prod.js"; // 生产环境配置
import baseConfig from "./build/vite-config/.base.js"; // 基础配置

// 环境解析器
const envResolver = {
    build: config => {
        console.log("正在使用生产环境配置");
        return {...prodConfig,...baseConfig, };
    },
    serve: config => {
        console.log("正在使用开发环境配置");
        return { ...(devConfig(config)),...baseConfig(config),};
    },
};
export default defineConfig(config => {
    const {command, mode} = config
    console.table(config);
    return envResolver[command](config);
})

