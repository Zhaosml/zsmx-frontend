<template>
  <div class="friend-list">
    <div class="friend-search">
      <input type="text" placeholder="搜索" @keyup.enter="search" v-model="status.searchText">
      <van-button plain hairline size="small" style="width: 60px" @click="search" type="primary">搜索</van-button>
    </div>
    <div class="friend-group">
      <van-row>
        <van-cell  is-link to="/apply" size="large">
          <template #title>
            好友申请
            <van-badge class="badge" v-if="applyFriendsCount > 0" :content="applyFriendsCount"  >
            </van-badge>
          </template>
          <template #icon>
            <van-icon name="bulb-o" style="color: #0077ff; margin-top: 1px;font-size: 20px"></van-icon>
          </template>
        </van-cell>
      </van-row>
      <div class="group-title">我的好友</div>

      <ul class="friend-items">
        <van-empty v-if="status.friends.length<=0" description="暂无好友"/>
        <li v-else v-for="friend in status.friends" :key="friend.id"
            class="friend-item"
            @mousedown="changeColor($event)"
            @touchstart="changeColor($event)"
            @mouseup="resetColor($event)"
            @touchend="resetColor($event)">
          <div class="avatar-container">
            <img @click="toUserShow(friend.id)"
                 :src="friend.avatarUrl ?? defaultImage" class="avatar">
          </div>

          <div class="friend-info" >
<!--todo 不需要直接跳转用户详情-->
            <div @click="toUserShow(friend.id)" class="friend-name">
              {{ friend.username.slice(0, 14) }}
            </div>
            <div style="padding-right: 10px;" @click="chat(friend.id,friend.username)">
              <van-icon :content="friend.chatCount" max="99" :size="28" name="chat-o"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import defaultImage from "../../../public/defalutTeamImg.jpg";
import {onMounted, ref} from "vue";
// import {defaultPicture} from "../common/userCommon";
import {useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import {getCurrentUser} from "../../service/user.ts";

const router = useRouter()
const status = ref({
  loginUser: {},
  friends: [],
  searchText: ''
})


const toUserShow = (id:number) => {
  router.push({
    path: '/userShow',
    query: {
      id
    }
  })
}
// /**
//  * 搜索好友
//  */
const search = async () => {
  const res = await myAxios.post("/user/searchFriend", {
    searchText: status.value.searchText
  })
  if(res.code === 0 ){
    status.value.friends = res.data
  }
}
/**
 * 加载好友列表
 */
const applyFriendsCount = ref()

onMounted(async () => {
   const count = await myAxios.get("/friends/getRecordCount")
   applyFriendsCount.value = count.data

  status.value.loginUser = await getCurrentUser();
  const res = await myAxios.get("/user/friends")
  if(res.code === 0){
    status.value.friends = res.data
  }
// console.log(res.data)
})

/**
 * 与好友聊天
 * @param id
 * @param username
 */
const chat = (id, username) => {
  router.push({
    path: "/chat",
    query: {
      id: id,
      username: username,
      userType: 1
    }
  })
}

const changeColor = (event) => {
  event.currentTarget.style.backgroundColor = '#e6e6e6';
}

const resetColor = (event) => {
  event.currentTarget.style.backgroundColor = '#fff';
}
</script>
<style scoped>
.friend-list {
  padding: 10px;
}

.group-title {
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
}

.friend-search {
  padding: 10px;
  display: flex;
  align-items: center;
}

.friend-search input[type="text"] {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
}

.friend-group {
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.friend-items {
  list-style: none;
  margin: 0;
  padding: 0;
}

.friend-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e6e6e6;
}

.friend-item:active,
.friend-item:hover {
  background-color: #e6e6e6;
}

.avatar-container {
  width: 40px;
  height:40px;
  min-width: 40px !important;

  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.avatar {
  min-width: 40px !important;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 50%;

}

.friend-info {
  margin-left: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.friend-name {
  display: flex;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
}

.van-icon  {
  color: #0084ff;
}
.badge {
  float: right;
  position: absolute; top: 10px; right: 10px;
}

</style>