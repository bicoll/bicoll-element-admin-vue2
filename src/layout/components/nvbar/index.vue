<template>
  <div id="navbar-wrapper" class="h-60px " px-5 flex>
    <div w="2/5 lg:1/2" flex items-center>
      <collapse-button :collapse="collapse" @click.native="toggleSideBar" m="r6" line-color="var(--clr-prm-8)" />
      <breadcrumb display="none lg:block" />
    </div>
    <div w="3/5 lg:1/2" flex items-center flex-row-reverse>

      <el-dropdown cursor-pointer :tabindex="12">
        <span class="el-dropdown-link">
          <el-avatar :src="avatar" vertical-middle /><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item ><svg-icon icon-name="profile" vertical-middle mr-2 />个人资料</el-dropdown-item>
          <el-dropdown-item @click.native="handleLogout"><svg-icon icon-name="logout" vertical-middle mr-2 />注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <DarkSwitch :status="mode" @click.native="toggleMode" :onValue="'light'" :offValue="'dark'" mr-4 />
    </div>
  </div>
</template>
<script>
import CollapseButton from "./CollapseButton.vue";
import Breadcrumb from './Breadcrumb.vue'
import { mapActions, mapState } from "vuex";
import router from "@/router";
export default {
  name: "navbar",
  components: { CollapseButton, Breadcrumb },
  computed: {
    ...mapState({
      collapse: (state) => state.app.sidebar.collapse,
      mode: (state) => state.app.mode,
      avatar: (state) => state.user.avatar
    }),
  },
  methods: {
    ...mapActions({
      toggleSideBar: "app/toggleSideBar",
      toggleMode: "app/toggleMode",
      resetUserInfo: 'user/reset'
    }),
    // 处理注销
    handleLogout() {
      // 重置用户相关信息
      this.resetUserInfo()
      router.push('/login')
    }
  },
};
</script>
<style lang="scss" scoped>
#navbar-wrapper {
  border-bottom: 1px solid #f6f6f6;
  ::v-deep{
    .el-dropdown-menu__item{
      color: var(--clr-prm-8);
    }
  }
}
</style>
