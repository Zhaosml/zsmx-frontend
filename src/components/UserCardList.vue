<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in userList">

    <van-card
        :desc="'简介：'+user.profile"
        :title="`${user.username} `"
        @click="toUserShow(user.id)"
    >
      <template #thumb >
          <img width="100%" height="100%" id="images" :src="user.avatarUrl ?? defaultImage" >
      </template>
      <template #tags>
        <div>标签：
          <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
            {{ tag }}
          </van-tag>
        </div>
      </template>
      </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import defaultImage from "../../public/defalutTeamImg.jpg";
import {UserType} from "../models/user.ts";
import {useRouter} from "vue-router";

const router = useRouter()

interface UserCardListProps {
  loading: boolean;
  userList: UserType[]
}

const props = withDefaults(defineProps<UserCardListProps>(), {userList: []})

const toUserShow = (id:number) => {
  router.push({
    path:'/userShow',
    query:{
      id
    },
  })
}


</script>


<style scoped lang="css">
#images {
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.5) !important;
}
</style>