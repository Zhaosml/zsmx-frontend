<template>
  <van-form @submit="onSubmit">
      <van-field
           v-model="editUser.currentValue"
           :name="editUser.editKey"
           :label="editUser.editName"
           :placeholder="`请输入${editUser.editName}`"
      />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted} from "vue/dist/vue";
import {getCurrentUser} from "../service/user.ts";

const router = useRouter();
const route = useRoute();

// console.log(route)
// console.log(route.query)
// console.log(route.params)

const editUser = ref({
  editKey:route.query.editKey,
  editName:route.query.editName,
  currentValue:route.query.currentVa
})

// const currentUser =  getCurrentUser();


//修改按钮
const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if(!currentUser){
    showFailToast('用户未登录');
    return;
  }

  const res = await myAxios.post('/user/update',{
    'id':currentUser.id,
    [editUser.value.editKey]:editUser.value.currentValue,
  })
  if(res.code === 0 && res.data > 0){
    showSuccessToast('修改成功');
    router.back();
  }
  else {
    showFailToast('修改失败');
  }
};
</script>


<style scoped>

</style>