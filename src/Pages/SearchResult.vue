<template>
  <user-card-list :user-list="userList"></user-card-list>
  <van-empty description="暂无所选标签的用户" v-if="!userList || userList.length < 1" >
  </van-empty>
</template>
x`
<script setup lang="ts">
// 注释了 ts="lang" 红色提示太多了
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import qs from 'qs';
import myAxios from '../plugins/myAxios.ts';
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const userList = ref([]);
onMounted(async()=>{
  const userListData = await myAxios.get('/user/search/tags',{
    params:{
      tagNameList:tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  }).then(function (respose){
    console.log('/user/search/tags succeed',respose)
    showSuccessToast('请求成功');
    return respose.data;
  }).catch(function (error){
    console.log('/user/search/tags error',error)
    showFailToast('请求失败');
  })

  console.log(userListData);
  if(userListData){
    userListData.forEach(user=>{
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
      userList.value = userListData;  
  }
})

const {tags} = route.query;


</script>


<style scoped>

</style>