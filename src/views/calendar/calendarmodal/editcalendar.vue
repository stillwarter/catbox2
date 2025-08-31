<script setup>
import { reactive, ref, watch, onUnmounted } from "vue";
import { useAntModal } from "../../../hook/useAntModal";
import Message from "../../../utils/message_ant";
const { modalState, showModal, hideModal, modalData } = useAntModal();
const prop = defineProps(["data", "date", "filename"]);
const emit = defineEmits(["updata"]);

defineExpose({
  showModal,
  hideModal,
});
const handleOk = async () => {
  const filename = prop.filename;
  const itemindex = prop.date;
  const content = prop.data.value || {};
  content[itemindex] = formState.des;
  const result = await window.electronAPI.updataWorklogJson({
    filename: filename + ".json",
    content: JSON.stringify(content),
  });
  
  if (result.success) {
    Message.success("更新成功");
    emit("updata");
  }

  hideModal();
};
const defaultobj = {
  logdata: "",
  des: "",
};
const temp = ref(null);
watch(modalState, () => {
  if (modalState.value) {
    if (modalData.value) {
      temp.value = JSON.parse(modalData.value);
    }
    if (prop.data.value) {
      setlogValue(prop.data.value);
    }
  }
});
function setlogValue(v) {
  formState.des = v[prop.date];
}

const formState = reactive(JSON.parse(JSON.stringify(defaultobj)));
</script>

<template>
  <a-modal
    :title="date"
    v-model:open="modalState"
    @ok="handleOk"
    :cancelText="'取消'"
    :okText="'确认'"
  >
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      style="margin-top: 40px; margin-bottom: 40px"
    >
      <a-form-item label="日志记录" name="des">
        <a-textarea :rows="4" v-model:value="formState.des" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
