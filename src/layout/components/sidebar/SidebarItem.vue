<template>
  <!--hidden表示这个路由页面是隐藏的-->
    <div v-if="!item.hidden" class="sidebar-item-wrapper">
        <template v-if="!item.children||item.children.length===0">
            <app-link v-if="item.meta" :to="resolvePath(item.path)">
                <el-menu-item :index="resolvePath(item.path)">
                    <svg-icon :icon-name="item.meta.icon" size="16"></svg-icon>
                    <span class="ml-3">{{ item.meta.title }}</span>
                </el-menu-item>
            </app-link>
        </template>
        <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
            <template slot="title">
                <svg-icon :icon-name="item.meta.icon" size="16"></svg-icon>
                <span class="ml-3">{{ item.meta.title }}</span>
            </template>
            <sidebar-item v-for="(child,index) in item.children" :item="child" :base-path="resolvePath(item.path)"
                          :key="child.path+index"/>
        </el-submenu>
    </div>
</template>
<script>
import AppLink from "./AppLink.vue";
import {isExternalLink} from '@/utils/validate'
import svgIcon from "@/components/SvgIcon/index.vue";
import variables from '@/styles/variable.module.scss'

export default {
    name: 'SidebarItem',
    props: {
        // item就是路由对象。
        item: {
            type: Object,
            required: true
        },
        //
        isNest: {
            type: Boolean,
            default: false
        },
        // 父路径，一级菜单的父路径应该是空！
        basePath: {
            type: String,
            default: ''
        }
    },
    components: {AppLink, svgIcon},
    methods: {
        // 解析多级菜单路径
        resolvePath(menuPath) {
            // 如果是当前菜单是外部链接直接返回当前菜单链接
            if (isExternalLink(menuPath)) {
                return menuPath
            }
            // 一级菜单以”/“开头直接返回当前菜单path
            if (this.basePath === '') {
                return menuPath
            }
            // 不是一级菜单：basePath会是这样的：/xxxx、/xxx/xxxx
            // 而menuPath会是这样的：xxxx
            // 所以 basePath + ‘/’ + menuPath 即可得到/xxx/xxxx/xxxx……
            return this.basePath.concat('/', menuPath)
        }
    },
    computed: {
        variables: () => variables
    }
}
</script>

<style scoped lang="scss">

</style>
