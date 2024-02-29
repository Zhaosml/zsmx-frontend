<template>
  <template v-if="user">
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
    <van-cell icon="user-circle-o" title="头像" is-link to="/upload">

    </van-cell>

    <van-cell icon="label-o" is-link  to="/user/edit" :value="user.tags"
              @click="toEdit('tags','标签',user.tags)">
      <template #title>
        <span class="custom-title">我的标签</span>
      </template>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-left: 8px; margin-top: 8px"  >
        {{tag}}
      </van-tag>
    </van-cell>
    <van-cell icon="user-circle-o"  is-link to="/user/edit" :value="user.username"
              @click="toEdit('username','昵称',user.username)">
      <template #title>
        <span class="custom-title">昵称</span>
      </template>
    </van-cell>
    <van-cell icon="contact-o" title="账号" :value="user.userAccount">
      <template #right-icon>
        <van-icon class="search-icon" />
      </template>
    </van-cell>
    <van-cell icon="like-o" is-link
              :value="user.gender"
              @click="toEdit('gender','性别',user.gender)">
      <template #title>
        <span class="custom-title">性别</span>
      </template>
      <template v-if="user.gender === 0">
        女
      </template>
      <template v-else>
        男
      </template>
    </van-cell>
    <van-cell icon="phone-o"  is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)">
      <template #title>
        <span class="custom-title">电话</span>
      </template>
    </van-cell>
    <van-cell icon="envelop-o" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)">
      <template #title>
        <span class="custom-title">邮箱</span>
      </template>
    </van-cell>
    <van-cell icon="underway-o" :value="user.createTime">
      <template #title>
        <span class="custom-title">注册时间</span>
      </template>
    </van-cell>
  </template>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../service/user.ts";
import myAxios from "../../plugins/myAxios.ts";
import {showSuccessToast} from "vant";

const user = ref();

const afterRead = async (file) => {
  const formData = new FormData();
  formData.append("file", file.file);
  const res = await myAxios.post('/user/file/upload', formData);

  if(res.code == 0){
    showSuccessToast("上传成功")
  }
  else {
    showSuccessToast("上传失败")
  }
  // 此时可以自行将文件上传至服务器
  console.log(file);
};

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
  user.value.tags = JSON.parse(user.value.tags)

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
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>