<script setup>
import { ref, computed } from "vue";
import { isWeekend } from "../calendar";
import { Icon as IconifyIcon } from "@iconify/vue";
import editcalendar from "../calendarmodal/editcalendar.vue";
const prop = defineProps(["index", "year", "month", "data"]);
const emit = defineEmits(["updata"]);
const itemdate = computed(
  () =>
    (prop.year.value || prop.year) +
    "-" +
    (prop.month.value || prop.month) +
    "-" +
    (prop.index + 1)
);
const itemdatepure = computed(
  () =>
    (prop.year.value || prop.year) +
    "" +
    (prop.month.value || prop.month) +
    "" +
    (prop.index + 1)
);
const filename = computed(
  () => (prop.year.value || prop.year) + "" + (prop.month.value || prop.month)
);
const isweekend = computed(() => isWeekend(itemdate.value));

const editcalendarRef = ref(null);
const openEditCalendar = (v) => {
  editcalendarRef.value.showModal(JSON.stringify(v));
};
const setlog = (itemdatepure) => {
  return prop.data.value[Number(itemdatepure)];
};
const updataList = () => {
  emit("updata");
};
</script>

<template>
  <div
    class="calendarcard"
    :class="
      isweekend
        ? Math.floor(Math.random() * 11) % 2 == 0
          ? 'gradient-glow'
          : 'gradient-glow-2'
        : 'gradient-glow-null'
    "
  >
    <h4 v-if="!isweekend" style="margin: 0">
      {{ itemdate }}
    </h4>
    <h4 style="margin: 0" v-else>
      {{ year }}-{{ month }}-{{ index + 1 }}(休息日)
    </h4>
    <div class="boxcotent ctx" v-if="itemdatepure">
      {{ setlog(itemdatepure) || "暂无内容" }}
    </div>

    <div class="iconbox">
      <a-tooltip placement="top" title="编写工作记录">
        <iconify-icon
          icon="line-md:pencil-alt-twotone"
          width="16"
          height="16"
          @click="
            openEditCalendar({ year: year.value, month: month.value, index })
          "
        ></iconify-icon>
      </a-tooltip>
      <a-tooltip placement="top" title="详情">
        <iconify-icon
          icon="line-md:clipboard-list-twotone"
          width="16"
          height="16"
        ></iconify-icon>
      </a-tooltip>
    </div>

    <editcalendar
      ref="editcalendarRef"
      :data="data"
      :date="itemdatepure"
      :filename="filename"
      @updata="updataList"
    />
  </div>
</template>

<style lang="less" scoped>
.calendarcard {
  min-width: 144px;
  max-width: 144px;
  height: 166px;
  flex: 1;
  border-radius: 4px;
  padding: 4px 8px;
  position: relative;
  .iconbox {
    position: absolute;
    bottom: 4px;
    right: 8px;
  }
}

.gradient-glow {
  position: relative;
  border-radius: 8px;
  /* 主体内容与边框的间距（避免被发光覆盖） */
  margin: 4px;
}

.gradient-glow-2 {
  position: relative;
  border-radius: 8px;
  /* 主体内容与边框的间距（避免被发光覆盖） */
  margin: 4px;
}

.calendarcard:hover {
  box-shadow: 0 0 10px 3px rgba(74, 144, 226, 0.6); /* 发光效果 */
}

/* 伪元素实现渐变发光边框 */
.gradient-glow::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  /* 渐变边框 */
  border: 2px solid transparent;
  /* 关键：添加背景渐变并设置动画 */
  background: linear-gradient(60deg, #ff6b6b, #4ecdc4, #45b7d1, #c609ad)
    border-box;
  background-size: 300% 300%; /* 扩大渐变范围，让旋转更流畅 */

  /* 关键：让渐变透过边框显示 */
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;

  /* 添加旋转动画 */
  animation: rotate 6s linear infinite;
}

.gradient-glow-2::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  /* 渐变边框 */
  border: 2px solid transparent;
  /* 关键：添加背景渐变并设置动画 */
  background: linear-gradient(90deg, #8c8a8a, #77e380, #f096dd, #101010)
    border-box;
  background-size: 300% 300%; /* 扩大渐变范围，让旋转更流畅 */

  /* 关键：让渐变透过边框显示 */
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;

  /* 添加旋转动画 */
  animation: rotate 8s linear infinite;
}

/* 旋转动画关键帧 */
@keyframes rotate {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100%,
  0% {
    background-position: 0% 50%;
  }
}

.gradient-glow-null {
  position: relative;
  border-radius: 8px;
  /* 主体内容与边框的间距（避免被发光覆盖） */
  margin: 4px;
}
.gradient-glow-null::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  /* 渐变边框 */
  border: 2px solid transparent;
  /* 关键：添加背景渐变并设置动画 */
  background: linear-gradient(60deg, #f1efef, #1b1b1b) border-box;
  background-size: 300% 300%; /* 扩大渐变范围，让旋转更流畅 */

  /* 关键：让渐变透过边框显示 */
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.ctx {
  white-space: pre-line;
  font-size: 12px;
  overflow: auto;
}

.boxcotent {
  padding-left: 1em;
  padding-top: 0.2em;
  height: 65%;
  overflow: auto;
  position: relative;
  z-index: 100;
}
</style>
