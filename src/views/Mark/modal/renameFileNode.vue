<script setup>
import { ref } from 'vue'
import Message from '../../../utils/message_ant'
const props = defineProps(['selectNodeRight'])
const emit = defineEmits(['updata'])
const open = ref(false)
const title = ref('')
const filepathname = ref('')
const showModal = () => {
  const { isDirectory } = props.selectNodeRight.node
  isDirectory ? (title.value = '文件夹') : (title.value = 'md文件')
  open.value = true
}
const handleOk = async () => {
  const { path, isDirectory } = props.selectNodeRight.node
  let result
  if (isDirectory) {
    result = await window.electronAPI.renameMdDir({
      oldpath: path,
      newpath: filepathname.value
    })
  } else {
    result = await window.electronAPI.renameMdFile({
      oldpath: path,
      newpath: filepathname.value + '.md'
    })
  }
  if (result.success) {
    Message.success('文件夹创建成功')
    emit('updata')
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
    :title="'重命名' + title"
    @ok="handleOk"
    :cancelText="'取消'"
    :okText="'确认'"
  >
    <p style="margin: 20px 0 10px 0 !important">{{ title }}名称：</p>
    <a-input v-model:value="filepathname"></a-input>
  </a-modal>
</template>
