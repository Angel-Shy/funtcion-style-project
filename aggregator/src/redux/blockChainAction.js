import {
    BlockChainSaveDataFromServer,
    BlockChainSaveSearchCondition
} from './constants';

export const BlockChainSaveDataFromServerAction = form => ({type:BlockChainSaveDataFromServer , data: form});
export const BlockChainSaveSearchConditionAction = data => ({type:BlockChainSaveSearchCondition , data})