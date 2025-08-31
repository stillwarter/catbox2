<script setup>
import { ref } from 'vue'
import Message from '../../../utils/message_ant'
const props = defineProps(['selectNodeRight'])
const emit = defineEmits(['updata'])
const open = ref(false)
const title = ref('')
const filepathname = ref('')
const filetype = ref('')
const showModal = type => {
  type === 'dir' ? (title.value = '文件夹') : (title.value = 'md文件')
  filetype.value = type
  open.value = true
}
const handleOk = async () => {
  const { path } = props.selectNodeRight.node
  let aimpath = ''
  let result
  if (filetype.value === 'dir') {
    aimpath = path + '\\' + filepathname.value
    result = await window.electronAPI.addMdDirectory(aimpath)
  } else {
    aimpath = path + '\\' + filepathname.value + '.md'
    result = await window.electronAPI.addMdFile(aimpath)
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
    :title="'创建' + title"
    @ok="handleOk"
    :cancelText="'取消'"
    :okText="'确认'"
  >
    <p style="margin: 20px 0 10px 0 !important">{{ title }}名称：</p>
    <a-input v-model:value="filepathname"></a-input>
  </a-modal>
</template>
