import {
    InternetSaveDataFromServer,
    InternetSaveSearchCondition
} from './constants';

export default function directionReducer(internet, action){
    let {type, data} = action;
    switch (type) {
        case InternetSaveSearchCondition:
            internet.form = data;
            break;
        case InternetSaveDataFromServer :
            internet.table = data;
            break;
        default:
            return null;
    }
    return internet;
}