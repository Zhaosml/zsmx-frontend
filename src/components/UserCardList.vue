<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
  <van-card
            :desc="user.profile"
            :title="`${user.username} (${user.planetCode})`"
            :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-left: 8px; margin-top: 8px"  >
        {{tag}}
      </van-tag>
    </template>

    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import {UserType} from "../models/user.ts";
import {onMounted} from "vue";

interface UserCardListProps {
  loading:boolean;
  userList : UserType[]
}
const props = withDefaults(defineProps<UserCardListProps>(),
    {userList: []})


</script>


<style scoped>

</style>