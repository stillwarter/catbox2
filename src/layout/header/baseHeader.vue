<script setup>
import { goTo } from "../../utils/routerSkip";
import { Icon as IconifyIcon } from "@iconify/vue";

const toHome = goTo("main");
const toMark = goTo("mark");
const toPlan = goTo("plan");
const toCalendar = goTo("calendar");
</script>

<template>
  <a-card class="headerbox">
    <a-tooltip placement="topLeft" title="摸鱼笔记首页">
      <iconify-icon
        icon="tdesign:home"
        width="18"
        height="18"
        @click="toHome"
      ></iconify-icon>
    </a-tooltip>
    <a-tooltip placement="topLeft" title="Markdown记录">
      <iconify-icon
        icon="tdesign:user-marked"
        width="18"
        height="18"
        @click="toMark"
      ></iconify-icon>
    </a-tooltip>
    <a-tooltip placement="topLeft" title="日常工作记录">
      <iconify-icon
        icon="tdesign:work-history"
        width="18"
        height="18"
        @click="toCalendar"
      ></iconify-icon>
    </a-tooltip>
    <a-tooltip placement="topLeft" title="计划与规划">
      <iconify-icon
        icon="tdesign:compass"
        width="18"
        height="18"
        @click="toPlan"
      ></iconify-icon>
    </a-tooltip>
  </a-card>
</template>

<style lang="less" scoped>
.headerbox {
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

/deep/ .ant-card-body {
  padding: 0;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
}
</style>
