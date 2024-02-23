import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8999/api',
    });


//表示像前端发送请求的时候，要携带这个凭证
myAxios.defaults.withCredentials = true;

// 添加请求拦截器
//todo 第四集下面这一行是注释的样子是错的，应该是myAxios

// axios.interceptors.request.use(function (config) {
myAxios.interceptors.request.use(function (config) {
    console.log("我要发请求了",config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    if(response?.data?.code == 40100){
        window.location.href = '/user/login';
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log("我收到你的响应了",response)
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;

