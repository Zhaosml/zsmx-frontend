import Index from "../Pages/Index.vue";
import Team from "../Pages/Team.vue";
import User from "../Pages/User.vue";
import Search from "../Pages/Search.vue";
import EditUser from "../Pages/EditUser.vue";
import SearchResult from "../Pages/SearchResult.vue";
import UserLogin from "../Pages/UserLogin.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    { path: '/user', component: User },
    { path: '/search', component: Search },
    { path: '/user/edit', component: EditUser },
    { path: '/user/list', component: SearchResult },
    { path: '/user/login', component: UserLogin }

]

export default routes;