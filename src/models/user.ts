/**
 * 用户类别
 */
export type UserType = {
    id : number;
    username : string;
    userAccount : string;
    avatarUrl ?: string;
    gender : number;
    profile:string;
    phone : string;
    email : string;
    userStatus : number;
    createTime : Date;
    userRole: number;
    tags:string[];
    planetCode: number;
};