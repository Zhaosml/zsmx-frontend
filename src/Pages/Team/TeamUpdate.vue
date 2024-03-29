<template>
  <div id="teamUpdatePage">
    <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.name"
          name="name"
          label="队伍名"
          placeholder="请输入队伍名"
          :rules="[{ required: true, message: '请填写队伍名' }]"
      />
      <van-field
          v-model="addTeamData.description"
          rows="3"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入描述"
      />
      <van-field
          v-model="addTeamData.expireTime"
          is-link
          readonly
          name="datePicker"
          label="过期时间"
          :placeholder="addTeamData.expireTime ?? '点击选择过期时间' "
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker
            title="选择过期时间"
            :min-date="minDate" @confirm="onConfirm" @cancel="showPicker = false"
        />
      </van-popup>


      <van-field name="stepper" label="最大人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" :max="10" :min="3"/>
        </template>
      </van-field>

      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field v-if="Number(addTeamData.status) === 2"
          v-model="addTeamData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入队伍密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />


    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter()
const route = useRoute()

//不写{}写‘’会查询为空
const addTeamData = ref({})

const id = route.query.id

// 获取之前的队伍的信息
onMounted(async () =>{
  if(id <= 0) {
    showFailToast('加载队伍失败')
    return;
  }
  const res = await myAxios.get("/team/get",{
    params:{ id }
  })
  if(res?.code === 0){
    addTeamData.value = res.data
  }
  else {
    showFailToast('加载队伍失败，请重新刷新');
  }
})

//TODO 前端参数校验

// 提交修改信息
const onSubmit = async () =>{
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  const res = await myAxios.post("team/update",postData);
  if(res?.code === 0 && res.data){
    showSuccessToast('更新成功');
    router.push({
      path:'/team',
      replace:true
    })
  }
  else {
    showFailToast('更新失败');
  }
}

// 时间选择器
const showPicker = ref(false);
const minDate = new Date()
const onConfirm = ({selectedValues}) => {
  addTeamData.value = {...addTeamData.value, expireTime: selectedValues.join('-')}
  showPicker.value = false;
};


</script>


<style scoped>

</style>