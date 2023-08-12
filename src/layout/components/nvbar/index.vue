<template>
  <div id="navbar-wrapper" class="h-60px " px-5 flex>
    <div w="1/5 lg:1/2" flex items-center>
      <collapse-button :collapse="collapse" @click.native="toggleSideBar" m="r6" line-color="var(--clr-prm-8)" />
      <breadcrumb/>
    </div>
    <div w="4/5 lg:1/2" flex></div>
  </div>
</template>
<script>
import CollapseButton from "./CollapseButton.vue";
import Breadcrumb  from './Breadcrumb.vue'
import { mapActions, mapState } from "vuex";
export default {
  name: "navbar",
  components: { CollapseButton,Breadcrumb },
  computed: {
    ...mapState({
      collapse: (state) => state.app.sidebar.collapse,
    }),
  },
  methods: {
    ...mapActions({
      toggleSideBar: "app/toggleSideBar",
    }),
  },
};
</script>
<style lang="scss" scoped>
#navbar-wrapper {
  border-bottom: 1px solid #f6f6f6;
}
</style>
