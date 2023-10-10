<template>
  <div class="app-content-wrapper" p-6>
    <keep-alive :includes="cachedComponents">
      <router-view :key="key" />
    </keep-alive>

  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: "AppContent",
  computed: {
    ...mapState({
      cachedComponents: state => state.tagsView.cachedComponents
    }),
    // RouterView的key
    key() {
      return this.$route.fullPath
    }
  }
};
</script>
<style lang="scss"></style>
