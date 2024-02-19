<template>
  <div id="teamPage">
    <van-button type="primary"@click="doJoinTeam">加入队伍</van-button>
  </div>
  <team-card-list :team-list="teamList"></team-card-list>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const router = useRouter()
// 跳转到加入队伍页
const doJoinTeam = () =>{
  router.push({
    path:'/team/add'
  })
}

const teamList = ref([]);

onMounted(async ()=>{
  const res = await myAxios.get("/team/list")
  if(res?.code === 0){
    teamList.value = res.data
  }
  else {
    showFailToast('请求失败');
  }
})

</script>


<style scoped>

</style>