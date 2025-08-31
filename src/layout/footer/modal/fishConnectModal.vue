<script setup>
import { ref, reactive } from "vue";
import { getFishKey } from "../../../utils/fish";
import { useFishStore } from "../../../store/fish";
import Message from "../../../utils/message_ant";
const fishStore = useFishStore();
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});
const modalState = ref(false);

const showModal = (v) => {
  modalState.value = true;
};
const handleOk = async () => {
  const { password, username } = formState;
  const result = await getFishKey(username, password);
  if (result.status === 200) {
    fishStore.setFishkey(result.data.Key);
    Message.success("连接成功");
  }
  modalState.value = false;
};
defineExpose({
  showModal,
});
</script>

<template>
  <a-modal
    title="连接鱼排"
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
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <!-- 
      <a-form-item name="remember" :wrapper-col="{ offset: 4, span: 16 }">
        <a-checkbox v-model:checked="formState.remember"
          >Remember me</a-checkbox
        >
      </a-form-item> -->

      <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item> -->
    </a-form>
  </a-modal>
</template>
