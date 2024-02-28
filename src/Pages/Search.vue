<template>
  <form action="/">
    <van-search
        v-model="SearchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 20px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>


</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter();
//分类选择标签    已选择标签
const SearchText = ref('');
//已选择标签
const activeIds = ref([]);
const activeIndex = ref(0);
const show = ref(true);


const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
      {text: '大111', id: '大111'},
      {text: '大222', id: '大222'},
    ],
  },
];
let tagList = ref(originTagList)

//搜索标签
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempPrentTag = {...parentTag};
    tempPrentTag.children = tempChildren.filter(item => item.text.includes(SearchText.value))
    return tempPrentTag;
  })
};

const onCancel = () => {
  SearchText.value = '';
  tagList.value = originTagList;
};

const close = () => {
  show.value = false;
};

const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}
/**
 * 执行搜索后
 */
const doSearchResult = () => {

  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}



</script>


<style scoped>

</style>