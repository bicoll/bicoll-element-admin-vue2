<template>
    <component :is="type" v-bind="linkProps(to)">
        <slot/>
    </component>
</template>

<script>
import {isExternalLink as isExternal} from '@/utils/validate'

export default {
    name: 'AppLink',
    props: {
        to: {
            type: String,
            required: true
        }
    },
    computed: {
        // 是否为外部链接
        isExternalLink() {
            return isExternal(this.to)
        },
        // 组件类型
        // 外部链接时候是A标签，否则是router-link，在网站内跳转
        type() {
            if (this.isExternalLink) {
                return 'a'
            }
            return 'router-link'
        }
    },
    methods: {
        linkProps(to) {
            if (this.isExternalLink) {
                return {
                    href: to,
                    target: '_blank',
                    rel: 'noopener'
                }
            }
            return {
                to: to
            }
        }
    }
}
</script>
