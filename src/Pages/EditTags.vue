<template>
  <template v-if="user">
      <van-cell icon="label-o" is-link  to="/user/edit" :value="user.tags"
                @click="toEdit('tags','标签',user.tags)">
        <template #title>
          <span class="custom-title">我的标签</span>
        </template>
        <van-tag plain type="primary" v-for="tag in user.tags" style="margin-left: 8px; margin-top: 8px"  >
          {{tag}}
        </van-tag>
      </van-cell>
  </template>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user.ts";

const router = useRouter();
const user = ref()

//修改按钮
onMounted(async () =>{
  user.value =  await getCurrentUser();
  if(!user.value){
    router.push({
      path: '/user/login'
    })
  }
  // todo 扩展内容之标签显示
  user.value.tags = JSON.parse(user.value.tags)
})

const toEdit = (editKey:string,editName:string,currentValue:string) => {
  router.push({
    path:'/user/edit',
    query:{
      editKey,
      editName,
      currentValue,
    },
  })
}

</script>
