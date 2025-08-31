<script setup>
import { computed } from "vue";
import { theme } from "ant-design-vue";
import { useSetStore } from "./store/setting";
const setStore = useSetStore();
const themeState = computed(() => setStore.theme);
import zhCN from "ant-design-vue/es/locale/zh_CN";

const locale = zhCN;
const themes = computed(() => {
  return {
    algorithm:
      themeState.value == "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };
});

/* ipc test data */
const getTestData = async () => {
  // const end = await window.electronAPI.getMdMarkList();
  // planList = end;
  // console.log(planList);
};
getTestData();
/* end */
</script>

<template>
  <a-config-provider :theme="themes" :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>
