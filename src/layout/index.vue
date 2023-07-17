<template>
    <div id="app-wrapper">
        <sidebar/>
        <div id="main-wrapper">
            <div class="header">
                <navbar/>
                <tagbar/>
            </div>
            <app-content/>
        </div>
    </div>
</template>

<script>
import sidebar from "./components/sidebar/index.vue";
import tagbar from "./components/tagbar.vue";
import navbar from "./components/nvbar/index.vue";
import AppContent from "./components/AppContent.vue";
import {mapState} from 'vuex'

export default {
    name: 'Layout',
    components: {sidebar, tagbar, navbar, AppContent},
    computed:{
      ...mapState({
        collapse: state => state.app.sidebar.collapse
      })
    }
}
</script>


<style lang="scss" scoped>
// @import "@/styles/variable.module";

#app-wrapper {
  height: 100%;
  overflow: auto;

  #main-wrapper {
    position: relative;
    min-height: 100%;
    margin-left:var(--sidebar-width);
    transition: all ease-out .3s;
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
