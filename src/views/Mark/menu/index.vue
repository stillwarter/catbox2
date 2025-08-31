<script setup>
import { ref, computed } from "vue";
import delTreeNode from "../modal/delTreeNode.vue";
import createFileNode from "../modal/createFileNode.vue";
import renameFileNode from "../modal/renameFileNode.vue";
import editMd from "../editMd/editMd.vue";
import synFishpi from "../modal/synFishpi.vue";
const props = defineProps(["name", "selectNodeRight", "isDirectory"]);

const emit = defineEmits(["updataTreeData"]);
const delTreeNodeRef = ref(null);
const createFileNodeRef = ref(null);
const renameFileNodeRef = ref(null);
const editMdRef = ref(null);
const synFishpiRef = ref(null);
const openDelTreeNodeModal = () => {
  delTreeNodeRef.value.showModal();
};
const openCeateFileNodeModal = (type) => {
  createFileNodeRef.value.showModal(type);
};
const openRenameTreeNodeModal = () => {
  renameFileNodeRef.value.showModal();
};
const openEditModal = () => {
  editMdRef.value.showModal();
};
const openSynFishpiModal = () => {
  synFishpiRef.value.showModal();
};
const updata = () => {
  emit("updataTreeData");
};
const key = computed(() => JSON.parse(localStorage.getItem("Fishpi")));
</script>

<template>
  <a-dropdown :trigger="['contextmenu']">
    <p>{{ name }}</p>

    <template #overlay>
      <a-menu>
        <a-menu-item key="8" @click="openEditModal" v-if="!isDirectory">
          <span>编辑</span>
        </a-menu-item>
        <a-menu-item
          key="1"
          @click="openCeateFileNodeModal('dir')"
          v-if="isDirectory"
        >
          <span>创建文件夹</span>
        </a-menu-item>
        <a-menu-item
          key="2"
          @click="openCeateFileNodeModal('file')"
          v-if="isDirectory"
        >
          <span>创建md文件</span>
        </a-menu-item>
        <!-- <a-menu-item key="3" v-if="1" @click="openRenameTreeNodeModal"
          ><span>重命名</span></a-menu-item
        > -->
        <a-menu-item key="4" @click="openDelTreeNodeModal"
          ><span>删除</span></a-menu-item
        >
        <a-menu-item
          key="5"
          v-if="!isDirectory && key"
          @click="openSynFishpiModal"
          ><span>同步到鱼排</span></a-menu-item
        >
        <!-- <a-menu-item key="6" v-if="!isDirectory"
          ><span>同步到vitepress</span></a-menu-item
        > -->
        <a-menu-item key="7" v-if="0"><span>导出</span></a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

  <delTreeNode
    ref="delTreeNodeRef"
    :selectNodeRight="selectNodeRight"
    @updata="updata"
  />

  <createFileNode
    ref="createFileNodeRef"
    :selectNodeRight="selectNodeRight"
    @updata="updata"
  />

  <renameFileNode
    ref="renameFileNodeRef"
    :selectNodeRight="selectNodeRight"
    @updata="updata"
  />

  <editMd ref="editMdRef" :selectNodeRight="selectNodeRight" @updata="updata" />

  <synFishpi ref="synFishpiRef" :selectNodeRight="selectNodeRight" />
</template>

<style lang="less" scoped>
p {
  font-size: 16px;
}
span {
  font-size: 12px;
}
</style>
