<script setup>
import { watch } from "vue";
import { useAntModal } from "../../../hook/useAntModal";
const { modalState, showModal, hideModal, modalData } = useAntModal();
const emit = defineEmits(["setUserRead"]);

defineExpose({
  showModal,
  hideModal,
});
watch(modalState, () => {
  if (modalState.value) {
    handleOk();
  }
});
const handleOk = () => {
  localStorage.setItem("readStaet", true);
  emit("setUserRead");
};
</script>

<template>
  <a-modal
    title="用户须知"
    v-model:open="modalState"
    @ok="handleOk"
    :footer="null"
  >
    <p>
      使用规范：请遵守国家法律法规及本产品规则，不得利用产品传播违法、违规或有害信息，不得从事破坏产品功能、影响其他用户使用的行为。​
    </p>
    <br />
    <p>
      责任声明：用户需对自身账号操作及内容负责，因违规使用、账号泄露等导致的损失，本产品不承担责任；产品提供的信息仅供参考，不构成任何承诺或担保。​
    </p>
    <br />
    <p>
      隐私保护：本产品将按隐私政策收集、使用第三方用户信息，仅用于改善服务，不会擅自泄露给第三方（法律法规要求除外）。​
    </p>
    <br />
    <p>
      测试更新：本须知可能随服务调整更新，更新后将通过产品内通知告知，继续使用即视为接受新条款。
    </p>
    <hr />
    <p>
      由于未经过正式测试，某些功能可能存在问题，下次更新预计在25年底，有需要可以自行处理（Qwq）；
      github：https://github.com/stillwarter/catbox2
    </p>
  </a-modal>
</template>
