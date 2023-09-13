import PubSub from "pubsub-js";
/* axios 请求错误提示信息 */
export const SUBMITNOTICEERRORMESSAGE = 'SUBMIT_NOTICE_ERROR_MESSAGE';

export const SUBMITNOTICEGETITERNETNODEINFO = 'SUBMIT_NOTICE_GET_ITERNET_NODE_INFO';

export const UPDATENETWORKSTATE = 'UPDATENETWORKSTATE';

export const ACTIONDIALOGCARRYOUTDIALOG = 'ACTIONDIALOGCARRYOUTDIALOG';

/* 下发指令成功后刷新指令状态信息和列表 */
export const AddDirectionSuccessfully = 'AddDirectionSuccessfully';

/* 打开加载页面 */
export const OpenLoadingShowNow = 'OpenLoadingShowNow';
/* 关闭加载页面 */
export const CloseLoadingShowNow = 'CloseLoadingShowNow';
/* 打开加载页面 */
export function ActionNotifyOpenDialog(message, action){
    PubSub.publish(ACTIONDIALOGCARRYOUTDIALOG, {message, action});
}

export function OpenLoadingDialog(){
    PubSub.publish(OpenLoadingShowNow, {isOpen: true});
}
export function CloseLoadingDialog(){
    PubSub.publish(CloseLoadingShowNow, {isOpen: false});
}