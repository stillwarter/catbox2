<script setup>
import { ref, onUnmounted } from "vue";
import planedit from "./planedit.vue";
import planItem from "./planItem.vue";
import { createPlanHelper } from "./plan";
let planList = ref([]);
const hideModalRef = ref(null);
let planHelper = createPlanHelper({
  planList,
  hideModalRef,
});

const open = planHelper.open;
const getPlan = planHelper.getPlan;
getPlan();
onUnmounted(() => {
  planHelper = null;
});
</script>

<template>
  <a-card class="planbox cardnoradius">
    <a-button @click="open(0)" type="primary">新增任务</a-button>
    <div class="cardbox">
      <div class="itembox" v-for="(item, index) in planList" :key="index">
        <planItem :planData="item" @open="open" @updata="getPlan" />
      </div>
    </div>
    <planedit ref="hideModalRef" @updata="getPlan" />
  </a-card>
</template>

<style lang="less" scoped>
.planbox {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  /deep/ .ant-card-body {
    display: block !important;
  }
  .cardbox {
    margin-top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
}

// /deep/ .ant-card-body {
//   width: 100% !important;
//   display: flex;
// }

.itembox {
  width: 220px;
  height: 240px;
  border: 2px solid pink;
  margin-right: 24px;
  padding: 4px;
  border-radius: 4px;
  padding-top: 2px;
  position: relative;
  transition: all linear 0.3s;
  margin-bottom: 14px;
  /deep/ .ant-card {
    height: 100%;
    padding: 8px;
    padding-top: 4px;
  }

  /deep/ .ant-card-body {
    height: auto !important;
  }
}
.itembox:hover {
  box-shadow: 0 0 10px 3px rgba(52, 152, 219, 0.6);
}
</style>
