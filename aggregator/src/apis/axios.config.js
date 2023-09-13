import axios from "axios";
import {loginOut} from './user';

/* 测试服务器 */
/*let ipAddress = "127.0.0.1";
let port = 17001;*/
/* 聚合商 IP */
let ipAddress = "182.148.114.187";
let port = 17001;

const instance = axios.create({
    baseURL: `http://${ipAddress}:${port}`,
    timeout: 8500,
    responseEncoding: 'utf8',
    responseType: 'json',
    withCredentials: false,
    validateStatus: function (status) {
        if (status === 401){
            return true
        }
        return status >= 200 && status < 300; // default
    }
});
instance.defaults.headers.common['Authentication-Code'] = 'ASDFEGH3AD';

// 请求拦截器
instance.interceptors.request.use(function (config) {
    let token = window.sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization =  token;
    }
    return config;
  }, function (error) {
    return Promise.reject(error)
  })
  

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    if(response.data.code != 200) 
    {
        if (response.data.code == 401){
            loginOut();
        }else{
            let error = {};
            response.data.message = response.data.message??"服务器错误未说明！";
            error.response = response;
            return Promise.reject(error);
        }
    }

    if (response.status === 401){
        loginOut();
        return Promise.resolve(response);
    }else{
        return Promise.resolve(response);
    }
}, function (error) {
    if (!error.response){
        error.message = `网络请求超时,未获取请求结果！ `;
    }
    return Promise.reject(error);
});


export default instance;

