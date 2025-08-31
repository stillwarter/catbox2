<script setup>
import { ref, reactive, computed } from 'vue'
import 'md-editor-v3/lib/style.css'
import { MdEditor } from 'md-editor-v3'
import { isEmptyObject, fileToBuffer } from '../../../utils/common'
import daytime from '../../../utils/time'
import { Stconfig } from '../../../config/stconfig'
import Message from '../../../utils/message_ant'
import { uploadFishImage } from '../../../utils/fish'
import { useFishStore } from '../../../store/fish'
import { useSetStore } from '../../../store/setting'
const setStore = useSetStore()
const themeState = computed(() => setStore.theme)
const fishStore = useFishStore()
const props = defineProps(['selectNodeRight'])
const emit = defineEmits(['updata'])
const open = ref(false)
const mdData = ref('')
let mdMeta = reactive(null)

const mdeditor = ref(null)
const showModal = async () => {
  const { path } = props.selectNodeRight.node
  const { mdContent, mdHead } = await window.electronAPI.getMdContent(path)
  mdData.value = mdContent
  if (isEmptyObject(mdHead)) {
    mdMeta = Stconfig.defaultMeta
  } else {
    mdMeta = setMdMeta(mdHead)
  }
  open.value = true
}
const handleOk = async () => {
  const { path } = props.selectNodeRight.node
  const parmas = {
    pathname: path,
    content: mdData.value,
    meta: mdMeta
  }
  const result = await window.electronAPI.setMdContent(parmas)
  if (result.success) {
    Message.success('记录更新成功')
    emit('updata')
    open.value = false
  }
  open.value = false
}

const setMdMeta = mdHead => {
  const end = mdHead
  end.update = daytime.format(daytime.now())
  if (end.isSyn2Fishpi) {
    end.synFishpiTime = daytime.format(daytime.now())
  }
  if (end.isSyn2Stblog) {
    end.synBlogTime = daytime.format(daytime.now())
  }
  return end
}

const onUploadImg = files => {
  files.map(file => {
    let imgname = ''
    fileToBuffer(file).then(async buffer => {
      const result = await window.electronAPI.uploadMdImg({
        content: buffer,
        imgtype: file.type
      })
      if (result.success) {
        imgname = `图片${Date.now()}`
        mdeditor.value.insert(() => {
          return {
            targetValue: `\n![${imgname}](${result.url})`,
            select: true,
            deviationStart: 0,
            deviationEnd: 0
          }
        })
      }
      const upimg = await uploadFishImage({
        file: [file],
        apiKey: fishStore.fishkey
      })
      if (upimg.data.code === 0) {
        const fishimgobj = upimg.data.data.succMap
        mdMeta.fishimgurllist[imgname] = Object.values(fishimgobj)[0]
      }
    })
  })
}

defineExpose({
  showModal
})
</script>

<template>
  <a-modal
    style="max-width: 100%; top: 0; padding: 0"
    v-model:open="open"
    title="编辑md记录"
    @ok="handleOk"
    :cancelText="'取消'"
    :okText="'确认'"
    :width="'100vw'"
    :closable="false"
  >
    <div style="height: calc(90vh)">
      <MdEditor
        style="height: 100%"
        ref="mdeditor"
        v-model="mdData"
        @onUploadImg="onUploadImg"
        :theme="themeState === 'dark' ? 'dark' : 'vuepress'"
      />
    </div>
  </a-modal>
</template>
