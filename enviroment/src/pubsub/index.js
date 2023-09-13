import {
    SubmitMessage,
    CloseLoading,
    OpenLoading,
    OpenElectricContract,
    OpenImplementDialog,
    OpenCreditContract,
    OpenMustImplementDialog,
    NewRequirementPublished,
    CheckElectricityTransactionSuccess,
    CheckCreditTransactionSuccess
} from "./constants";
import PubSub from "pubsub-js";

/* 原则上每个页面都要准备处理 Pubsub 消息发布 */
export function NotifyMessage(Message) {
    PubSub.publish(SubmitMessage, Message);
}
/* 关闭加载页面 */
export function NotifyCloseLoading(){
    PubSub.publish(CloseLoading, '');
}
/* 打开加载页面 */
export function NotifyOpenLoading(Message){
    PubSub.publish(OpenLoading, Message);
}

/* 打开电力交易合同  需要传递的消息有：一个交易/合同的具体信息 */
export function NotifyOpenElectricContract(firstOrSecond,contract, idx, isDetail){
    //firstOrSecond: true  用前面的参数 false 用后面的参数
    PubSub.publish(OpenElectricContract, {firstOrSecond,contract,idx,isDetail });
}
/* 打开积分交易合同 需要传递的消息有：一个交易对象 */
export function NotifyOpenCreditContract(transaction, isDetail){
    PubSub.publish(OpenCreditContract, {transaction, isDetail})
}
/* 打开执行提示框 */
export function NotifyImplementMessage(message, implement){
    PubSub.publish(OpenImplementDialog, { message, implement });
}


export function ActionMustNotifyImplementMessage(message, implement){
    PubSub.publish(OpenMustImplementDialog, { message, implement });
}

/* 新需求发布 */

export function NotifyNewRequirementMessage(message = '新需求发布啦'){
    PubSub.publish(NewRequirementPublished, {message });
}

/* check 电力 */
export function NotifyElectricityTransactionSuccess(message = '电力交易审核完成'){
    PubSub.publish(CheckElectricityTransactionSuccess, {message });
}

export function NotifyCreditTransactionSuccess( message = '积分交易审核完成' ){
    PubSub.publish(CheckCreditTransactionSuccess, {message });
}