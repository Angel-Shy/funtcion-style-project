import axiosConfig from "./axios.config";
import { POST_NOTICE_NOTIFICATION,GET_USER_WITHOUT_CHECK_NOTIFICATION, DELETE_NOTICE_DELETE} from './routes';
import {NotifyMessage} from "../pubsub";

export function notificationsGetHistoryRequest(parameterObject, updateData) {
    axiosConfig.post(POST_NOTICE_NOTIFICATION, {...parameterObject}).then( response => {
        updateData(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /notice/notification");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 服务器错误`);
        }
    });
}

export function notificationGetWaitingRequest(updateDate) {
    axiosConfig.get(GET_USER_WITHOUT_CHECK_NOTIFICATION).then( response => {
        updateDate(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /notice/notification");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 服务器错误`);
        }
    })

}

export function notificationDeleteRequest(Parameter, success, failure){
    axiosConfig.delete(DELETE_NOTICE_DELETE, {
        data:Parameter
    }).then(response => {
        if (typeof success == "function") success(response.data);
    }).catch(error =>{
        if (typeof failure == "function") failure();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /notice/delete");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 服务器错误`);
        }
    })
}
