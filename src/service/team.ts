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
}