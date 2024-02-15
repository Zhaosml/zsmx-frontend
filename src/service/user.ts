import myAxios from "../plugins/myAxios.ts";
import {getCurrentUserState, setCurrentUserState} from "../states/user.ts";

//这是用来保存接口的类

//获取用户信息
export const getCurrentUser = async () =>{
    //TODO 注释原因：因为修改时获取当前缓存，导致没更新用户信息。

    //存在则从远程获取用户信息
    // const currentUser =  getCurrentUserState();
    // if(currentUser){
    //     return currentUser;
    // }
    //不存在则从远程获取用户信息
    const res = await myAxios.get('/user/current')
    if(res.code === 0){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}

