<template>
  <div class="chat-container">
<!--    <p class="heard">{{ stats.chatUser.username }}</p>-->
    <p class="heard" v-if="stats.chatType===stats.chatEnum.PRIVATE_CHAT">{{ stats.chatUser.username }}</p>
    <p class="heard" v-if="stats.chatType===stats.chatEnum.TEAM_CHAT">{{ stats.team.teamName }}</p>
    <div class="content" v-html="stats.content"></div>
    <div class="send">
      <textarea placeholder="聊点什么吧...." v-model="stats.text" @keyup.enter="send" class="input-text"></textarea>
      <input class="input-send-button" type="button" @click="send" value="发送">
    </div>
  </div>
</template>
<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {showFailToast} from "vant";
import {getCurrentUser} from "../service/user.js";
import request from "../plugins/myAxios.js";
import myAxios from "../plugins/myAxios.js";

const route = useRoute()
const router = useRouter()

const stats = ref({
  user: {
    id: 0,
    username: "",
    avatarUrl: ''
  },
  isCollapse: false,
  users: [],
  chatUser: {
    id: 0,
    username: ''
  },
  chatEnum: {
    // 私聊
    PRIVATE_CHAT: 1,
    // 队伍聊天
    TEAM_CHAT: 2,
    // 大厅
    HALL_CHAT: 3
  },
  team: {
    teamId: 0,
    teamName: ''
  },
  chatType: null,
  text: "",
  messages: [],
  content: ''
})

const chatRoom = ref(null)

onMounted(async () => {
  // 默认大厅聊天
  let {id, username, userType, teamId, teamName, teamType} = route.query
  stats.value.chatUser.id = Number.parseInt(id) //用户id
  stats.value.team.teamId = Number.parseInt(teamId) //队伍id
  stats.value.chatUser.username = username  //用户名称
  stats.value.team.teamName = teamName //队伍名称

  if (userType && Number.parseInt(userType) === stats.value.chatEnum.PRIVATE_CHAT) {
    stats.value.chatType = stats.value.chatEnum.PRIVATE_CHAT
    console.log("这是私聊")
  }
  else if (teamType && Number.parseInt(teamType) === stats.value.chatEnum.TEAM_CHAT){
    stats.value.chatType = stats.value.chatEnum.TEAM_CHAT
    console.log("这是群聊")
  }
  else {
    stats.value.chatType = stats.value.chatEnum.HALL_CHAT
      console.log("这是大厅聊天")
  }
  //获取当前用户信息
  const res = await getCurrentUser()
  if(res.code === 0){
    stats.value.user = res.data
  }

  //私聊·
  if (stats.value.chatType === stats.value.chatEnum.PRIVATE_CHAT) {
    const privateMessage = await request.post("/chat/privateChat",
        {
          toId: stats.value.chatUser.id,
        })
    privateMessage.forEach(chat => {
      if (chat.isMy === true) {
        createContent(null, chat.formUser, chat.text)
      } else {
        createContent(chat.toUser, null, chat.text)
      }
    })
  }

  if (stats.value.chatType === stats.value.chatEnum.HALL_CHAT) { //大厅聊天
    const hallMessage = await myAxios.get("/chat/hallChat" ,{})
    hallMessage.forEach(chat => {
      if (chat.type === true) {
        createContent(null, chat.formUser, chat.text)
      } else {
        createContent(chat.formUser, null, chat.text)
      }
    })
  }
  if (stats.value.chatType === stats.value.chatEnum.TEAM_CHAT) { //队伍聊天
    const teamMessage = await myAxios.post("/chat/teamChat",
        {
          teamId: stats.value.team.teamId
        })
    teamMessage.forEach(chat => {
      if (chat.type === true) {
        createContent(null, chat.formUser, chat.text)
      } else {
        createContent(chat.formUser, null, chat.text)
      }
    })
  }
  init()
  // 内容始终显示最下方
  await nextTick()
  const lastElement = chatRoom.value.lastElementChild
  lastElement.scrollIntoView()
})
let socket = null;

