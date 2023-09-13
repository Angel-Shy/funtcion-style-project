import directionReducer from './directionReducer';
import contractReducer from "./ContractReducer";
import internetReducer from  './internetReducer';
import blockChainReducer from './blockChainReducer'

import {delimiter, DIRECTIONPrefix, CONTRACTPrefix, INTERNETPrefix, BLOCKCHAINPrefix} from  './constants';

const initStateValue = {
    direction:{
        condition:{
            form:{

            },
            divisionPage:{
                pageIndex: 0
            },
        }, //存放从服务器获取的数据
        directions:{
            data:{}, //数据
            total: 0, //总数
            pageCount:0
        }
    },
    contract:{
        condition:{
            form:{

            },
        },
        table:{
            data:{}, //数据
            total: 0, //总数
            pageCount:0
        }
    },
    internet:{
        form:{

        },
        table:{
            data:{}, //数据
            total: 0, //总数
            pageCount:0
        }
    },
    block:{
        form:{

        },
        table:{
            data:{}, //数据
            total: 0, //总数
            pageCount:0
        }
    }
};
export default function reducer(previousState = initStateValue , action){
    let {type} = action;
    let prefix = type.split(delimiter)[0];
    switch (prefix){
        case DIRECTIONPrefix:
            previousState.direction = directionReducer(previousState.direction, action);
            break;
        case CONTRACTPrefix:
            previousState.contract = contractReducer(previousState.contract, action);
            break;
        case INTERNETPrefix:
            previousState.internet = internetReducer(previousState.internet, action);
            break;
        case BLOCKCHAINPrefix:
            previousState.block = blockChainReducer(previousState.block, action);
            break;
        default:
            return previousState;
    }
    return previousState;
}