import axiosConfig from "./axios.config";
import {POST_USER_LOGIN, POST_ALTER_USER_PASSWORD, POST_USER_LOGOUT, GET_USER_INFORMATION} from './routes';
import {NotifyMessage, NotifyCloseLoading, NotifyOpenLoading, NotifyImplementMessage} from "../pubsub";
import {saveToken, logout} from "./user";
import {saveUserInfo} from "../redux/actions";

/*
* parameterObject: 请求参数
* closeLoading 关闭加载...
* */
export function userLoginRequest(parameterObject, closeLoading){
    axiosConfig.post(POST_USER_LOGIN, {...parameterObject}).then(
        response => {
            closeLoading();//关闭加载框
            saveToken(response.data.token);  /* 数据类型：  {tokens: '2022655411418', timeout: '2022/6/21 下午5:34:01'}  */
        }
    ).catch(error => {
        closeLoading();
        //pubsub处理
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message}`);
        }
    });
}

/* 修改账户密码 */
export function userAlterPasswordRequest(ParameterObject){
    NotifyOpenLoading();
    axiosConfig.post(POST_ALTER_USER_PASSWORD, ParameterObject).then(response => {
        NotifyCloseLoading();
        NotifyMessage('修改密码成功！');
        /*
        * 等待代码：需要退出重新登陆
        * */
    }).catch(error => {
        //pubsub处理
        NotifyCloseLoading();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message}`);
        }
    })
}

/* 给服务器发一个注销账户的请求，但是不关心后续情况！ */
export function userLogoutRequest(ParameterObject){
    axiosConfig.post(POST_USER_LOGOUT, ParameterObject).then(response => {
       //console.log(response);
    }).catch(error => {
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            //NotifyMessage(error.response.data.message);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            //NotifyMessage(`${error.message}: 请求服务器处理交易请求错误！`);
        }
    })
}

/* 给服务器 发生GET 请求个人资产  */
export function userAssetsRequest(success){
    axiosConfig.get(GET_USER_INFORMATION).then(response => {
        saveUserInfo({user: response.data});
        if (typeof success === 'function') success(response.data);
    }).catch(error => {
        /* 无法加载个人信息会跳出去 */
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyImplementMessage(`${error.response.data.message} `, () => {
                logout();
            });
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyImplementMessage(`${error.message}`, () => {
                logout();
            });
        }
    });
}
