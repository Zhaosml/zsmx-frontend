<template>
  <div><img width="20px" height="15px" :src="kunkunheiying"></div>
  <div>

    <van-row justify="center" style="padding-top: 60px" >
      <van-image
          round
          width="10rem"
          height="10rem"
          :src="kunkun" class="userImage"
      />
    </van-row>
    <van-row justify="center" style="font-size: 20px; font-weight: bold; padding-top: 30px; padding-bottom: 30px">"心语——寻找知音之友"</van-row>

  </div>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="账号"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ validator: validateUserAccount, message: '长度在4~16之间，允许字母数字下划线' }]"
      />
      <van-field
          v-model="userPassword"
          :type="showPassword ? 'text' : 'password'"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ validator,message:'长度在8~18之间，允许字母数字下划线' }]"
          :right-icon="showPassword ? zhengyan : biyan"
          @click-right-icon="showPassword = !showPassword " />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
      <van-row >
        <van-col offset="8"  span="14" >
          <van-cell  class="loginUnderline" to="/user/register" value="还没有账号，点击注册" />
        </van-col>
      </van-row>
    </van-cell-group>
  </van-form>

</template>

<script setup lang="ts">
import kunkun from "../../../public/坤坤.webp";
import kunkunheiying from "../../../public/坤坤黑银.jpeg";
import zhengyan from "../../../public/眼睛.png";
import biyan from "../../../public/闭眼睛.png";

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

/**
 * 校验规则
 */
const showPassword = ref(false);

const validateUserAccount = (val) => {
  // const pattern = /[a-zA-Z]\w{3,15}$/;
  const pattern = /^\w{3,15}$/;
  if (!val) {
    return '请输入账号';
  } else if (!pattern.test(val)) {
    return '长度在4~16之间，只能包含字母、数字和下划线';
  }
};
const validator = (val) =>{
  // const pattern = /^[a-zA-Z]\w{7,17}$/;
  const pattern = /^\w{6,17}$/;
  if (!val) {
    return '请输入密码';
  } else if (!pattern.test(val)) {
    return '长度在8~18之间，只能包含字母、数字和下划线';
  }
}

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/login',{
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(res,'用户登录')
  if (res.code === 0 && res.data){
    sessionStorage.setItem("token", res.data)
    showSuccessToast('登录成功');
    window.location.href = <string>route.query.redirectUrl ?? '/'
  }
  else {
    showFailToast('登录失败');
  }
};
</script>


<style scoped>
@import "../../css/image.css";
@import "../../css/loginUnderline.css";
</style>