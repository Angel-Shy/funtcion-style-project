import {InternetSaveDataFromServer, InternetSaveSearchCondition} from './constants';

export const InternetSaveSearchConditionAction = form => ({type: InternetSaveSearchCondition, data:form});
export const InternetSaveDataFromServerAction = data => ({type: InternetSaveDataFromServer, data});
