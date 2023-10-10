<template>
  <el-breadcrumb class="app-breadcrumb"  separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item) in levelList" :key="item.path" :class="item.path === $route.path?'final':null">
        <svg-icon :iconName="item.meta.icon" color="#515a6e" :size="18" align-middle />
        <span align-middle ml-1 select-none tracking="0.5" >{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
import SvgIcon from '@/components/SvgIcon/index.vue'
export default {
  name: 'breadcrumb',
  data() {
    return {
      //   levelList: []
    }
  },
  //   craeted() {
  //     this.getBreadcrumb()
  //   },
  computed: {
    levelList() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      return matched
    }
  },
  components: { SvgIcon },
  methods: {
    // getBreadcrumb() {
    //   console.log(this.$route.matched);
    //   let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
    //   this.levelList = matched
    // },
  }
}
</script>