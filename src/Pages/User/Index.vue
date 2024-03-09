<template>
  <van-search v-model="userList.username" placeholder="请输入用户名称搜索"  @search="onSearch"/>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchModel" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1"  description="数据为空" >
  </van-empty>
</template>

<script setup lang="ts">
// 注释了 ts="lang" 红色提示太多了
import {useRoute} from "vue-router";
import {ref, watchEffect} from "vue";
import qs from 'qs';
import myAxios from '../../plugins/myAxios.ts';
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;

const onSearch = (val) => {
  listUser(val)
};

const listUser = async (val='') => {
  const res = await myAxios.get("/user/search",{
    params:{
      username: userList.value.username,
      pageNum:1,
    }
  })
  if(res?.code === 0 ){
    userList.value = res.data
  }
  if(res.data === null){
    userList.value = []
    console.log('队伍为空')
  }
  else {
    // showFailToast('请求失败');
  }
}


const isMatchModel = ref<boolean>(false)

const userList = ref([]);
const loading = ref(true);
const loadData = async () => {
  let userListData;
  loading.value=true
    if(isMatchModel.value){
      const num = 10;
      const userListData = await myAxios.get('/user/match',{
        params:{
          num
        },
      })
          .then(function(respose){
            console.log('/user/match succeed',respose)
            showSuccessToast('请求成功');
            return respose?.data;
          }).catch(function (error){
            console.log('/user/match error',error)
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
    }
    else {
       userListData = await myAxios.get('/user/recommend',{
        params:{
          pageSize:8,
          pageNum:1
        },
      }).then(function (respose){
        console.log('/user/recommend succeed',respose)
        showSuccessToast('请求成功');
        return respose?.data?.records;
      }).catch(function (error){
        console.log('/user/recommend error',error)
        showFailToast('请求失败');
      })
      // console.log(userListData);
      if(userListData){
        userListData.forEach(user=>{
          if(user.tags){
            user.tags = JSON.parse(user.tags);
          }
        })
        userList.value = userListData;
      }
    }
  loading.value=false

}
watchEffect(() => {
  loadData();
})






</script>


<style scoped>

</style>