import {combineReducers} from 'redux';
import directions from './directionReducer/reducer';
import transactions from './transactionReducer/reducer';
import requirements from './requirementReducer/reducer';
import notifications from './notificationReducer/reducer';

export default combineReducers({
    directions,  /* 牵一发动全身 别乱改名 */
    transactions, /* 牵一发动全身 别乱改名 */
    requirements, /* 牵一发动全身 别乱改名 */
    notifications,/* 牵一发动全身 别乱改名 */
})
