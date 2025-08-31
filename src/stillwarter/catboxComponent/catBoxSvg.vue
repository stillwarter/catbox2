<template>
  <div ref="svgbox" class="svgbox" @click="svgboxClick">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject, reactive } from "vue";

const svgbox = ref();

const pathTo = () => {
  if (props.topath) {
    router.push("/" + props.topath);
  }
};

const props = defineProps({
  svgclick: {
    type: [Function],
    default: null,
  },
  svgsize: {
    type: [Number, String],
    default: "15px",
  },
  topath: {
    type: [String, null],
    default: null,
  },
});

const svgboxClick = computed(() => {
  if (props.topath) {
    return pathTo;
  } else {
    return props.svgclick;
  }
});

// svgbox初始化
onMounted(() => {
  const svgdom = svgbox.value.children[0].children[0];
  svgdom.setAttribute("width", props.svgsize);
});
</script>

<style lang="less">
.svgbox {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 8px;
  transition: all ease-in 0.3s;
}
.svgbox:hover {
  path {
    fill: rgb(214, 110, 24) !important;
  }
}

.svgbox[data-mode="day"] {
}
.svgbox[data-mode="dark"] {
  path {
    fill: #fff;
  }
}
</style>
