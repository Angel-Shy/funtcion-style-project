import {
    SubmitMessage,
    CloseLoading,
    OpenLoading,
    OpenImplementDialog
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
/* 打开执行提示框 */
export function NotifyImplementMessage(message, implement){
    PubSub.publish(OpenImplementDialog, { message, implement });
}
