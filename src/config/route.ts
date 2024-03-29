import Index from "../Pages/User/Index.vue";
import Team from "../Pages/Team/Team.vue";
import User from "../Pages/User/User.vue";
import Search from "../Pages/Search.vue";
import EditUser from "../Pages/EditUser.vue";
import SearchResult from "../Pages/SearchResult.vue";
import UserLogin from "../Pages/User/UserLogin.vue";
import TeamAdd from "../Pages/Team/TeamAdd.vue";
import TeamUpdate from "../Pages/Team/TeamUpdate.vue";
import UserUpdate from "../Pages/User/UserUpdate.vue";
import UserTeamJoin from "../Pages/User/UserTeamJoin.vue";
import UserTeamCreate from "../Pages/User/UserTeamCreate.vue";
import UserRegister from "../Pages/User/UserRegister.vue";
import EditTags from "../Pages/EditTags.vue";
import Chat from "../Pages/chat.vue";
import Upload from "../Pages/UploadAvatarUrl.vue";
import UserShow from "../Pages/User/UserShow.vue";
import Friend from "../Pages/Firend/Friend.vue";
import ApplicationRecord from "../Pages/Firend/ApplicationRecord.vue";
import TeamShow from "../Pages/Team/TeamShow.vue";
import TeamDetailPage from "../Pages/Team/TeamDetailPage.vue";
import UploadCover from "../Pages/UploadCover.vue";

const routes = [
    { path: '/search', title:'标签搜索', component: Search },
    { path: '/user/list',title: '用户搜索', component: SearchResult },
    { path: '/upload',title: '上传头像',component:Upload},
    { path: '/user/login',title: '登录', component: UserLogin },
    { path: '/user/register',title: '注册', component: UserRegister },
    { path: '/', component: Index },
    { path: '/userShow', title: '查看用户',component: UserShow },
    { path: '/team', title: '找队伍', component: Team },
    { path: '/team/add',title: '添加队伍', component: TeamAdd },
    // { path: '/teamShow',title: '查看队伍', component: TeamShow },
    {path: '/team/detail', title: '队伍详情', component: TeamDetailPage},
    {path: '/team/UploadCover', title: '修改队伍头像', component:UploadCover},
    { path: '/user', title: '个人',component: User },
    { path: '/user/team/update',title: '编辑个人信息', component: UserUpdate },
    { path: '/user/edit', title: '编辑信息',component: EditUser },
    { path: '/user/tags', title: '自定义标签',component: EditTags },
    { path: '/team/update',title: '修改队伍', component: TeamUpdate },
    { path: '/user/team/join',title: '已加入队伍', component: UserTeamJoin },
    { path: '/user/team/create',title: '已创建队伍', component: UserTeamCreate },
    { path: '/friend',title: '好友', component: Friend },
    { path: '/apply',title: '新的朋友', component: ApplicationRecord },
    { path: '/chat',title: '队伍',component:Chat},
]
//
// const routers = VueRouter.createRouter({
//     history: VueRouter.createWebHashHistory(),
//     // history: VueRouter.createWebHistory(),
//     routes
// })
//
// routers.beforeEach((to, from, next) => {
//     to.meta.lastRoutePath = from.path;
//     next();
// });
export default routes;
