<template>
  <template v-if="user">
    <van-row gutter="10">
      <van-col span="6" style="margin: 0px 10px 0px 20px; padding: 10px 0px">
        <img :src="user.avatarUrl ?? defaultImage" class="userImage">
      </van-col>
      <van-col span="12" style="padding: 20px 0px">
        <van-row style="padding-bottom: 10px">{{user.username}}</van-row>
        <van-row style="font-size: 14px; color: #888888" >简介：{{user.profile}}</van-row>
      </van-col>
    </van-row>

    <van-cell icon="label-o" :value="user.tags"
            >
      <template #title>
        <span class="custom-title">我的标签</span>
      </template>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-left: 8px; margin-top: 8px"  >
        {{tag}}
      </van-tag>
    </van-cell>

  </template>
  <van-cell title="修改信息" is-link to="/user/team/update" />
  <van-cell title="我创建的队伍" is-link to="/user/team/create" />
  <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <div style="margin: 16px;">
      <van-button  round block type="danger" native-type="submit" @click="logOut" >
        退出登录
      </van-button>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../service/user.ts";
import myAxios from "../../plugins/myAxios.ts";
import {showSuccessToast} from "vant";
import defaultImage from "../../../public/defalutTeamImg.jpg";
const router = useRouter();
const user = ref();
/**
 * 退出登录
 */
const logOut = async () => {
   const res = await myAxios.post('/user/logout')
   if(res.data === 1){
    showSuccessToast('退出登录');
     router.push({
       path: '/user/login'
     })
   }
}

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

const toTags = (editKey:string,editName:string,currentValue:string) => {
  router.push({
    path:'/user/tags',
    query:{
      editKey,
      editName,
      currentValue,
    },
  })
}


</script>

<style>
@import '../../css/image.css';

</style>
