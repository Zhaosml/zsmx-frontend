<template>
  <div id="teamCardList">
    <van-card v-for="team in props.teamList"
              :thumb="tup"
              :desc="team.description"
              :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style=" margin-top: 8px"  >
          {{teamStatusEum[team.status]}}
        </van-tag>
      </template>
      <template #bottom>
        <div>{{"最大人数" + team.maxNum}}</div>
        <div>{{"过期时间" + team.expireTime}}</div>
      </template>
      <template #footer>
        <van-button size="small" type="primary" plain @click="doJoinTeam(team.id)"  >加入队伍</van-button>
      </template>
    </van-card>
  </div>

</template>

<script setup lang="ts">
import {TeamType} from "../service/team.ts";
import {teamStatusEum} from "../constants/team.ts";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";


interface TeamCardListProps {
  teamList : TeamType[]
}
const tup = "https://ggkt-1318325125.cos.ap-beijing.myqcloud.com/2023.05/24/028fed275c534d8a88a9c93ac7af506echagang.jpg"
const props = withDefaults(defineProps<TeamCardListProps>(),
    {teamList: [] as TeamType})

const doJoinTeam = async (id:number) =>{
  const res = await myAxios.post('/team/join',{
    teamId: id
  });
  if(res?.code === 0){
    showSuccessToast("加入成功");
  }else {
    showFailToast("加入失败" + (res.description ? `${res.description}`:''));
  }
}
</script>


<style scoped>
#teamCardList :deep(.van-image__img){
  height: 120px;
  object-fit: unset;
}
</style>