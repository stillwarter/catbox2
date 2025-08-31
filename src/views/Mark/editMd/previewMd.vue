<script setup>
import { ref, computed } from 'vue'
import { useSetStore } from '../../../store/setting'
import 'md-editor-v3/lib/preview.css'
import { MdPreview, MdCatalog } from 'md-editor-v3'
const id = 'preview-only'
const setStore = useSetStore()
const themeState = computed(() => setStore.theme)
const prop = defineProps(['selectMdContent'])
const scrollElement = document.querySelector('.Preview')
</script>

<template>
  <a-card class="Preview">
    <MdPreview
      style="height: 100%; width: 100%"
      :editorId="id"
      :modelValue="prop.selectMdContent"
      :theme="themeState === 'dark' ? 'dark' : 'vuepress'"
    />

    <MdCatalog class="catalog" :editorId="id" :scrollElement="scrollElement" />
  </a-card>
</template>

<style lang="less" scoped>
.Preview {
  display: flex;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  border-radius: 0;
  border-top: none;
  border-bottom: none;
  .catalog {
    width: 20%;
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>
