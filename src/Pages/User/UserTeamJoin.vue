<!--我加入的队伍-->
<template>
  <van-search v-model="searchText" placeholder="请输入搜索队伍"  @search="onSearch"/>
  <team-card-list :team-list="teamList" :hasJoin="true" ></team-card-list>
  <van-empty v-if="teamList?.length < 1"  description="数据为空" >
  </van-empty>
</template>

<script setup lang="ts">
import myAxios from "../../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import TeamCardList from "../../components/TeamCardList.vue";
import {onMounted, ref,watchEffect} from "vue";
import {showFailToast} from "vant";

const router = useRouter()

//查询队伍列表
const teamList = ref([]);
onMounted( () => {
  listJoinTeam();
})

const listJoinTeam = async (val='') => {
  const res = await myAxios.get("/team/list/my/join/all",{
    params:{
      searchText: val,
      pageNum:1
    }
  })
  if(res?.code === 0){
    teamList.value = res.data
  }
  else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}


//搜索功能
const searchText = ref('')
const onSearch = (val) => {
  listTeam(val)
};


watchEffect(() => {
  listJoinTeam()
  console.log('响应式数据发生变化');
  // 在这里执行需要执行的副作用操作
});


</script>


<style scoped>

</style>