import {ContractSaveSearchCondition, ContractsSaveDataFromServer} from './constants';

export default function contractReducer(contract, action){
    let {type, data} = action;
    switch (type) {
        case ContractSaveSearchCondition:
            contract.condition.form = data;
            break;
        case ContractsSaveDataFromServer:
            contract.table = data;
            break;
        default:
            return null;
    }
    return contract;
}