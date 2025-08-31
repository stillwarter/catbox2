<script setup>
import { computed, ref, onMounted } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";
import systemInfoModal from "./modal/systemInfoModal.vue";
import fishConnectModal from "./modal/fishConnectModal.vue";
import useReadModal from "./modal/useReadModal.vue";
import { useSetStore } from "../../store/setting";
import { useFishStore } from "../../store/fish";
import fontMove from "../../stillwarter/catboxComponent/fontMove.vue";
import { Stconfig } from "../../config/stconfig";
import { checkAimPath, getValueByKey } from "../../utils/gitFn";
import setGitFileModal from "./modal/setGitFileModal.vue";
import { updataGitFile } from "../../utils/gitFn";
import Message from "../../utils/message_ant";
const setStore = useSetStore();
const fishStore = useFishStore();
const themeState = computed(() => setStore.theme);
const fishkey = computed(() => fishStore.fishkey);
const systemInfoModalRef = ref(null);
const fishConnectModalRef = ref(null);
const setGitFileModalRef = ref(null);
const useReadModalRef = ref(null);
const systemInfo = ref("");
const stwordState = computed(() => Stconfig.stwords);
const loadingState = ref(false);

const userReadRef = ref(null);
onMounted(() => {
  const userRead = localStorage.getItem("readStaet");
  userReadRef.value = userRead;

  if (!userRead) {
    localStorage.setItem("readStaet", false);
  }
});
const setUserRead = () => {
  userReadRef.value = true;
};
const getSystemInfo = async () => {
  systemInfo.value = await window.electronAPI.getsystemInfo();
  systemInfoModalRef.value.showModal(systemInfo.value);
};

const openFishConnectModal = () => {
  fishConnectModalRef.value.showModal(systemInfo.value);
};

const openGitFileModal = () => {
  setGitFileModalRef.value.showModal();
};
const openuseReadModal = () => {
  useReadModalRef.value.showModal();
};

const toggleDark = () => {
  themeState.value == "dark" ? setStore.themeDefault() : setStore.themeDark();
};

const setGitFile = async () => {
  if (checkAimPath()) {
    loadingState.value = true;
    const result = await updataGitFile();
    if (result) {
      const key = Number(getValueByKey(result, "key"));
      if (key === 0) Message.success("同步成功");
      if (key === 2) Message.warning("git add失败");
      if (key === 3) Message.warning("没有要提交的内容");
      if (key === 4) Message.warning("git push失败");
    } else {
      Message.error("环境检查失败，请检查是否设置好对应脚本文件和bash环境");
    }
    loadingState.value = false;
  } else {
    openGitFileModal();
  }
};
</script>

<template>
  <a-card class="footerbox">
    <a-tooltip placement="topLeft" title="系统信息">
      <iconify-icon
        icon="tdesign:system-setting"
        width="18"
        height="18"
        @click="getSystemInfo"
      ></iconify-icon>
    </a-tooltip>

    <a-tooltip placement="topLeft" title="连接鱼排">
      <iconify-icon
        v-if="!fishkey"
        icon="tdesign:fish"
        width="18"
        height="18"
        @click="openFishConnectModal"
      ></iconify-icon>
      <iconify-icon
        v-else="fishkey"
        icon="tdesign:fish-filled"
        width="18"
        height="18"
        @click="openFishConnectModal"
      ></iconify-icon>
    </a-tooltip>

    <a-tooltip
      v-if="themeState === 'dark'"
      placement="topLeft"
      title="夜晚模式"
    >
      <iconify-icon
        icon="line-md:sunny-outline-to-moon-loop-transition"
        width="18"
        height="18"
        @click="toggleDark"
      >
      </iconify-icon>
    </a-tooltip>

    <a-tooltip v-else placement="topLeft" title="日间模式">
      <iconify-icon
        icon="line-md:sunny-outline-twotone-loop"
        width="18"
        height="18"
        @click="toggleDark"
      ></iconify-icon>
    </a-tooltip>

    <a-tooltip placement="topLeft" title="git同步"
      ><iconify-icon
        :icon="
          !loadingState
            ? 'line-md:cloud-alt-upload'
            : 'line-md:cloud-alt-upload-loop'
        "
        :style="loadingState ? 'color:red' : ''"
        width="20"
        height="20"
        @click="setGitFile"
      >
      </iconify-icon>
    </a-tooltip>

    <a-tooltip placement="topLeft" title="用户须知"
      ><iconify-icon
        icon="line-md:confirm-circle-twotone"
        width="20"
        height="20"
        :style="!userReadRef ? 'color:red' : ''"
        @click="openuseReadModal"
      >
      </iconify-icon>
    </a-tooltip>

    <systemInfoModal ref="systemInfoModalRef" />
    <fishConnectModal ref="fishConnectModalRef" />
    <setGitFileModal ref="setGitFileModalRef" />
    <useReadModal ref="useReadModalRef" @setUserRead="setUserRead" />

    <div v-if="stwordState" class="wordbox" @ok="setGitFile">
      <fontMove />
    </div>
  </a-card>
</template>

<style lang="less" scoped>
.footerbox {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 0 !important;
  position: relative;

  svg {
    cursor: pointer;
    margin-right: 8px;
  }

  svg:hover {
    color: #4493f8;
  }
}

.wordbox {
  position: absolute;
  right: 10px;
}

/deep/ .ant-card-body {
  padding: 0;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
}
</style>
