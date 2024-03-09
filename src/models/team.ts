import {UserType} from "./user";


/**
 * 队伍属性
 */
export type TeamType ={
    "id": number,
    "name": string,
    "description": string,
    "expireTime"?: Date,
    "maxNum":number,
    "password"?: string,
    //  todo 定义枚举值
    "status":string,
    "createUser":string,
    "createTime":Date,
    "userId":number,
    "hasJoinNum":number,
    "hasJoin":string,
    "coverImage":string
}

export type TeamListType = {
    "id": number,
    "teamName": string,
    "teamAvatarUrl"?: string,
    "teamPassword"?: string,
    "teamDesc": string,
    "maxNum": number,
    "expireTime": Date,
    "teamStatus": number,
    "createTime": Date,
    "announce"?: string,
    "user"?: UserType,
    "userSet"?: UserType[]
}