<template>
  <el-tabs :value="current" @tab-click="tabChange">
    <el-tab-pane v-for="tab in tabs" :key="tab.key" :label="tab.label" :name="tab.key"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    current: {
      type: String,
      default: '',
    },
  },

  methods: {
    tabChange(tab) {
      this.$emit('tab-change', tab.name)
    },
  },
}
</script>