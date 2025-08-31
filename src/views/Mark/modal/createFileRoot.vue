<script setup>
import { ref } from 'vue'
import Message from '../../../utils/message_ant'
const props = defineProps(['title'])
const emit = defineEmits(['updataTreeData'])
const open = ref(false)
const filepathname = ref('')
const showModal = () => {
  open.value = true
}
const handleOk = async () => {
  const result = await window.electronAPI.addMdDirectoryRoot(filepathname.value)
  if (result.success) {
    Message.success('文件夹创建成功')
    emit('updataTreeData')
    open.value = false
  }
}
defineExpose({
  showModal
})
</script>

<template>
  <a-modal
    v-model:open="open"
    :title="title"
    @ok="handleOk"
    :cancelText="'取消'"
    :okText="'确认'"
  >
    <p style="margin: 20px 0 10px 0 !important">文件夹名称：</p>
    <a-input v-model:value="filepathname"></a-input>
  </a-modal>
</template>
