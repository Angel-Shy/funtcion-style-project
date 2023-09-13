import axiosConfig from "./axios.config";
import {
    POST_TRANSACTION_TRANSACTIONS,
    POST_TRANSACTION_E_REFUSE,
    POST_TRANSACTION_E_AGREE,
    POST_TRANSACTION_E_CANCEL,
    POST_TRADE_E_REQUEST,
    POST_TRANSACTION_E_PUBLISH,
    POST_TRANSACTION_C_REQUEST, POST_TRANSACTION_C_PUBLISH
} from './routes';
import {NotifyMessage} from "../pubsub";

// -- /transaction/erequest
export function getElectricityTransactionRequest(ParameterObject, success){
    axiosConfig.post(POST_TRADE_E_REQUEST, ParameterObject).then( response => {
        if (typeof success == 'function') success(response.data);;
    }).catch(error =>{
        if (typeof failure == 'function') failure();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /transaction/erequest");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[tsr:2001]`);
        }
    });
}
// -- /transaction/transactions
export function transactionGetHistoryRequest(parameterObject, updateData) {
    axiosConfig.post(POST_TRANSACTION_TRANSACTIONS, {...parameterObject}).then( response => {
        updateData(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /transaction/transactions");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[tsr:2002]`);
        }
    })
}
// -- /transaction/erefuse
export function refuseTransactionRequest(parameterObject, success, errClose) {
    axiosConfig.post(POST_TRANSACTION_E_REFUSE, parameterObject).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error =>{
        if (typeof errClose == 'function') errClose();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /transaction/erefuse");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[tsr:2003]`);
        }
    })
}
// -- /transaction/eagree
export function subscribeTransactionRequest(parameterObject, success, errClose) {
    axiosConfig.post(POST_TRANSACTION_E_AGREE, parameterObject).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error =>{
        if (typeof errClose == 'function') errClose();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /transaction/eagree");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[tsr:2004]`);
        }
    })
}
// -- /transaction/epublish
export function getPublishTransactionRequest(ParameterObject, success){
    axiosConfig.post(POST_TRANSACTION_E_PUBLISH, ParameterObject).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error =>{
        if (typeof failure == 'function') failure();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /transaction/epublish");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[tsr:2005]`);
        }
    });
}
// -- /transaction/ecancel
export function cancelTransactionRequest(parameterObject, success, errClose) {
    axiosConfig.post(POST_TRANSACTION_E_CANCEL, parameterObject).then( response => {
        if (typeof success == 'function') success(response.data);
    }).catch(error =>{
        if (typeof errClose == 'function') errClose();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /transaction/ecancel");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[tsr:2006]`);
        }
    })
}

// -- /transaction/crequest
export function getCreditTransactionRequest(ParameterObject, success){
    axiosConfig.post(POST_TRANSACTION_C_REQUEST, ParameterObject).then( response => {
        if (typeof success == 'function') success(response.data);;
    }).catch(error =>{
        if (typeof failure == 'function') failure();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /transaction/erequest");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[tsr:2001]`);
        }
    });
}

// -- /transaction/cpublish
export function getPublishCreditTransactionRequest(ParameterObject, success){
    axiosConfig.post(POST_TRANSACTION_C_PUBLISH, ParameterObject).then( response => {
        if (typeof success == 'function') success(response.data);;
    }).catch(error =>{
        if (typeof failure == 'function') failure();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /transaction/erequest");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 错误[tsr:2001]`);
        }
    });
}
