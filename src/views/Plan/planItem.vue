<script setup>
import { ref } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";
import Message from "../../utils/message_ant";
const prop = defineProps(["planData"]);
const emit = defineEmits(["updata", "open"]);
const itempath = prop.planData.path;
const item = ref(JSON.parse(prop.planData.content));
const delConfirm = async () => {
  const result = await window.electronAPI.delMdFile(itempath);
  if (result.success) {
    Message.success("删除成功");
    emit("updata");
  }
};

const editItem = (v) => {
  emit("open", v);
};
</script>

<template>
  <a-card :bordered="false" :title="item.planame">
    <div style="padding-left: 1em; height: 100%">
      <p class="desp">{{ item.plandes }}</p>
      <p class="markbox">{{ item.planmark }}</p>
    </div>
    <div class="tagbox">
      <a-tag color="purple">{{ item.plantype }}</a-tag>
      <!-- <p>{{ item.plantag }}</p> -->
      <a-tag color="processing"> processing </a-tag>
    </div>

    <p class="time">{{ item.date }}</p>
    <div class="handle">
      <a-tooltip placement="top" title="修改计划">
        <iconify-icon
          icon="line-md:edit"
          width="16"
          @click="editItem({ item, itempath })"
          height="16"
        ></iconify-icon>
      </a-tooltip>

      <a-tooltip placement="top" title="删除计划">
        <a-popconfirm
          title="确认删除该计划？"
          ok-text="是"
          cancel-text="否"
          @confirm="delConfirm"
        >
          <iconify-icon
            icon="line-md:document-delete"
            width="16"
            height="16"
          ></iconify-icon>
        </a-popconfirm>
      </a-tooltip>
    </div>
  </a-card>
</template>

<style lang="less" scoped>
/deep/ .ant-card-head {
  padding: 0;
  min-height: 36px;
  font-size: 18px;
  margin-bottom: 6px;
}

/deep/ .ant-card-body {
  height: 50% !important;
  overflow: auto;
}

.time {
  position: absolute;
  bottom: 30px;
  right: 10px;
  font-size: 12px;
}

.handle {
  position: absolute;
  bottom: 0px;
  right: 8px;
  svg {
    cursor: pointer;
    margin-left: 4px;
  }
  svg:hover {
    color: #1668dc;
  }
}

.tagbox {
  position: absolute;
  bottom: 55px;
  right: 4px;
  display: flex;
}
.markbox {
  white-space: pre-line;
  height: 68px;
  overflow: auto;
}
.desp {
  font-size: 16px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
