<template>
  <div class="wordsctx" @click="setCurWord(0)">
    <span>{{ curwordStr }}</span>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { wordsList } from "../../../public/words/words";
let wordsIndex = 0;
let wordList = splitSentenceIntoWords(wordsList[wordsIndex]);
const curwordRef = ref([]);

// 设置当前word值
function setCurWord(i) {
  if (curwordRef.value.length == wordList.length) {
    setTimeout(() => {
      clearWord();
    }, 2000);
    return;
  } else {
    setTimeout(() => {
      curwordRef.value.push(wordList[i]);
      let nexti = i + 1;
      setCurWord(nexti);
    }, 150);
  }
}

// 清空word值
function clearWord() {
  if (curwordRef.value.length == 0) {
    nextWords();
    return;
  } else {
    setTimeout(() => {
      curwordRef.value.pop();
      clearWord();
    }, 60);
  }
}

// 加载下一个word
function nextWords() {
  const newtWordsIndex = wordsIndex + 1;
  if (newtWordsIndex == wordsList.length) {
    wordsIndex = 0;
    wordList = splitSentenceIntoWords(wordsList[wordsIndex]);
  } else {
    wordsIndex = newtWordsIndex;
    wordList = splitSentenceIntoWords(wordsList[newtWordsIndex]);
  }
  setTimeout(() => {
    setCurWord(0);
  }, 2000);
}

// word转数组
function splitSentenceIntoWords(sentence) {
  return sentence.split("");
}

// 数组转word
function arrayToString(arr, separator = "") {
  return arr.join(separator);
}

// 当前wordstr值
const curwordStr = computed(() => {
  return arrayToString(curwordRef.value);
});

onMounted(() => {
  setTimeout(() => {
    setCurWord(0);
  }, 10);
});
</script>

<style lang="less" scoped>
.wordsctx {
  height: var(--adminfooter-height);
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 55vw;
  }
}
</style>