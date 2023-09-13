import axiosConfig from "./axios.config";
import {
    POST_REQUIREMENT_REQUIREMENTS,
    DELETE_REQUIREMENT_REVOKE,
    GET_REQUIREMENT_YOURS,
    GET_REQUIREMENT_OTHERS
} from './routes';
import {NotifyMessage} from "../pubsub";

//需求历史接口
export function requirementGetHistoryRequest(parameterObject, updateData) {
    axiosConfig.post(POST_REQUIREMENT_REQUIREMENTS, {...parameterObject}).then( response => {
        updateData(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /requirement/requirements");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[rqm:2001]`);
        }
    })
}

//撤销一笔需求
export function deleteRequirementRequest(parameterObject, success, errorImp){
    axiosConfig.delete(DELETE_REQUIREMENT_REVOKE, {
        data:parameterObject
    }).then(response => {
        success(response.data);
    }).catch(error =>{
        errorImp();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /requirement/revoke");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[rqm:2002]`);
        }
    })
}

//自己的有效需求
export function getYoursRequirementRequest(parameterObject ,success) {
    axiosConfig.get(GET_REQUIREMENT_YOURS, { params: parameterObject }).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /requirement/requirements");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[rqm:2003]`);
        }
    });
}

//获取并非自己发布的有效需求
export function getOthersRequirement(parameterObject, success) {
    axiosConfig.get(GET_REQUIREMENT_OTHERS,{ params: parameterObject }).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /requirement/others");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[rqm:2004]`);
        }
    });
}
