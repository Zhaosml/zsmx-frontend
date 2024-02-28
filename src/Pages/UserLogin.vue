<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="账号"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
      <van-row  justify="end">
        <van-col span="8" >
          <van-cell class="loginUnderline" to="/user/register" value="还没有账号，点击注册" />
        </van-col>
      </van-row>
    </van-cell-group>
  </van-form>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/login',{
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(res,'用户登录')
  if (res.code === 0 && res.data){
    showSuccessToast('登录成功');
    router.replace('/')
  }
  else {
    showFailToast('登录失败');
  }
};
</script>


<style scoped>
@import "../css/loginUnderline.css";
</style>