/*  登陆  */
export const POSTUSERLOGIN = '/user/login';
/* 首页 获取系统状态 */
export const GETSYSTEMSTATE = '/system/state';
/*获取在线，节约电荷，碳排放减少，区块链积分，高度*/
export const GETDASHBOARDSTATE = '/system/dashboard';
/*获取指令执行进度信息 */
export const GETDADIRECTIONIMPLEMENTSTATE = '/system/direction';
/*获取碳排放 电荷节约情况 */
export const GETELECTRICANDCO2REDUCESTATE = '/system/electric';
/*获取区块链系统交易信息 */
export const GETSYSTEMTRADE = '/system/trade';
/* 上车调控指令信息 */
export const POSTDIRECTIONINFOMATION = '/direction/issue'
/* 获得指令系统状态 */
export const GETDIRECTIONSYSTEMSTATE = '/direction/state'
/* 获得指令Table数据 需要分页 TMD data 写出了 date 了 fuck */
export const POSTDIRECTIONSDATE = '/direction/directions';
/* 获取指令状态分布*/
export const GET_DIRECTION_TYPE = '/direction/type';
/* 获取电荷量*/
export const GET_DIRECTION_ELECTRIC = '/direction/electric';
/* 获取交易合同的EChart 数据 */
export const GETCONTRACTECHART = '/contract/echart'
/* 获取合同Table数据 需要分页 */
export const POSTCONTRACTSDATA = '/contract/contracts';
/* 添加一个新的区块链网络节点哦 */
export const POSTINTERNETADDBLOCKCHAINNODE = '/internet/add';
/* 获取区块链节点在线监控， 获得积分和信誉分节点数据 */
export const GETINTERNETECHARTSDATE = '/internet/echart';
/* 获取节点数据 Table 需要分页  */
export const POSTINTERNETNODESDATA = '/internet/nodes';
/* 获取单个节点数据 不需要分页  */
export const GETINTERNETNODEINFO = '/internet/node';
/* 删除一个节点 */
export const DELETEINTERNETNODE = '/internet/delete';
/* 获取区块数据 Table 需要分页 */
export const POSTBLOCKCHAINDATA = '/block/blocks';
/* 获取区块链系统运行状态信息 */
export const GETBLOCKCHAINSYSYTEMSTATE = '/block/echart';
/* 获取区块前TOP 10 区块，或者15 呢！ 我也不知道咋办！ */
export const GETBLOCKTOPDATA = '/block/top'
/* 获取指令执行进度 */
export const GETDIRECTIONPROGRESS = '/history/progress';
/* 获取每个合同的数值 */
export const GETDIRECTIONCONTRACTS = '/history/contracts';
/* 获取用于展示指令的操作日历的数据 */
export const GETDIRECTIONCALENDAR = '/history/calendar';
/* 指令生命周期操作*/
export const GETDIRECTIONLIFE = '/history/life';
