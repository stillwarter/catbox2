<script setup>
import { ref, defineExpose, computed } from "vue";
const openData = ref(null);
const modalState = ref(false);
const key = computed(() => JSON.parse(localStorage.getItem("Fishpi")));
const showModal = (v) => {
  modalState.value = true;
  // openData.value = Object.entries(JSON.parse(v.more.value))
  openData.value = JSON.parse(v.more.value);
};
const handleOk = () => {};
defineExpose({
  showModal,
});
</script>

<template>
  <a-modal
    v-model:open="modalState"
    title="系统信息"
    @ok="handleOk"
    :cancelText="'取消'"
    :okText="'确认'"
  >
    <!-- <div v-for="(item, index) in openData" :key="index">
      {{ item[0] }}:{{ item[1] }}
    </div> -->
    <p>electron版本：{{ openData.versions.electron }}</p>

    <p>chrome版本：{{ openData.versions.chrome }}</p>

    <p>platform平台：{{ openData.platform }}</p>
    <p>
      ProxyServer代理服务：
      <span>{{ openData.ProxyServer ? "已启动" : "未启动" }}</span>
    </p>

    <p>
      静态图片服务：
      <span>{{ openData.staticImg ? "已启动" : "未启动" }}</span>
    </p>
    <p v-if="key">鱼排连接状态：已连接</p>
    <p v-else>鱼排连接状态：未连接</p>
  </a-modal>
</template>
