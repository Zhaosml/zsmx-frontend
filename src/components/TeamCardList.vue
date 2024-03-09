<template>
  <div id="teamCardList">
    <van-card v-for="team in props.teamList"
              :thumb="team.coverImage ?? defaultImage"
              :title="`${team.name}`"
              :desc="'描述：'+team.description"
              @click-thumb="getTeamDetail(team.id)"
    >
      <template #title>
        <div class="team-title" @click="getTeamDetail(team.id)">{{ team.name }}</div>
      </template>
      <template #tags>
        <van-tag plain type="danger" style=" margin-top: 8px"  >
          {{teamStatusEum[team.status]}}
        </van-tag>
      </template>
      <template #bottom>
        <div>{{"队伍人数：" + team.hasJoinNum}}/{{team.maxNum}}</div>
        <div>{{"过期时间：" + formatDate(team.expireTime)}}</div>
        <div>{{"创建时间：" + formatDate(team.createTime)}}</div>
      </template>
      <template #footer>
        <!--仅非队伍创建人、且未加入队伍的人可见-->
        <van-button  v-if="team.userId !== currentUser?.id && !team.hasJoin"  size="small" type="primary" plain
                     @click="preJoinTeam(team)" >加入队伍
        </van-button>
        <!--仅创建人可见-->
        <van-button v-if="team.userId == currentUser?.id" size="small" plain
                    @click="doUpdateTeam(team.id)"  >更新队伍
        </van-button>
        <!-- 仅加入队伍可见 -->
        <van-button v-if="team.hasJoin" size="small" plain
                    @click="doQuitTeam(team.id)"  >退出队伍
        </van-button>
        <van-button v-if="team.hasJoin" size="small" plain
                    @click="getTeamDetail(team.id)"  >队伍详情
        </van-button>
        <!--创建人不可见，仅已加入队伍的人可见-->
        <van-button v-if="team.userId == currentUser?.id" size="small" plain type="danger"
                    @click="doDeleteTeam(team.id)"  >解散队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJionCancel">
      <van-field v-model="password"  placeholder="请输入密码"></van-field>
    </van-dialog>
  </div>
</template>
<script setup lang="ts">
import myAxios from "../plugins/myAxios.ts";
import {TeamType} from "../models/team.ts";
import {teamStatusEum} from "../constants/team.ts";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user.ts";
import {useRouter} from "vue-router";
import defaultImage from "../../public/defalutTeamImg.jpg";

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

const showPasswordDialog = ref(false);

const password = ref('')

const JoinTeamId = ref(0)

const doJionCancel = () =>{
  JoinTeamId.value = 0,
  password.value = ''
}

const getTeamDetail = (id) => {
  router.push({
    path: "/team/detail",
    query: {
      id,
    },
  });
};

//加入队伍
const doJoinTeam = async () =>{
  if(!JoinTeamId.value){
    return;
  }
  const res = await myAxios.post('/team/join',{
    teamId: JoinTeamId.value,
    password: password.value,
  });
  if(res?.code === 0){
    showSuccessToast("加入成功");
    window.location.reload();
  }else {
    showFailToast("加入失败" + (res.description ? `${res.description}`:''));
    JoinTeamId.value = 0,
    password.value = ''
  }

}

const preJoinTeam = (team : TeamType) => {
  JoinTeamId.value = team.id
  if (team.status == 0) {
    doJoinTeam(team.id)
  } else {
    showPasswordDialog.value = true
  }}

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

//解散队伍
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

//退出队伍
const doQuitTeam = async (id:number) =>{
  const res = await myAxios.post('/team/quit',{
    teamId:id
  });
  if(res?.code === 0){
    showSuccessToast("退出队伍");
    window.location.reload();
  }else {
    showFailToast("退出队伍失败" + (res.description ? `${res.description}`:''));
  }
}

// 格式时间
const formatDate = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString(); // Adjust the format as needed
}


</script>


<style scoped>
#teamCardList :deep(.van-image__img){
  height: 120px;
  object-fit: unset;
}
</style>