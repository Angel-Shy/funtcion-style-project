export const delimiter = '/';


//指令管理页面存取的全局对象
export const DIRECTIONPrefix = 'DIRECTION';
export const DirectionSearchCondition = `${DIRECTIONPrefix}${delimiter}DIRECTIONSEARCHCONDITION`;
export const DirectionsSaveDataFromServer = `${DIRECTIONPrefix}${delimiter}DIRECTIONSSAVEDATAFROMSERVER`;

//合同页面存取的全局对象
export const CONTRACTPrefix = 'CONTRACT';
export const ContractSaveSearchCondition = `${CONTRACTPrefix}${delimiter}CONSTRACTSAVESEARCHCONDITION`;
export const ContractsSaveDataFromServer = `${CONTRACTPrefix}${delimiter}CONTRACTSSAVEDATAFROMSERVE`;

//网络管理界面存取全局对象
export const INTERNETPrefix = 'INTERNET';
export const InternetSaveSearchCondition = `${INTERNETPrefix}${delimiter}INTERNETSAVESEARCHCONDITION`;
export const InternetSaveDataFromServer  = `${INTERNETPrefix}${delimiter}INTERNETSAVEDATAFROMSERVER`;

//区块浏览存取全局对象
export const BLOCKCHAINPrefix = 'BLOCKCHAIN';
export const BlockChainSaveDataFromServer = `${BLOCKCHAINPrefix}${delimiter}BLOCKCHAINSAVEDATAFROMSERVER`;
export const BlockChainSaveSearchCondition = `${BLOCKCHAINPrefix}${delimiter}BLOCKCHAINSAVESEARCHCONDITION`;
