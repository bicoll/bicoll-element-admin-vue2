<template>
  <div class="dashboard-wrapper">
    <div class="test">
      <button
        bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
        text="sm white"
        font="mono light"
        p="y-2 x-4"
        border="2 rounded blue-200"
      >
        Button
      </button>

      <div
        class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4"
      >
        <div class="shrink-0">
          <img
            class="h-12 w-12"
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
            alt="ChitChat Logo"
          />
        </div>
        <div>
          <div class="text-xl font-medium text-black">ChitChat</div>
          <p class="text-slate-500">You have a new message!</p>
        </div>
      </div>

      <input type="text"/>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.test {
  height: 5000px;
}
</style>
