import {
    GET_DASHBOARD_BASIC,
    POST_DASHBOARD_REPORT,
    POST_CONTRACT_OF_SELF,
    POST_DASHBOARD_REPORTS,
    GET_DASHBOARD_YEAR,
    GET_DASHBOARD_ELECTRIC, GET_DASHBOARD_STATISTICS
} from "./routes";
import {NotifyMessage} from "../pubsub";
import axiosConfig from "./axios.config";

export function getInternetNodeStateRequest(success){
    axiosConfig.get(GET_DASHBOARD_BASIC).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??`服务器未说明错误！ -- 请求路由${GET_DASHBOARD_BASIC}`);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[DBR:0001]`);
        }
    });
}

export function postReportAbilityRequest(parameterObject, success, failed) {
    axiosConfig.post(POST_DASHBOARD_REPORT, {...parameterObject}).then( response => {
        success(response.data);
    }).catch(error =>{
        failed();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??`服务器未说明错误！ -- 请求路由${POST_DASHBOARD_REPORT}`);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[DBR:1002]`);
        }
    })
}

// -- /dashboard/contracts
export function contractsGetHistoryRequest(parameterObject, updateData) {
    axiosConfig.post(POST_CONTRACT_OF_SELF, {...parameterObject}).then( response => {
        updateData(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??`服务器未说明错误！ -- 请求路由 ${POST_CONTRACT_OF_SELF}`);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[DBR:1003]`);
        }
    })
}

// -- /dashboard/reports
export function reportsGetHistoryRequest(parameterObject, updateData) {
    axiosConfig.post(POST_DASHBOARD_REPORTS, {...parameterObject}).then( response => {
        updateData(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??`服务器未说明错误！ -- 请求路由 ${POST_DASHBOARD_REPORTS}`);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[DBR:1003]`);
        }
    })
}

//GET_DASHBOARD_YEAR
export function quarterlyGetStatisticsRequest(parameterObject, success){
    axiosConfig.get(GET_DASHBOARD_YEAR, {  params: parameterObject }).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??`服务器未说明错误！ -- 请求路由${GET_DASHBOARD_YEAR}`);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[DBR:0004]`);
        }
    });
}

//GET_DASHBOARD_ELECTRIC
export function electricGetStatisticsRequest(success){
    axiosConfig.get(GET_DASHBOARD_ELECTRIC).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error => {
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??`服务器未说明错误！ -- 请求路由${GET_DASHBOARD_ELECTRIC}`);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[DBR:0005]`);
        }
    })
};

//GET_DASHBOARD_STATISTICS
export function pointAndReputationGetStatisticsRequest(success){
    axiosConfig.get(GET_DASHBOARD_STATISTICS).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error => {
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??`服务器未说明错误！ -- 请求路由${GET_DASHBOARD_STATISTICS}`);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[DBR:0006]`);
        }
    })
}

