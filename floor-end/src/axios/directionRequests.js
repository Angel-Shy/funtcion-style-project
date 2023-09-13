import {GET_DIRECTION_WAITING, GET_DIRECTION_INSTRUCTIONS, GET_DIRECTION_PROGRESS} from "./routes";
import axiosConfig from "./axios.config";
import {NotifyMessage} from "../pubsub";

export function getWaitingDirectionRequest(success){
    axiosConfig.get(GET_DIRECTION_WAITING).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??`服务器未说明错误！ -- 请求路由${GET_DIRECTION_WAITING}`);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[DR:0001]`);
        }
    });
}

export function getInstructionDirectionRequest(success){
    axiosConfig.get(GET_DIRECTION_INSTRUCTIONS).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??`服务器未说明错误！ -- 请求路由${GET_DIRECTION_INSTRUCTIONS}`);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[DR:0002]`);
        }
    });
}

export function getDirectionProgressRequest(parameter,success){
    axiosConfig.get(GET_DIRECTION_PROGRESS, { params: parameter }).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??`服务器未说明错误！ -- 请求路由${GET_DIRECTION_PROGRESS}`);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[DR:0003]`);
        }
    });
}