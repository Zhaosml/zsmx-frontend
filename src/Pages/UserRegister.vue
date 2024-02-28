<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
          v-model="username"
          name="username"
          placeholder="请输入昵称"
          :rules="[{ required:true, message: '请输入昵称' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
          v-model="userAccount"
          name="userAccount"
          placeholder="请输入账号"
          :rules="[{ required:true, message: '请输入账号' }]"
      />
      <!-- 通过 validator 返回错误提示 -->
      <van-field
          v-model="userPassword"
          name="userPassword"
          placeholder="请输入密码"
          :rules="[{ required:true,message:'请输入密码' }]"
      />
      <!-- 通过 validator 进行异步函数校验 -->
      <van-field
          v-model="checkPassword"
          name="checkPassword"
          placeholder="请确认密码"
          :rules="[{ required:true, message: '请确认密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" >
          提交
        </van-button>
      </div>
      <van-row  justify="end">
        <van-col span="7" >
          <van-cell class="loginUnderline" to="/user/login" value="已有，账号点击登录" />
        </van-col>
      </van-row>
    </van-cell-group>


  </van-form>

</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {ref} from "vue";
import {showSuccessToast} from "vant";

const router = useRouter()

const username = ref('');
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('')

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
@import "../css/loginUnderline.css";
</style>