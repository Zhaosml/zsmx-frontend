<template>
  <div><img style="float: right" width="20px" height="15px" :src="kunkunheiying"></div>
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
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
          label="昵称"
          v-model="username"
          name="username"
          placeholder="请输入昵称"
          :rules="[{ required:true, message: '请输入昵称' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
          label="账号"
          v-model="userAccount"
          name="userAccount"
          placeholder="请输入账号"
          :rules="[{ validator:validateUserAccount, message: '以字母开头，长度在4~16之间，允许字母数字下划线' }]"
      />
      <!-- 通过 validator 返回错误提示 -->
      <van-field
          label="密码"
          v-model="userPassword"
          :type="showPassword ? 'text' : 'password'"
          name="userPassword"
          placeholder="请输入密码"
          :rules="[{ validator,message:'以字母开头，长度在8~18之间，允许字母数字下划线' }]"
          :right-icon="showPassword ? zhengyan : biyan"
          @click-right-icon="showPassword = !showPassword " />
      <!-- 通过 validator 进行异步函数校验 -->
      <van-field
          label="确认密码"
          v-model="checkPassword"
          name="checkPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请确认密码"
          :rules="[{ validator, message: '以字母开头，长度在8~18之间，允许字母数字下划线' }]"
          :right-icon="showPassword ? zhengyan : biyan"
          @click-right-icon="showPassword = !showPassword " />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" >
          注册账号
        </van-button>
      </div>
      <van-row  >
        <van-col offset="8"  span="14" >
          <van-cell class="loginUnderline" to="/user/login" value="已有，账号点击登录" />
        </van-col>
      </van-row>
    </van-cell-group>


  </van-form>

</template>

<script lang="ts" setup>
import kunkun from "../../../public/坤坤.webp";
import kunkunheiying from "../../../public/坤坤黑银.jpeg";
import zhengyan from "../../../public/眼睛.png";
import {useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import {ref} from "vue";
import {showSuccessToast} from "vant";
import biyan from "../../../public/闭眼睛.png";

const router = useRouter()

const username = ref('');
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('')
const showPassword = ref(false);

const validateUserAccount = (val) => {
  // const pattern = /[a-zA-Z]\w{3,15}$/;
  const pattern = /^\w{3,15}$/;
  if (!val) {
    return '请输入账号';
  } else if (!pattern.test(val)) {
    return '以字母开头，长度在4~16之间，只能包含字母、数字和下划线';
  }
};
const validator = (val) =>{
  // const pattern = /^[a-zA-Z]\w{7,17}$/;
  const pattern = /^\w{6,17}$/;
  if (!val) {
    return '请输入密码';
  } else if (!pattern.test(val)) {
    return '以字母开头，长度在8~18之间，只能包含字母、数字和下划线';
  }
}

const onSubmit =async () =>{
  const res = await myAxios.post('/user/register',{
    username:username.value,
    userAccount:userAccount.value,
    userPassword:userPassword.value,
    checkPassword:userPassword.value
  })
  if(res.data){
    showSuccessToast("注册成功")
     router.push({
      path:'/user/login'
    })
  }
}


</script>


<style scoped >
@import "../../css/loginUnderline.css";
</style>