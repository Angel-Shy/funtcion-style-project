import {SAVE_Notifications} from './constans.js';

const InitialState = {
    notificationTypes: [
        {name:'全部类型', value: -1},
        {name:"收到积分合同请求", value: 1},
        {name:"收到电力合同请求", value: 2},
        {name:"新的交易需求", value: 3},
        {name:"电力合同被拒绝", value: 4},
        {name:"积分合同被拒绝", value: 5},
        {name:"积分交易合同被签署", value: 6},
        {name:"电力交易合同被签署", value: 7},
        {name:"积分交易合同签署失败", value: 8},
        {name:"电力交易合同签署失败", value: 9},
    ],
    notificationTypeDefaultValue: -1,  /* 默认值 */
    count: 0,
    notifications:[]
}


export default function reducer(state, action){
    const {data, type} = action;
    switch (type) {
        case SAVE_Notifications:
            state.notifications = data.notifications;
            state.count = data.notifications.length;
            return {...state};
        default:
            return InitialState;
    }
}
