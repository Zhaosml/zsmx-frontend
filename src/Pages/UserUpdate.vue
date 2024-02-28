<template>
  <template v-if="user">

<!--      <van-cell title="头像" is-link  to="/user/edit" >-->
<!--        <img style="height:48px" :src="user.avatarUrl">-->
<!--      </van-cell>-->

    <div>
      <van-row justify="center">
        <van-image
            round
            width="10rem"
            height="10rem"
            :src="user.avatarUrl"
        />
      </van-row>
    </div>

    <van-cell icon="user-circle-o"  title="昵称" is-link to="/user/edit"
              :value="user.username" @click="toEdit('username','昵称',user.username)">
      <template #right-icon>
        <van-icon class="search-icon" />
      </template>
    </van-cell>
    <van-cell icon="contact-o" title="账号" :value="user.userAccount">
      <template #right-icon>
        <van-icon class="search-icon" />
      </template>
    </van-cell>

    <van-cell icon="like-o" title="性别" is-link
              :value="user.gender"
              @click="toEdit('gender','性别',user.gender)">
      <template #right-icon>
        <van-icon class="search-icon" />
      </template>
      <template v-if="user.gender === 0">
        女
      </template>
      <template v-else>
        男
      </template>
      </van-cell>
    <van-cell icon="phone-o" title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)">
      <template #right-icon>
        <van-icon class="search-icon" />
      </template>
    </van-cell>
    <van-cell icon="envelop-o" title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)">
      <template #right-icon>
        <van-icon class="search-icon" />
      </template>
    </van-cell>
    <van-cell title="注册时间"  :value="user.createTime" />
  </template>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user.ts";

const user = ref();

onMounted(async () =>{
  user.value =  await getCurrentUser();
  // const res = await getCurrentUser();
  // if(res.data){
  //   user.value = res.data;
  //   showSuccessToast('获取用户信息成功');
  // }
  // else {
  //   showFailToast('获取用户信息失败');
  // }
})

const router = useRouter();
// const route = useRoute();

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


<style scoped>
.search-icon {
  font-size: 16px;
  line-height: inherit;
}
</style>