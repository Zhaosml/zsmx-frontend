<template>
  <team-card-list :team-list="teamList"></team-card-list>
  <van-empty v-if="teamList.length < 1"  description="数据为空" >
  </van-empty>
</template>

<script setup lang="ts">
import myAxios from "../../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import TeamCardList from "../../components/TeamCardList.vue";
import {onMounted, ref, watchEffect} from "vue";
import {showFailToast, showToast} from "vant";

const router = useRouter()

// 跳转到加入队伍页
const doJoinTeam = () =>{
  router.push({
    path:'/team/add'
  })
}

//查询队伍列表
const teamList = ref([]);
onMounted( () => {
  listTeam();
})

const listTeam = async (val='') => {
  const res = await myAxios.get("/team/list/my/create",{
    params:{
      searchText: val,
      pageNum:1
    }
  })
  if(res?.code === 0){
    teamList.value = res.data
  }
  else {
    showFailToast('请求失败');
  }
}
//搜索功能
const searchText = ref('')
const onSearch = (val) => {
  listTeam(val)
};

watchEffect(()=>{
  listTeam()
})


</script>


<style scoped>

</style>