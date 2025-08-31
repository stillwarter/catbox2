<script setup>
import { ref } from 'vue'
import daytime from '../utils/time'
const timebox = ref('')
setInterval(() => {
  timebox.value = daytime.format(daytime.now())
}, 1000)
</script>

<template>
  <div class="index">
    <h1>摸鱼笔记</h1>
    <span>{{ timebox }}</span>
  </div>
</template>

<style lang="less" scoped>
.index {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  p {
    font-size: 18px;
  }
  span {
    font-size: 12px;
  }
}
</style>
