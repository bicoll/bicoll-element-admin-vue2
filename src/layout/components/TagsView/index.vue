<template>
    <div class="tags-view-wrapper" h-50px overflow-hidden>
        <el-tabs v-model="activeTagName" type="card" @tab-click="handleTabClick" @tab-remove="handleRemoveTag" closable
            mt-12px>
            <el-tab-pane v-for="item in tags" :key="item.path" :label="item.meta.title" :name="item.name">
                <span slot="label">
                    <svg-icon v-if="item.meta.icon" :icon-name="item.meta.icon" size="16"></svg-icon>
                    {{ item.meta.title }}
                </span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    // 标签视图
    name: 'TagsView',
    computed: {
        tags() {
            return this.$store.state.tagsView.tags;
        },
        // 被激活的tag的name（id）
        activeTagName: {
            set(val) {
            },
            get() {
                return this.$route.name
            }
        }
    },
    created() {
        // 创建当前路由对应的tag
        if (!this.tags.includes(this.$route.name)) {
            this.addCurrentTag()
        }
        // 测试数据
        // for (let i = 0; i < 100; i++) {
        //     let tag = {
        //         meta: {
        //         }
        //     }
        //     tag.name = `tag ${i + 1}`
        //     tag.path = `tag ${i + 1}`
        //     tag.meta.title = '测试数据'
        //     this.$store.dispatch('tagsView/addTag', tag)
        // }
    },
    watch: {
        $route() {
            this.addCurrentTag()
        }
    },
    methods: {
        // 添加标签
        addCurrentTag() {
            const { name } = this.$route
            // 路由对象的name是标签（tag）的唯一标识，在添加时需要保证其存在
            if (name) {
                this.$store.dispatch('tagsView/addTag', this.$route)
                this.$store.dispatch('tagsView/addCachedView', this.$route)
            }
        },
        // 处理标签点击事件
        handleTabClick(tag) {
            // 这里的tag实际上是点击的tag对应的pane组件，这个pane组件是element根据tag的name创建的，也就是标签页，一个标点对应一个标签页。
            // 点击的是当前激活的标签页停止执行。
            if (this.$route.name === tag.name) {
                return
            }
            let matchRoutes = this.tags.filter(i => i.name === tag.name)
            let matchRoute = matchRoutes[0]
            if (matchRoute) {
                this.$router.push({ path: matchRoute.path, name: matchRoute.name })
            } else {
                console.error('请检查tag的name', tag);
            }
        },
        // 处理移除标签
        handleRemoveTag(tagName) {

            // 只有一个标签不予以删除
            if (this.tags.length === 1) {
                return
            } else {
                // 删除当前标签
                const result = this.tags.filter(i => i.name === tagName)
                const tag = result[0]
                if (tag) {
                    this.tags.splice(this.tags.indexOf(tag), 1)
                }
                // 路由跳转到退后一个标签（路由）
                const lastRoute = this.tags[this.tags.length - 1]
                // 最后一个标签不是自己才跳转
                if (lastRoute.name === this.$route.name) return
                this.$router.push({ path: lastRoute.path })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.tags-view-wrapper {
    padding: 0 20px;

    // padding: 0 10px;
    ::v-deep {
        .el-tabs__header {
            border-bottom: none;
            margin-bottom: 0;

            .el-tabs__nav-next,
            .el-tabs__nav-prev {
                // height: 50px;
                top: -6px;
            }

            .el-tabs__nav-wrap {
                padding: 0 12px;
            }

            // .el-tabs__nav-scroll {
            //     // display: content-box;
            // }

            .el-tabs__nav[role=tablist] {
                display: flex;
                align-items: center;
                border: none;
                padding: 0 10px;

                // 不要在这里加padding、margin等，要加在.el-tabs__nav-scroll上，否则会导致他比.el-tabs__nav-scroll长，滑动功能会受到影响。

                .el-tabs__item {
                    height: 38px;
                    position: relative;
                    line-height: 38px;
                    padding: 0 18px;
                    border: none;
                    text-align: center;
                    user-select: none;
                    border-radius: 10px 0 10px 0;
                    transition: padding .3s cubic-bezier(.645, .045, .355, 1);
                    color: var(--tagsview-text);

                    &::before,
                    &::after {
                        content: '';
                        position: absolute;
                        width: 10px;
                        height: 10px;
                    }

                    &::before {
                        left: -10px;
                        bottom: 0;
                    }

                    &::after {
                        top: 0;
                        right: -10px;
                    }


                    // 鼠标悬停的样式
                    &:hover {
                        $hoverBg: #dee1e6;
                        background: $hoverBg;

                        &::before {
                            background-image: radial-gradient(circle at 0 0, transparent 10px, $hoverBg 10px);
                        }

                        &::after {
                            background-image: radial-gradient(circle at 10px 10px, transparent 10px, $hoverBg 10px);
                        }

                        // .el-icon-close {
                        //     width: 0;
                        // }
                    }

                    // 选中时的样式
                    &[aria-selected="true"] {
                        color: var(--tagsview-active-text);
                        background: var(--tagsview-active-bg) !important;

                        &::before {
                            background: radial-gradient(circle at 0 0, transparent 10px, var(--tagsview-bg) 10px) !important;
                        }

                        &::after {
                            background: radial-gradient(circle at 10px 10px, transparent 10px, var(--tagsview-bg) 10px) !important;
                        }

                        .el-icon-close {
                            width: 14px !important;

                            &:hover {
                                background-color: var(--clr-prm-8);
                            }
                        }
                    }

                }
            }

        }
    }
}
</style>
