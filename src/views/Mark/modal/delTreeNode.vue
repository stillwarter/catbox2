<script setup>
import { ref } from 'vue'
import Message from '../../../utils/message_ant'
const props = defineProps(['selectNodeRight'])
const emit = defineEmits(['updata'])
const open = ref(false)
const title = ref('')
const content = ref('')
const showModal = () => {
  const { isDirectory, name } = props.selectNodeRight.node
  setTitleAndCtx(isDirectory, name)
  open.value = true
}
const handleOk = async () => {
  const { isDirectory, path } = props.selectNodeRight.node
  let result
  if (isDirectory) {
    result = await window.electronAPI.delMdDirectory(path)
  } else {
    result = await window.electronAPI.delMdFile(path)
  }
  if (result.success) {
    Message.success('删除成功')
    emit('updata')
    open.value = false
  }
}
const setTitleAndCtx = (isDirectory, name) => {
  isDirectory
    ? ((title.value = '删除文件夹'),
      (content.value = '确认删除文件夹：' + name))
    : ((title.value = '删除文件'), (content.value = '确认删除文件夹' + name))
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
    <span>{{ content }}？</span>
  </a-modal>
</template>
