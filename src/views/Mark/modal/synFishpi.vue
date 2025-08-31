<script setup>
import { ref, reactive, computed } from "vue";
import Message from "../../../utils/message_ant";
import { uploadArticle } from "../../../utils/fish";
import { useFishStore } from "../../../store/fish";
import {
  extractMdImageUrls,
  extractAltTextFromMdImage,
  replaceMdImageUrl,
  uploadArticlePut,
} from "../../../utils/fish";
import daytime from "../../../utils/time";
const fishStore = useFishStore();
const apikey = computed(() => fishStore.fishkey);
const props = defineProps(["selectNodeRight"]);
const open = ref(false);
const formState = reactive({
  articleAnonymous: false, // 默认不匿名
  articleCommentable: true, // 默认允许评论
  articleNotifyFollowers: false, // 默认不通知粉丝
  articleShowInListFlag: true, // 默认展示帖子
  articleTags: "", // 帖子tags
  articleTitle: "", // 帖子标题
  articleType: 0, // 帖子类型 1normal 2private 3broadcast 4thought 5question 固定为普通
  // 1好像是机要？0是普通
  isGoodArticle: "no", // 是否精选 固定不精选
  articleShowInList: 1,
  articleRewardContent: "\n",
  articleRewardPoint: "",
});
const mdData = ref("");
const replaceMdData = ref("");
let mdMeta = reactive({});
const showModal = async () => {
  const { path } = props.selectNodeRight.node;
  const { mdContent, mdHead } = await window.electronAPI.getMdContent(path);
  mdData.value = mdContent;
  mdMeta = mdHead;
  open.value = true;
};
const handleOk = async () => {};

/* 上传前替换本地url为鱼排url */
const uploadArticleBefore = async () => {
  const imglistName = extractMdImageUrls(mdData.value);
  const fishimglist = mdMeta.fishimgurllist;
  if (imglistName.length) {
    for (const item of imglistName) {
      const name = extractAltTextFromMdImage(item);
      const itemurl = fishimglist[name];
      replaceMdData.value = replaceMdImageUrl(mdData.value, name, itemurl);
    }
  } else {
    replaceMdData.value = mdData.value;
  }
};

/* 上传后重新设置元信息 */
const uploadArticleAfter = async (v) => {
  mdMeta.articleId = v.articleId;
  mdMeta.synFispTime = daytime.format(daytime.now());
  const { path } = props.selectNodeRight.node;
  const parmas = {
    pathname: path,
    content: mdData.value,
    meta: mdMeta,
  };
  const result = await window.electronAPI.setMdContent(parmas);
  //   if (result.success) {
  //     Message.success('记录更新成功')
  //     // emit('updata')
  //     open.value = false
  //   }
};

const onFinish = async (values) => {
  uploadArticleBefore();
  formState.articleShowInListFlag
    ? (formState.articleShowInList = 1)
    : (formState.articleShowInList = 0);
  const parma = {
    apiKey: apikey.value,
    ...formState,
    articleContent: replaceMdData.value,
  };

  if (mdMeta.articleId) {
    const result = await uploadArticlePut(mdMeta.articleId, parma);
    if (result.data.code === -1) {
      Message.error(result.data.msg);
    }

    if (result.data.code === 0) {
      Message.success("更新成功");
      open.value = false;
      uploadArticleAfter(result.data);
    }
  } else {
    const result = await uploadArticle(parma);
    if (result.data.code === -1) {
      Message.error(result.data.msg);
    }

    if (result.data.code === 0) {
      Message.success("上传成功");
      open.value = false;
      uploadArticleAfter(result.data);
    }
  }
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
defineExpose({
  showModal,
});
</script>

<template>
  <a-modal
    v-model:open="open"
    title="同步至鱼排"
    @ok="handleOk"
    :cancelText="'取消'"
    :okText="'确认'"
    :footer="null"
  >
    <a-form
      :model="formState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      style="margin-top: 40px; margin-bottom: 40px"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="帖子标题"
        name="articleTitle"
        :rules="[{ required: true, message: '请输入标题!' }]"
      >
        <a-input v-model:value="formState.articleTitle" />
      </a-form-item>

      <a-form-item
        label="帖子标签"
        name="articleTags"
        :rules="[{ required: true, message: '请输入标签!' }]"
      >
        <a-input v-model:value="formState.articleTags" />
      </a-form-item>

      <a-form-item label="是否匿名" name="articleAnonymous">
        <a-switch v-model:checked="formState.articleAnonymous" />
      </a-form-item>

      <a-form-item label="允许评论" name="articleCommentable">
        <a-switch v-model:checked="formState.articleCommentable" />
      </a-form-item>

      <a-form-item label="通知粉丝" name="articleNotifyFollowers">
        <a-switch v-model:checked="formState.articleNotifyFollowers" />
      </a-form-item>

      <a-form-item label="列表展示" name="articleShowInListFlag">
        <a-switch v-model:checked="formState.articleShowInListFlag" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 20, span: 16 }">
        <a-button type="primary" html-type="submit">上传</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
