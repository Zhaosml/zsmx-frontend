<template>
  <template v-if="user">
    <van-cell title="昵称" :value="user?.username"/>
    <van-cell title="头像"  >
      <img style="height:48px" :src="user.avatarUrl">
    </van-cell>
  </template>
  <van-cell title="修改信息" is-link to="/user/team/update" />
  <van-cell title="我创建的队伍" is-link to="/user/team/create" />
  <van-cell title="我加入的队伍" is-link to="/user/team/join" />
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user.ts";
const router = useRouter();
const user = ref();

onMounted(async () =>{
  user.value =  await getCurrentUser();
  if(!user.value){
    router.push({
      path: '/user/login'
    })
  }
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

