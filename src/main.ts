import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import routes from "./config/route.ts";


import Vant from 'vant';
import 'vant/lib/index.css';


const app    = createApp(App)

//使用组件
app.use(Vant);


const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router);




//mount是挂载，就是把组件页面挂载到某个页面上
/**
 * 理解为你有一面墙，墙就是index.html,
 * 然后new我们有一个小挂饰，挂饰就是app.mount。
 * 然后我们要把挂饰挂到墙的某一个部分，那么这个#app就是咱们墙的某一个部分
 * #是id选择器
 */
app.mount('#app');



