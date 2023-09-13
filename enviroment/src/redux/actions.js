import {SAVE_DIRECTION, SAVE_USER_INFO} from './directionReducer/constants';
import {SAVE_Notifications} from "./notificationReducer/constans";
import store from "./store";

const saveDirectionAction = data => ({type: SAVE_DIRECTION, data}); /* data: {length: len, data: Array(len)} */
const saveUserInfoAction = data => ({type: SAVE_USER_INFO, data}); /* data:{ user:{ 用户信息对象 } } */
const saveNotificationAction = data => ({type: SAVE_Notifications, data}); /* data:{  count: 0, notifications:[]}  */

export function saveDirection(data){
    store.dispatch(saveDirectionAction(data));
}

export function saveUserInfo(data){
    store.dispatch(saveUserInfoAction(data));
}

export function saveNotifications(data){
    store.dispatch(saveNotificationAction(data));
}
