// uno.config.ts
import {defineConfig} from 'unocss'
import { presetUno,presetAttributify,transformerVariantGroup } from 'unocss'
// import transformerVariantGroup from '@unocss/transformer-variant-group'// 变体组转换器


export default defineConfig({
    // 预设
    presets: [
        presetUno(),// 默认预设
        presetAttributify({ /* preset options */ }),
    ],
    // 主题
    theme:{
        // 短点
        breakpoints:{
            'sm':'640px',
            'md':'768px',
            'lg':'1024px',
            'xl':'1280px',
            '2xl':'2xlpx',
        },
        
    },
    // 转换器
    transformers:[
        transformerVariantGroup()
    ]
})
