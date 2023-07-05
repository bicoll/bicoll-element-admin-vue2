<template>
    <div class="app-wrapper">
        <sidebar/>
        <router-view></router-view>
    </div>
</template>

<script>
import sidebar from "@/layout/components/sidebar/index.vue";

// console.log(this.$store)
export default {
    name: 'Layout',
    components: {sidebar},
    computed: {
        // sidebar(){
        //     return this.$store.state.app.sidebar
        // }
    }
}
</script>


<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
}
</style>
