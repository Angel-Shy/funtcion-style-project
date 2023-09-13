import {SAVE_DIRECTION, SAVE_USER_INFO} from './constants';

let directionsInitial = {
    length:0,
    directions: [],
    user:{
        id:1,
        codeId:'加载中...',
        address:"加载中...",
        points:0,
        freezingPoints:0,
        availablePoints:0,
        reputation:0,
        offLineTime:"0",
        electricityToBeExecuted:0, //待执行电荷量
        electricityUnit: 'kw.h',
        states:"在线",
        phone:"...",
    }
}

export default function reducer(state = directionsInitial, action) {
    const {data, type} = action;

    switch (type) {
        case SAVE_DIRECTION:
            state.directions = data.data;
            state.length = data.length;
            return {...state};
        case SAVE_USER_INFO:
            state.user = data.user;
            return {...state};
        default:
            return state; //初始化，已经使用参数默认值初始化了
    }
}
