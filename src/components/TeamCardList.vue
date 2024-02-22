<template>
  <div id="teamCardList">
    <van-card v-for="team in props.teamList"
              thumb="public/靓仔一起打篮球吗.jpeg"
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
        <!--仅非队伍创建人、且未加入队伍的人可见-->
        <van-button  v-if="team.userId !== currentUser?.id && !team.hasJoin"  size="small" type="primary" plain
                     @click="doJoinTeam(team.id)"  >加入队伍
        </van-button>
        <!--仅创建人可见-->
        <van-button v-if="team.userId == currentUser?.id" size="small" plain
                    @click="doUpdateTeam(team.id)"  >更新队伍
        </van-button>
        <!-- 仅加入队伍可见 -->
        <van-button v-if="team.hasJoin" size="small" plain
                    @click="doQuitTeam(team.id)"  >退出队伍
        </van-button>
        <!--创建人不可见，仅已加入队伍的人可见-->
        <van-button v-if="team.userId == currentUser?.id" size="small" plain type="danger"
                    @click="doDeleteTeam(team.id)"  >解散队伍
        </van-button>
      </template>
    </van-card>
  </div>
</template>
{{teamList}}
<script setup lang="ts">
import myAxios from "../plugins/myAxios.ts";
import {TeamType} from "../models/team.ts";
import {teamStatusEum} from "../constants/team.ts";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const currentUser = ref();
onMounted(async () =>{
  currentUser.value =  await getCurrentUser();
})
interface TeamCardListProps {
  teamList : TeamType[]
}
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

/**
 * 跳转至更新队伍页   保留id
 * @param id
 */
const doUpdateTeam = (id : number) =>{
  router.push({
    path:'/team/update',
    query:{
      id
    }
  })
}
const doDeleteTeam = async (id:number) =>{
  const res = await myAxios.post('/team/delete',{
     id
  });
  if(res?.code === 0){
    showSuccessToast("解散队伍");
  }else {
    showFailToast("解散队伍失败" + (res.description ? `${res.description}`:''));
  }
}
const doQuitTeam = async (id:number) =>{
  const res = await myAxios.post('/team/quit',{
    teamId:id
  });
  if(res?.code === 0){
    showSuccessToast("退出队伍");
  }else {
    showFailToast("退出队伍失败" + (res.description ? `${res.description}`:''));
  }
}

</script>


<style scoped>
#teamCardList :deep(.van-image__img){
  height: 120px;
  object-fit: unset;
}
</style>