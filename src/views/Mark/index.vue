<script setup>
import { ref } from "vue";
import createFile from "./modal/createFileRoot.vue";
import treeboxhead from "./head/index.vue";
import treeMenu from "./menu/index.vue";
import previewMd from "./editMd/previewMd.vue";
const mdTreeData = ref(null);
const fieldNames = {
  title: "name",
};
const createFileRef = ref(null);
const openCreateFileModal = () => {
  createFileRef.value.showModal();
};

async function updataTreeData() {
  const list = await window.electronAPI.getMdMarkList();
  const result = filterTree(list.children);
  mdTreeData.value = result;
}
updataTreeData();

const selectNode = ref(null);
const selectMdContent = ref("");
const handleNodeSelect = async (selectedKeys, info) => {
  selectNode.value = info;
  const { path, isDirectory } = info.node;
  if (isDirectory) {
  } else {
    const { mdContent, mdHead } = await window.electronAPI.getMdContent(path);
    selectMdContent.value = mdContent;
  }
};

const selectNodeRight = ref(null);
const handleNodeRightClick = (info) => {
  selectNodeRight.value = info;
};

function filterTree(tree) {
  // 如果不是数组，直接返回空数组或原数据
  if (!Array.isArray(tree)) {
    return [];
  }

  // 递归处理每个节点
  return tree.reduce((result, node) => {
    // 检查节点是否符合过滤条件
    const isNameValid =
      node.name &&
      !node.name.startsWith(".") && // 排除以'.'开头的名字
      !node.name.endsWith("sh"); // 排除以'sh'结尾的名字

    // 如果当前节点有效
    if (isNameValid) {
      // 递归处理子节点（如果有）
      const children = node.children ? filterTree(node.children) : [];

      // 创建新节点，保留原节点的所有属性，替换处理后的子节点
      const newNode = {
        ...node,
        children, // 如果子节点全部被过滤，这里会是一个空数组
      };

      result.push(newNode);
    }
    return result;
  }, []);
}
</script>

<template>
  <a-card v-if="mdTreeData" class="markbox cardnoradius">
    <div class="treebox">
      <div class="treeboxhead">
        <treeboxhead @openCreateFileModal="openCreateFileModal" />
        <createFile
          ref="createFileRef"
          title="创建文件夹"
          @updataTreeData="updataTreeData"
        />
      </div>
      <a-tree
        :tree-data="mdTreeData"
        :field-names="fieldNames"
        default-expand-all
        @select="handleNodeSelect"
        @right-click="handleNodeRightClick"
      >
        <template #title="{ name, isDirectory }">
          <treeMenu
            :name="name"
            :isDirectory="isDirectory"
            :selectNodeRight="selectNodeRight"
            @updataTreeData="updataTreeData"
          />
        </template>
      </a-tree>
    </div>
    <previewMd :selectMdContent="selectMdContent" />
  </a-card>
</template>

<style lang="less" scoped>
.markbox {
  display: flex;
  width: 100%;
  height: 100%;
  .treebox {
    height: 100%;
    overflow: auto;
    width: 20%;
    min-width: 180px;
    padding: 10px 16px;
    border-radius: 0 !important;
    .treeboxhead {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

/deep/ .ant-tree {
  transition: none !important;
}

/deep/ .ant-card-body {
  width: 100% !important;
  display: flex;
}
</style>
