<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>
<style lang="scss" scoped>
#app {
  height: 100%;
  //overflow: auto;

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
