import {
    BLOCKCHAINPrefix,
    BlockChainSaveSearchCondition,
    BlockChainSaveDataFromServer
} from './constants';

export default function blockReducer(block, action){
    let {type, data} = action;
    switch (type) {
        case BlockChainSaveSearchCondition:
            block.form = data;
            break;
        case BlockChainSaveDataFromServer:
            block.table = data;
            break;
        default:
            return null;
    }
    return block;
}