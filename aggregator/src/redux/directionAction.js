import {DirectionSearchCondition, DirectionsSaveDataFromServer} from "./constants";

export const DirectionSearchConditionAction = data => ({type: DirectionSearchCondition, data});
export const DirectionsSaveDataFromServerAction = data => ({type: DirectionsSaveDataFromServer, data});
