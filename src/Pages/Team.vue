<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="请输入搜索队伍"  @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"></van-tab>
      <van-tab title="加密" name="private"></van-tab>
    </van-tabs>
    <div style="margin-bottom: 10px"></div>
    <van-button class="add-button"  type="primary"@click="doJoinTeam" icon="plus"></van-button>
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-if="teamList.length < 1"  description="数据为空" >
    </van-empty>
  </div>
</template>

<script setup lang="ts">
import myAxios from "../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import {showFailToast, showToast} from "vant";

const router = useRouter()
//切换栏
const onTabChange = (name) =>{
  //查公开
  if(name == "public"){
    listTeam(searchText.value,0);
  }
  //查加密
  else {
    listTeam(searchText.value,2)
  }
}

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
//搜索全部队伍
const listTeam = async (val='',status = 0) => {
  const res = await myAxios.get("/team/list",{
    params:{
      searchText: val,
      pageNum:1,
      status
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




</script>


<style scoped>
.add-button {
  position: fixed ;
  bottom: 60px;
  right: 12px;
  border-radius: 50%;
  width: 50px;
  z-index: 9999;
}
</style>