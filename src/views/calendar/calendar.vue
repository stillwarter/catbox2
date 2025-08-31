<script setup>
import { ref, onUnmounted, watch } from "vue";
import { yearsOpt, monthsOpt } from "./calendar";
import { createCalendarConst } from "./calendarConst";
import { createCalendarFn } from "./calendarFn";
let calendarConst = createCalendarConst({ ref });
let calendarFn = createCalendarFn({ calendarConst });
import calendarItem from "./calendarItem/calendarItem.vue";
onUnmounted(() => {
  calendarFn = null;
  calendarConst = null;
});

async function getWorklogStart() {
  await calendarFn.getWorklog();
}
getWorklogStart();
</script>

<template>
  <div class="calendarbox" v-if="calendarConst && createCalendarFn">
    <div class="calendarPicker">
      <a-select
        style="width: 15%; margin-right: 22px"
        v-model:value="calendarConst.choseYaer"
        :options="yearsOpt"
        @change="calendarFn.yearChange"
      ></a-select>

      <a-select
        style="width: 10%"
        :options="monthsOpt"
        v-model:value="calendarConst.choseMonth"
        @change="calendarFn.monthChange"
      ></a-select>
    </div>
    <div class="calendarItembox">
      <calendarItem
        v-for="(item, index) in calendarConst.choseCountDays.value"
        :key="index"
        :index="index"
        :year="calendarConst.choseYaer"
        :month="calendarConst.choseMonth"
        :data="calendarConst.choseDaysData"
        @updata="getWorklogStart"
      >
      </calendarItem>
    </div>
  </div>
</template>
<style lang="less" scoped>
.calendarbox {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .calendarPicker {
    width: 100%;
    height: 60px;
    padding: 0px 18px;
    display: flex;
    align-items: center;
  }
  .calendarItembox {
    width: 100%;
    height: calc(100% - 60px);
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: flex-start;
    padding-left: 18px;
    gap: 12px 15px;
  }
}
</style>
