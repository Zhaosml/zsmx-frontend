import Index from "../Pages/Index.vue";
import Team from "../Pages/Team.vue";
import User from "../Pages/User.vue";
import Search from "../Pages/Search.vue";
import EditUser from "../Pages/EditUser.vue";
import SearchResult from "../Pages/SearchResult.vue";
import UserLogin from "../Pages/UserLogin.vue";
import TeamAdd from "../Pages/TeamAdd.vue";
import TeamUpdate from "../Pages/TeamUpdate.vue";
import UserUpdate from "../Pages/UserUpdate.vue";
import UserTeamJoin from "../Pages/UserTeamJoin.vue";
import UserTeamCreate from "../Pages/UserTeamCreate.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team', title: '找队伍', component: Team },
    { path: '/user', title: '个人',component: User },
    { path: '/search', component: Search },
    { path: '/user/edit', title: '编辑信息',component: EditUser },
    { path: '/user/list',title: '用户列表', component: SearchResult },
    { path: '/user/login',title: '登录', component: UserLogin },
    { path: '/team/add',title: '添加队伍', component: TeamAdd },
    { path: '/team/update',title: '修改队伍', component: TeamUpdate },
    { path: '/user/team/update',title: '用户信息', component: UserUpdate },
    { path: '/user/team/join',title: '已加入队伍', component: UserTeamJoin },
    { path: '/user/team/create',title: '已创建队伍', component: UserTeamCreate }
]

export default routes;