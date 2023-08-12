<template>
    <el-scrollbar ref="scrollWrapperRef" :vertical="false" class="scroll-container">
        <slot />
    </el-scrollbar>
</template>

<script>
export default {
    name: 'ScrollWrapper',
    computed: {
        scrollWrapper() {
            return this.$refs.scrollWrapperRef.$refs.wrap
        }
    },
    methods: {
        emitScroll() {
            this.$emit('scroll')
        }
    },
    // 在挂载后和销毁前配置滚动监听，让调用者处理滚动事件
    mounted() {
        this.scrollWrapper.addEventListener('scroll', this.emitScroll, true)
    },
    beforeDestroy() {
        this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
    },
}
</script>