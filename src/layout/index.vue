<template>
  <div id="app-wrapper">
    <sidebar />
    <div id="main-wrapper" :class="[{ 'fixed-header': fixedHeader }]">
      <div class="header">
        <navbar />
        <tags-view/>
      </div>
      <app-content />
    </div>
  </div>
</template>

<script>
import sidebar from "./components/sidebar/index.vue";
import TagsView from "./components/TagsView/index.vue";
import navbar from "./components/nvbar/index.vue";
import AppContent from "./components/AppContent.vue";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: { sidebar, TagsView, navbar, AppContent },
  computed: {
    ...mapState({
      collapse: (state) => state.app.sidebar.collapse,
      fixedHeader: (state) => state.app.fixedHeader,
    }),
  },
};
</script>


<style lang="scss" scoped>
// @import "@/style/variable.module";

#app-wrapper {
  height: 100%;
  overflow: auto;

  #main-wrapper {
    position: relative;
    min-height: 100%;
    margin-left: var(--sidebar-width);
    transition: all ease-out 0.3s;
    // 固定头部
    &.fixed-header {
      padding-top: 110px;
      .header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 100;
        width: calc(100% - var(--sidebar-width));
        transition: all ease-out 0.3s;
      }
    }
    .header {
      background: var(--content-prm);
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #eaeaeb;
    border: 3px solid transparent;
    border-radius: 7px;
  }
}
</style>
