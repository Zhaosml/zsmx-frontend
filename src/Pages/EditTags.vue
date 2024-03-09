<template v-if="user">

<div v-if="user && user.tags && user.tags.length > 0" :loading="loading">
  <van-row gutter="20" style="padding:20px;">
    <van-col v-for=" tag in user.tags" :key="tag" span="6" class="col-item">
      <div class="tags" style="padding-bottom: 20px">
        <van-tag plain :style="{ color: randomColor() }"  size="large" type="primary" >{{ tag }}</van-tag>
      </div>
    </van-col>
  </van-row>
  <van-button round block type="primary" native-type="submit" @click="addTags">
    添加自定义标签
  </van-button>
</div>

  <div v-else>
    <van-empty  description="描述文字">
      <van-button round block type="primary" native-type="submit" @click="addTags">
        添加自定义标签
      </van-button>
    </van-empty>
  </div>




  <van-dialog v-model:show="addTag" title="标题" show-cancel-button @confirm="confirm">
    <van-field maxlength="10" v-model="addTagText" type="text" placeholder="请输入标签"></van-field>
  </van-dialog>

</template>
<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {getCurrentUser} from "../service/user.js";
import { showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.ts";
const user = ref({})

const randomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}
const queryTags = async () => {
  user.value =  await getCurrentUser();
  user.value.tags = JSON.parse(user.value.tags)
}

onMounted(async ()=>{
 queryTags();
})

// const onSubmit () =>{
//
// }
//
const addTag = ref(false);
const addTags = () =>{
  addTag.value = true
}
const addTagText = ref("");
const confirm = async () => {

  // if(addTagText.value.length>10){
  //   showFailToast("标签长度最大为10")
  // }
  let tagText = addTagText.value;
  if (typeof tagText !== 'string') {
    tagText = tagText.toString();
  }
  const res = await myAxios.post('/user/addTags',tagText,{
    headers: {
      'Content-Type':'text/plain'
    }
  })
  if (res.code === 0) {
    user.value =  await getCurrentUser();
    user.value.tags = JSON.parse(user.value.tags)
    showSuccessToast("添加成功")
  } else {
    showFailToast(res.description)
  }

}

watchEffect(() => {
  queryTags();
})

</script>
<style>
.tags span {
  display: grid;
  place-items: center; /* 水平和垂直居中 */
}
</style>