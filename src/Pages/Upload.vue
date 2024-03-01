<template v-if="user">

  <van-uploader   multiple :before-read="beforeRead" :after-read="afterRead" :max-size="isOverSize">
    <van-button icon="plus" type="primary">上传文件</van-button>
  </van-uploader>

  <van-form @submit="onSubmit">
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" :disabled="loading">
        {{ loading ? '上传中...' : '提交' }}
      </van-button>
    </div>
  </van-form>




</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user.ts";
import {showFailToast, showSuccessToast, showToast} from "vant";
import myAxios from "../plugins/myAxios.ts";
import {useRouter} from "vue-router";
const router = useRouter();
const user = ref();
const loading = ref(false); // 添加加载状态

// 加载当前用户的信息
onMounted(async () =>{
  user.value =  await getCurrentUser();
})

// 上传头像到腾讯cos  并且保存头像到当前页面
const afterRead = async (file) => {
  loading.value = true; // 显示加载状态
  const formData = new FormData();
  formData.append("file", file.file, file.file.name);
  formData.append("Content-Length", file.file.size);
  const res = await myAxios.post("user/file/upload", formData);
  if (res.code === 0) {
    user.value.avatarUrl = res.data
    showSuccessToast("上传成功")
  } else {
    showFailToast("上传失败")
  }
  loading.value = false; // 隐藏加载状态
  // 此时可以自行将文件上传至服务器
  console.log(user.value.avatarUrl);
};



// 上传前置处理 上传校验
const beforeRead = (file) => {
  if (file.type !== 'image/jpeg') {
    showToast('请上传 jpg 格式图片');
    return false;
  }
  return true;
};

// 文件大小
const isOverSize = (file) => {
  const maxSize = file.type === 'image/jpeg' ? 500 * 1024 : 1000 * 1024;
  return file.size >= maxSize;
};
// 修改头像
const onSubmit = async () =>{
  if(loading.value == false){
    showFailToast('还未上传头像');
    return;
  }
  const res = await myAxios.post('user/update',{
    id:user.value.id,
    avatarUrl:user.value.avatarUrl
  })
  if(res.code === 0 && res.data > 0){
    showSuccessToast('修改成功');
    router.back();
  }
  else {
    showFailToast('修改失败');
  }
}

</script>


<style scoped>

</style>