const init = () => {
  let uid = stats.value.user.id;
  // let uid = route.query.id
  if (typeof (WebSocket) == "undefined") {
    showFailToast("您的浏览器不支持WebSocket")
  } else {
    // todo 区分线上线下
    let socketUrl = `ws://localhost:8999/api/websocket/${uid}/${stats.value.team.teamId}`
    console.log("开启成功")
    if (socket != null) {
      console.log("socket关闭了")
      socket.close();
      socket = null;
    }
    // 开启一个websocket服务
    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function () {
      console.log("websocket已打开");
      console.log(socket)
    };
    //  浏览器端收消息，获得从服务端发送过来的文本消息
    socket.onmessage = function (msg) {
      // console.log("收到数据====" + msg.data)
      let data = JSON.parse(msg.data)

      // let data = JSON.parse(msg.data)  // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
      if (data.users) {  // 获取在线人员信息
        stats.value.users = data.users.filter(user => {
          return user.id !== uid
        })
        // console.log(stats.value.users)// 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
      } else {
        // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
        let flag;

        if (stats.value.chatType === data.chatType) {
          // 单聊
          flag = (uid === data.toUser.id && stats.value.chatUser.id === data.formUser.id)
        }
        if ((stats.value.chatType === data.chatType)) {
          // 大厅
          flag = (data.formUser?.id !== uid)
        }
        // 队伍
        if (stats.value.chatType === data.chatType && data.teamId && stats.value.team.teamId === data.teamId) {
          flag = (data.formUser?.id !== uid)
        }
        if (flag) {
          stats.value.messages.push(data)
          // 构建消息内容
          createContent(data.formUser, null, data.text)
          nextTick(() => {
            const lastElement = chatRoom.value.lastElementChild
            lastElement.scrollIntoView()
          })
        }
      }
    };
    //关闭事件
    socket.onclose = function () {
      console.log("websocket已关闭");
    };
    //发生了错误事件
    socket.onerror = function () {
      console.log("websocket发生了错误");
    }
  }
}

const send = () => {
  // if (!socket || socket.readyState !== WebSocket.OPEN) {
  //   console.log(socket)
  //   // console.error("WebSocket未正确初始化或连接已关闭");
  //   return;
  // }
  if (stats.value.chatUser.id === 0) {
    return;
  }
  if (stats.value.chatUser.id === stats.value.user.id){
    showFailToast("不能给自己发信息")
    return;
  }
  if (!stats.value.text.trim()) {
    showFailToast("请输入内容")
  } else {
    if (typeof (WebSocket) == "undefined") {
      showFailToast("您的浏览器不支持WebSocket")
    } else {
      console.log("您的浏览器支持WebSocket");
      let message = {
        fromId: stats.value.user.id,
        toId: stats.value.chatUser.id,
        text: stats.value.text,
        chatType: stats.value.chatType,
        teamId: stats.value.team.teamId
      }
      socket.send(JSON.stringify(message));
      stats.value.messages.push({user: stats.value.user.id, text: stats.value.text})
      createContent(null, stats.value.user, stats.value.text)
      stats.value.text = '';
      nextTick(() => {
        const lastElement = chatRoom.value.lastElementChild
        lastElement.scrollIntoView()
      })
    }
  }
}
// todo 查看用户详情
const showUser = (id) => {
  router.push({
    name: 'userShow',
    params: {
      userId: id
    }
  })
}

/**
 * 这个方法是用来将 json的聊天消息数据转换成 html的。
 */
const createContent = (remoteUser, nowUser, text) => {  // 这个方法是用来将 json的聊天消息数据转换成 html的。
  // 当前用户消息
  let html;
  if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
    html = `
    <div class="message self">
    <!--todo 显示默认头像-->
      <img class="avatar"    src=${nowUser.avatarUrl}>
      <p class="text">${text}</p>
    </div>
`
  } else if (remoteUser) {
    // remoteUser表示远程用户聊天消息，灰色的气泡
    html = `
     <div class="message other">
      <img class="avatar"  src=${remoteUser.avatarUrl}>
      <p class="text">${text}</p>
    </div>
`
  }
  stats.value.content += html;
}

/**
 * 模板字符串事件
 * @param id
 */
window.showUser = (id) => {
  showUser(id)
}

</script>
<style>
@import "../css/chat.css";
</style>
