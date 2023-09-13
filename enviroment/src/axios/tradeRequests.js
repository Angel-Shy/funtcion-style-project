import axiosConfig from "./axios.config";
import {
    GET_DIRECTION_WAITING,
    POST_TRADE_ELECTRIC_TRANSACTION,
    POST_TRADE_CREDIT_TRANSACTION,
    POST_TRADE_MARKET,
    POST_TRADE_PURCHASE,
    POST_TRADE_E_REQUEST
} from "./routes";
import {NotifyMessage, NotifyCloseLoading, NotifyOpenLoading, NotifyNewRequirementMessage} from "../pubsub";
import {saveDirection} from "../redux/actions";

/* 检索指令 */
export function getDirectionRequest(success){
    axiosConfig.get(GET_DIRECTION_WAITING).then(
        response => {
            saveDirection(response.data);
            if (typeof(success) == 'function'){
                success(response.data);
            }
        }
    ).catch(error => {
        //pubsub处理
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message}: 请求服务器指令信息错误！`);
        }
    });
}

/* 发布电力交易 */
export function publishTradeElectricRequest(ParameterObject, close){
    NotifyOpenLoading();
    ParameterObject.point = ParameterObject.credit;
    axiosConfig.post(POST_TRADE_ELECTRIC_TRANSACTION, ParameterObject).then(
        response => {
            NotifyNewRequirementMessage();
            NotifyCloseLoading();
            close(); //关闭还是不关闭
            NotifyMessage('电力交易发布成功！');
            /*
            * 等待代码：刷新交易商场
            * */
        }
    ).catch(error => {
        //pubsub处理
        NotifyCloseLoading();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message}: 请求服务器处理交易请求错误！`);
        }
    })
}

/* 发布积分交易 */
export function publishTradeCreditRequest(ParameterObject, close){
    NotifyOpenLoading();
    ParameterObject.point = ParameterObject.credit;
    axiosConfig.post(POST_TRADE_CREDIT_TRANSACTION, ParameterObject).then(
        response => {
            NotifyNewRequirementMessage();
            NotifyCloseLoading();
            close(); //关闭还是不关闭
            NotifyMessage('积分交易发布成功！');
            /*
            * 等待代码：刷新交易商场
            * */
        }
    ).catch(error => {
        //pubsub处理
        NotifyCloseLoading();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message);
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message}: 请求服务器处理交易请求错误！`);
        }
    })
}

/* 检索需求市场信息 */
export function getMarketRequest(ParameterObject, updateData) {
    axiosConfig.post(POST_TRADE_MARKET, {...ParameterObject}).then( response => {
        updateData(response.data);
    }).catch(error =>{
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /trade/market");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 服务器错误`);
        }
    })
}

/*出价购买*/
export function pushTransactionRequest(ParameterObject, success, failure){
    axiosConfig.post(POST_TRADE_PURCHASE, ParameterObject).then( response => {
        if (typeof success == 'function') success(response.data);;
    }).catch(error =>{
        if (typeof failure == 'function') failure();
        if (error.response){
            /* 服务器正常报告你的操作错误 */
            NotifyMessage(error.response.data.message??"服务器未说明错误！ -- 请求路由 /trade/purchase");
        }else{
            /* 报告服务器错误，或者网络错误 这些错误的发生是服务器没有进行处理而直接发出的！ */
            NotifyMessage(`${error.message} --- 服务器错误`);
        }
    })
}


