<template v-if="user">
  <div class="center">
    <!--todo 展示默认头像-->
    <img class="img" :src="user.avatarUrl ?? defaultImage">
  </div>
  <div style="padding-top: 15px"/>

  <van-cell :value="user.username" icon="manager-o">
    <template #title>
      <span class="custom-title">昵称</span>
    </template>
  </van-cell>
  <van-cell :value="user.userAccount" icon="user-circle-o">
    <template #title>
      <span class="custom-title">账号</span>
    </template>
  </van-cell>
  <van-cell :value="genderMap[user.gender]" icon="like-o">
    <template #title>
      <span class="custom-title">性别</span>
    </template>
  </van-cell>
  <van-cell :value="user.phone" icon="comment-o">
    <template #title>
      <span class="custom-title">联系方式</span>
    </template>
  </van-cell>
  <van-cell title="邮箱" @click="showPopup" icon="envelop-o">
    <template #value>
      <div v-if="user.email" class="van-ellipsis">
        {{ user.email }}
      </div>
    </template>
  </van-cell>
  <van-popup v-model:show="show" :style="{ padding: '64px' }">{{ user.email }}</van-popup>

<!--  <van-cell value="点击查看" icon="cluster-o" @click="teams" is-link>-->
<!--    <template #title>-->
<!--      <span class="custom-title">已加队伍</span>-->
<!--    </template>-->
<!--  </van-cell>-->
  <van-cell title="简介" icon="chat-o">
    <template #value>
      <div v-if="user.profile" class="van-multi-ellipsis--l3">
        {{ user?.profile }}
      </div>
      <div v-if="!user.profile" class="van-ellipsis">
        暂无简介
      </div>
    </template>
  </van-cell>
    <div>
      <div v-if="!Friend" >
        <van-button  type="primary" @click="addUser" block>
          添加好友
        </van-button>
      </div>

      <div v-else>
        <van-button type="primary" @click="chatUser" block>联系好友</van-button>
        <div style="padding-top: 10px;"></div>
        <van-button type="danger" @click="deleteFriend" block>删除好友</van-button>
      </div>

    </div>


  <van-dialog v-model:show="addUserApply"
              :title="'添加好友：'+user.username"
               show-cancel-button
               @confirm="toAddUserApply(user.id)">
    <div style="padding-top:8px"></div>
    <van-field v-model="addUserApplyText"
               type="text"
               placeholder="我是...."
               style="text-align: center;width: 150px;margin-left: 75px;"
    />
    <div style="padding-top:8px "></div>
  </van-dialog>

</template>

<script setup lang="ts">
import defaultImage from "../../../public/defalutTeamImg.jpg";

import {onMounted, ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";
import myAxios from "../../plugins/myAxios.ts";
import {getCurrentUser} from "../../service/user.ts";
import {genderMap} from "../../models/userMap.ts";

const show = ref(false);
const showPopup = () => {
  show.value = true;
};

const route = useRoute()
const router = useRouter()
const applyStatus = ref(true)
const Friend = ref(true);


const loginUser = ref({
  user: {},
  userIds: []
})

onMounted(async () => {
  if(route.query.id == null){

  }
  const userId = Number(route.query.id);
  const res = await myAxios.get(`/user/${userId}`);
  user.value = res.data

  const currentUser = await getCurrentUser()
  loginUser.value.user = currentUser
  loginUser.value.userIds = JSON.parse(currentUser.userIds)

  const res_ = await myAxios.get(`/user/isFriend/${userId}`)
  if(res_.code === 0){
    Friend.value = res_.data
  }
})


const teams = () => {
  router.push({
    name: "userTeamPage",
    query: {
      teamsId: JSON.parse(user.value.teamIds)
    }
  })
}

const chatUser = () => {
  if (!loginUser.value.userIds.includes(user.value.id)) {
    showFailToast("该用户暂时不是您的好友")
    return
  }
  router.push({
    path: "/chat",
    query: {
      id: user.value.id,
      username: user.value.username,
      userType: 1
    }
  })
}
const addUser = async () => {
  addUserApply.value = true
}

const addUserApply = ref(false);
const addUserApplyText = ref();
const toAddUserApply = async (id: number) => {
  const status = await myAxios.post("/friends/add", {
    "receiveId": id,
    "remark": addUserApplyText.value
  })
  if (status) {
    showSuccessToast("申请成功")
  }
}
// const addUser = async () => {
//   //  dialog组件
//   showConfirmDialog({
//     message: '请确认是否添加' + user.value.username + '为好友?',
//   }).then(async () => {
//     const add = await myAxios.post(`/user/addUser/${user.value.id}`, {})
//     if (add) {
//       loginUser.value.userIds.push(user.value.id)
//       showSuccessToast("添加成功")
//     }
//   }).catch(() => {
//     showSuccessToast("修改成功")
//   });
// }

const deleteFriend = async () => {
  showConfirmDialog({
    message: '请确认是否删除好友?',
  }).then(async () => {
    const deleteFriend = await myAxios.post(`/user/deleteFriend/${user.value.id}`, {})
    if (deleteFriend) {
      loginUser.value.userIds = loginUser.value.userIds.filter(id => id !==user.value.id)
      showSuccessToast("删除成功")
    }
  }).catch(() => {
    showSuccessToast("修改成功")
  });

}
const user = ref({});
const toUserShow = ref({
  id:route.query.id
})


watchEffect(() => {
  console.log('响应式数据发生变化');
  // 在这里执行需要执行的副作用操作
});
</script>

<style scoped>
@import '../../css/userShow.css';
@import "../../css/public.css";

:deep(.van-popup--center) {
  max-width: none;
  border-radius: 5%;
}

</style>