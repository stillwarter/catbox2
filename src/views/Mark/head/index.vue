<script setup>
import { Icon as IconifyIcon } from '@iconify/vue'
const emit = defineEmits(['openCreateFileModal'])
</script>

<template>
  <h3>记录列表</h3>
  <div class="centerbox">
    <a-tooltip placement="topLeft" title="新建文件夹">
      <iconify-icon
        icon="tdesign:file-add"
        width="14"
        height="14"
        @click="() => emit('openCreateFileModal')"
      ></iconify-icon>
    </a-tooltip>
  </div>
</template>

<style lang="less" scoped>
h3 {
  margin: 0;
}
</style>
