import {ContractSaveSearchCondition, ContractsSaveDataFromServer} from './constants';

export const ContractSaveSearchConditionAction = form => ({type:ContractSaveSearchCondition , data: form});
export const ContractsSaveDataFromServerAction = data => ({type:ContractsSaveDataFromServer , data})