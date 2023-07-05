<template>
    <div class="sidebar-wrapper">
        <el-scrollbar>
            <!--default-active:当前激活的菜单-->
            <el-menu
                    :collapse="isCollapse"
                    :default-active="activeMenu"
                    :background-color="variables.menuBg"
                    :text-color="variables.menuText"
                    :active-text-color="variables.menuActiveText"
                    :unique-opened="true"
                    :collapse-transition="false"
                    mode="vertical"
                    :default-openeds="defaultOpens"
                    @select="handleSelect"
                    ref="sidebarMenu"
            >
                <sidebar-item v-for="(menu) in menus" :item="menu" :key="menu.path"/>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
import variables from '@/styles/variable.module.scss'
import {mapGetters} from "vuex";
import SidebarItem from "./SidebarItem.vue";
import store from '@/store'
import {isExternalLink}from '@/utils/validate'
import router from "@/router";

export default {
    name: 'SideBar',
    data() {
        return {
            defaultOpens:[]
        }
    },
    methods:{
        // 处理选中菜单项
        handleSelect(index, indexPath){
            // console.log(index)
            // 当选中的是一个外部链接的菜单项时候，导航到第一个一级菜单项
            // 菜单选中项会自动计算，切换为路由对应的菜单项
            // if (isExternalLink(index)){
            //    // let firstMenu =  this.menus.filter[0]
            //    //  Object.keys()
            //     router.push({path:'/external-view'})
            // }
        },
        // // 找出第一个没有children的菜单项
        // findFinallyItem(obj){
        //     if (!obj.children||obj.children.length===0){
        //         return obj.path
        //     }
        // }
    },
    components: {SidebarItem},
    computed: {
        // CSS全局变量
        variables(){
            return variables
        },
        //侧边栏默认激活当前当前路由
        activeMenu() {
            const {meta, path} = this.$route
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        ...mapGetters([
            'sidebar'
        ]),
        // 是否折叠
        isCollapse() {
            return !this.sidebar.opened
        },
        // 资源菜单
        menus() {
            return store.getters.menus
        },
    }
}
</script>
// 侧边栏的样式放在styles目录下
