<script setup>
import { reactive, watch, onUnmounted } from "vue";
import { useAntModal } from "../../hook/useAntModal";
import daytime from "../../utils/time";
import Message from "../../utils/message_ant";
import { timetag, planType } from "../../const";
import { createPlanEditHelper } from "./planedit";
const emit = defineEmits(["updata"]);
const { modalState, showModal, hideModal, modalData } = useAntModal();

watch(modalData, (newVal, oldVal) => {
  if (modalData.value) {
    planEditHelper.setForm(newVal);
  }
});
watch(modalState, (newVal, oldVal) => {
  if (!newVal) {
    const data = JSON.parse(JSON.stringify(defaultobj));
    Object.keys(data).forEach((key) => {
      if (formState.hasOwnProperty(key)) {
        // 只更新已有属性，避免意外添加新属性
        formState[key] = data[key];
      }
    });
  }
});

const defaultobj = {
  planame: "",
  plandes: "",
  planmark: "",
  date: daytime.format(daytime.now()),
  use: true,
  plantype: "",
  plantag: "",
};
const formState = reactive(JSON.parse(JSON.stringify(defaultobj)));
let planEditHelper = createPlanEditHelper({
  modalData,
  planType,
  timetag,
  formState,
  hideModal,
  Message,
  emit,
});

defineExpose({
  showModal,
  hideModal,
});

onUnmounted(() => {
  planEditHelper = null;
});
</script>

<template>
  <a-modal
    title="编辑计划"
    v-model:open="modalState"
    @ok="planEditHelper.handleOk"
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
        label="计划名称"
        name="planame"
        :rules="[{ required: true, message: '请输入计划名称!' }]"
      >
        <a-input v-model:value="formState.planame" />
      </a-form-item>

      <a-form-item label="计划说明" name="plandes">
        <a-input v-model:value="formState.plandes" />
      </a-form-item>

      <a-form-item label="计划记录" name="planmark">
        <a-textarea :rows="4" v-model:value="formState.planmark" />
      </a-form-item>

      <a-form-item
        label="计划类型"
        name="plantype"
        :rules="[{ required: true, message: '请输入计划类型!' }]"
      >
        <a-select
          v-model:value="formState.plantype"
          style="width: 100%"
          :options="planEditHelper.planTypeOpt"
        ></a-select>
      </a-form-item>

      <a-form-item
        label="计划标签"
        name="plantag"
        :rules="[{ required: true, message: '请输入计划标签!' }]"
      >
        <a-select
          v-model:value="formState.plantag"
          style="width: 100%"
          :options="planEditHelper.timetagOpt"
        ></a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
