<template>
<!--导航栏组件-->
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
   <router-view></router-view>
  </div>

<!--标签栏组件-->

  <van-tabbar route @change="onChange">
    <van-tabbar-item replace to="/" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item replace to="/team" icon="friends-o">队伍</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user">个人</van-tabbar-item>
  </van-tabbar>

</template>


<!--setup  这里指定setup之后我们在script中定义的所有的变量，它都会暴露给咱们的页面，
 这样就不用再去写return了，这样就很方便了。不用写return-->
<script setup lang="ts">
import {showToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route.js";

const DEFAULT_TITLE = '伙伴匹配'
const title = ref(DEFAULT_TITLE)

const router = useRouter();
const route = useRoute();
/*
* 切换标题
* */
router.beforeEach((to,from) => {
  const toPath = to.path
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

    const onClickLeft = () => router.back();
    const onClickRight = () => {
      router.push('/search');
    };
    // const onChange = (index) => showToast(`标签 ${index}`);

    // alert(route.path)

</script>

<style scoped>
#content  {
  padding-bottom: 80px;
}
</style>