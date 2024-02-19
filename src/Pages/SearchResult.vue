<template>
  <user-card-list :user-list="userList"></user-card-list>
  <van-empty description="描述文字" v-if="!userList || userList.length < 1" >
  </van-empty>
</template>

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

const mockUser =  {
  id : 1,
  username : '傻波一',
  userAccount : 'shabiyi',
  avatarUrl : 'https://ggkt-1318325125.cos.ap-beijing.myqcloud.com/2024.01/12/02e5adcc356f46ad8cc4eb08bc998781%E9%BE%99%E7%8F%A0%E8%B6%85.jpg',
  gender : 0,
  profile:'失眠严重患者',
  phone : '11111111111',
  email : '123456@qq.com',
  userRole:'0',
  planetCode:'12345',
  tags:['java','emo','c#','mysql'],
  createTime : new Date()
};

</script>


<style scoped>

</style>