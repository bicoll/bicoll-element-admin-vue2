<template>
  <!-- <div class="navbar-wrapper px-5 h-60px">
    <el-row class="h-full flex">
      <el-col :span="20" class="flex items-center">
        <collapse-button
          :collapse="collapse"
          @click.native="toggleSideBar"
          line-color="rgba(22, 93, 255, 0.8)"
        />
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div> -->
  <div id="navbar-wrapper" class="h-60px px-5 flex">
    <div class="lg:w-1/2 w-1/5 flex items-center">
      <collapse-button
        :collapse="collapse"
        @click.native="toggleSideBar"
        line-color="rgba(22, 93, 255, 0.8)"
      />
    </div>
    <div class="lg:w-1/2 w-4/5 flex"></div>
  </div>
</template>
<script>
import CollapseButton from "@/layout/components/nvbar/CollapseButton.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "navbar",
  components: { CollapseButton },
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
