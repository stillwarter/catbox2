<script setup>
import { ref, reactive } from "vue";
const emit = defineEmits(["ok"]);
const formState = reactive({
  filename: "",
});
const formRef = ref(null);
const modalState = ref(false);

const showModal = (v) => {
  modalState.value = true;
  const filename = localStorage.getItem("gitFile");
  if (filename) {
    formState.filename = filename;
  }
};
const handleOk = async () => {
  await formRef.value.validate();
  try {
    localStorage.setItem("gitFile", formState.filename);
    emit("ok");
    modalState.value = false;
  } catch (errorInfo) {
    message.error("表单验证失败，请检查输入内容");
    console.log("验证失败:", errorInfo);
  }
};
defineExpose({
  showModal,
});
</script>

<template>
  <a-modal
    title="设置同步仓库名称"
    v-model:open="modalState"
    @ok="handleOk"
    :cancelText="'取消'"
    :okText="'确认'"
  >
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      style="margin-top: 40px; margin-bottom: 40px"
    >
      <a-form-item
        label="同步仓库名称"
        name="filename"
        :rules="[{ required: true, message: '请输入名称!' }]"
      >
        <a-input v-model:value="formState.filename" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
