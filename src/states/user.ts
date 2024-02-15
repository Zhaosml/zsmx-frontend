import {UserType} from "../models/user.ts";

//这是保存和获取用户当前状态的类

let currentUser: UserType;

const setCurrentUserState = (user : UserType) => {
    currentUser = user;
}

const getCurrentUserState = () : UserType =>{
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState
}