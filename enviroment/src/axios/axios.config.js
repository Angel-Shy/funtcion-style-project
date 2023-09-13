import axios from "axios";
import {logout} from "./user";

/* 测试服务器 */
let ipAddress = "127.0.0.1";
let port = 17002;
/* 交易平台 */
// let ipAddress = "182.148.114.187";
// let port = 17002;

const instance = axios.create({
    baseURL: `http://${ipAddress}:${port}`,
    timeout: 4500,
    responseEncoding: 'utf8',
    responseType: 'json',
    withCredentials: false,
    validateStatus: function (status) {
        return status >= 200 && status < 300 || status == 401; // default
    },
    // 将参数 编码为：application/x-www-form-urlencoded
    // transformRequest: [function (data) {
    //     // 对 data 进行任意转换处理
    //     let str = '';
    //     for (const key in data) {
    //         str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
    //     }
    //     return str.slice(0, str.length - 1);
    // }]
});


// 请求拦截器 配置 token
instance.interceptors.request.use(function (config) {
    let token = window.sessionStorage.getItem('token')
    // 判断token存在再做配置
    if (token) {
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //代码不起作用
instance.defaults.headers.common['Authentication-Code'] = '???';
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    if (response.status == 401){
        logout(); //ActionMustNotifyImplementMessage('由于你长时间未操作，登录状态已过期！', logout);
        return Promise.resolve(response);
    }else{
        return Promise.resolve(response);
    }
}, function (error) {
    if (!error.response){
        error.message = `网络请求超时,未获取请求结果！`;
    }
    return Promise.reject(error);
});


export default instance;

