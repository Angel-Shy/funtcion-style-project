import {DirectionSearchCondition, DirectionsSaveDataFromServer} from "./constants";

export default function directionReducer(state_direction, action){
    let {type, data} = action;
    switch (type) {
        case DirectionSearchCondition:
            state_direction.condition.form = data;
            break;
        case DirectionsSaveDataFromServer:
            state_direction.directions = data;
            break;
        default:
            return null;
    }
    return state_direction;
}