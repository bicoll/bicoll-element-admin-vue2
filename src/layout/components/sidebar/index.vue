<template>
  <div :class="['sidebar-wrapper', { collapse: collapse }]">
    <el-scrollbar>
      <el-menu :collapse="collapse" :default-active="activeMenu" :background-color="`var(--sidebar-bg)`"
        :text-color="`var(--text-prm)`" :active-text-color="`var(--text-prm)`" :collapse-transition="true" mode="vertical"
        @select="handleSelect">
        <sidebar-item v-for="menu in menus" :item="menu" :key="menu.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapState } from "vuex";
import constants from "@/style/constant.module.scss";
import SidebarItem from "./SidebarItem.vue";

export default {
  name: "SideBar",
  methods: {
    // 根据折叠状态切换CSS变量（--sidebar-width：侧边栏的宽度）
    toggleDomWidth(collapse) {
      if (collapse) {
        document.body.style.setProperty("--sidebar-width", this.constants.sidebarCollapseWidth);
      } else {
        document.body.style.setProperty("--sidebar-width", this.constants.sidebarWidth);
      }
    },
    handleSelect(index, indexPath) {
      // console.log(index,indexPath);
    }
  },
  components: { SidebarItem },
  computed: {
    // CSS常量
    constants: () => constants,
    // 当前激活的菜单index
    activeMenu() {
      return this.$route.path;
    },
    ...mapState({
      // 资源菜单
      menus: (state) => state.user.menus,
      // 折叠状态
      collapse: (state) => state.app.sidebar.collapse
    })
  },
  watch: {
    // 监听侧边栏的折叠状态从而动态调整侧边栏宽度
    collapse: {
      handler(newVal) {
        // 通过调整css变量来控制侧边栏宽度
        if (newVal) {
          document.body.style.setProperty("--sidebar-width", this.constants.sidebarCollapseWidth);
        } else {
          document.body.style.setProperty("--sidebar-width", this.constants.sidebarWidth);
        }
      }, immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  width: var(--sidebar-width);
  overflow: hidden;
  background-color: var(--sidebar-bg);
  transition: all 0.3s ease-out;

  // 折叠状态
  &.collapse {
    .el-menu[role=menubar]:deep {

      .el-menu-item,
      .el-submenu__title {
        span {
          opacity: 0;
        }
      }

      .el-submenu {
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }

  .el-scrollbar:deep {
    height: 100%;

    // .el-aside {
    //   transition: width 0.15s;
    //   -webkit-transition: width 0.15s;
    //   -moz-transition: width 0.15s;
    //   -webkit-transition: width 0.15s;
    //   -o-transition: width 0.15s;
    // }

    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }

    // 总菜单
    .el-menu[role="menubar"] {
      width: inherit !important;
      border-right: none;

      // 折叠菜单项
      .el-submenu {
        .el-submenu__title {

          svg.svg-icon,
          span {
            color: var(--sidebar-item-text);
          }

          // 取消hover时默认的背景色
          &:hover {
            background-color: var(--sidebar-bg) !important;
          }
        }
      }

      // 菜单项
      .el-menu-item {

        svg,
        span {
          // opacity: 1;
          transition: all ease-out 0.3s;
          color: var(--sidebar-item-text);
        }

        // 菜单项hover状态
        &:hover {
          background-color: var(--sidebar-item-hover) !important;
        }

        // 菜单项激活状态：
        &.is-active {
          background-color: var(--clr-prm-8) !important;

          >svg,
          span {
            color: var(--clr-white) !important;
          }
        }
      }
    }
  }
}
</style>
