import React, {useCallback, useReducer, useEffect, useRef} from 'react';
import stl from './StatisticsTransactionHistory.module.scss';
import {Operations} from "../../../../toolkits";
import Select from "../../../../components/public/from/Select/Select";
import SortIcon from "../SortIcon/SortIcon";
import credit from "../../../../static/icon/iconfonts/jife.svg";
import shanDian from '../../../../static/icon/iconfonts/lightning3.svg';
import no_oo from "../../../../static/icon/iconfonts/bianhao.svg";
import contract_icon from '../../../../static/pics/合同.png';
import {contractsGetHistoryRequest} from "../../../../axios/dashBoardRequests";
import xinYu from '../../../../static/pics/信誉_fill.png';
import time_icon from '../../../../static/icon/alibaba/time.svg';
import DialogContainer,{getDialogDefaultSetting} from "../../../../components/public/dialog/DialogContainer/DialogContainer";
import ShowContractDetailDialogContent from "./ShowContractDetail/ShowContractDetail";

/* 查看合同详情对话框 */
let dialogSetting = getDialogDefaultSetting();
dialogSetting.bcIsCancel = true;
dialogSetting.height = 710;
dialogSetting.width = 1200;
dialogSetting.title = '查看详情';
dialogSetting.isNeedFooter = false;

const TransactionChangeContractState = 'Transaction_Change_Transaction_State_';
const TransactionChangeSortTime = 'Transaction_Change_Sort_Time_';
const TransactionChangeCmdID = 'Transaction_Change_Cmd_Id_';
const JumpPageGetServer = 'JumpPageGetServer';
const CloseContractDetail = 'CloseContractDetail';
const OpenContractDetail = 'OpenContractDetail';

function reducer(state, action){
    switch (action.type) {
        case TransactionChangeCmdID:/* 修改指令ID */
            state.condition.cmdId = action.payload.value;
            return {...state};
        case TransactionChangeContractState: /* 交易的状态 */
            state.condition.contractState = action.payload.value;
            return {...state};
        case TransactionChangeSortTime: /* 时间排序规则 */
            state.condition.sortTime = action.payload.value;
            return {...state};
        case JumpPageGetServer: /* 页面跳转 */
            state.tableData = action.payload.tableData;
            state.condition.pageIndex = action.payload.pageIndex;
            return {...state};
        case CloseContractDetail:
            state.activeObject = null;
            state.DetailShow = false;
            return  {...state};
        case OpenContractDetail:
            state.activeObject = action.payload.Contract;
            state.DetailShow = true;
            return  {...state};
        default:
            return state;
    }
}
//合同类型
let contractState = [
    {value: 0, name:'所有合同'},
    {value: 1, name:'签署中'},
    {value: 2, name:'签署完毕'},
    {value: 3, name:'执行中'},
    {value: 4, name:'已完成'},
];

function StatisticsTransactionHistory(props) {

    const [store, dispatch] = useReducer(reducer, {}, (_) => {
        return {
            condition:{
                cmdId: "",
                contractState: -1,
                pageIndex: 1,
                count: 6,
                sortTime: 1, /* 降序 v:1 升序 v:0 */
            },
            tableData:{
                pageCount: 1,
                data:[],
                total: 0
            },
            DetailShow: false,
            activeObject: null,
        }
    });

    let ShowContractDetail = useCallback( Contract => {
        return e => {
            dispatch({ type:OpenContractDetail , payload: { Contract: Contract } });
        }
    });
    /* 选择 */
    let SelectChangeEvent = useCallback((actionType) => {
        return v => { dispatch({type : actionType, payload:{value: v} });}
    }, []);


    useEffect(() => {
        jumpGetDataFromServer(Operations.FIRST);
    },[]);

    /* region 实现分页功能 为了防止陷入状态机死循环，先获取数据再更新 store*/
    let jumpGetDataFromServer = useCallback(op => {
        let condition = {};
        Object.assign(condition, store.condition);
        let idx = 1; /* 默认首页 */
        if (op === Operations.PREV){
            /*上一页*/
            idx = store.condition.pageIndex - 1;
        }else if (op === Operations.NEXT){
            /* 下一页 */
            idx = store.condition.pageIndex + 1;
        } else if(op === Operations.LAST){
            /* 最后一页 有BUG 解决方法：搜索条件一遍 就刷新 table */
            idx = store.tableData.pageCount;
        } else if (op === Operations.JUMP){
            /* 跳转页面 */
            idx = parseInt(SelectJumpElement.current.value);
        }
        condition.pageIndex = idx;
        contractsGetHistoryRequest(condition, data => {
            let action = {
                type: JumpPageGetServer,
                payload:{
                    tableData:{
                        pageCount: data.pageCount,
                        data:data.data,
                        total: data.total
                    },
                    pageIndex: idx
                }
            }
            dispatch(action);
        });
    }, [store]);

    /* 页面跳转 功能转到 jumpGetDataFromServer */
    let JumpPage = useCallback( op => {
        return e => {
            jumpGetDataFromServer(op);
        }
    }, []);
    /* 设置 select标签 option内容*/
    let options = [];
    for(let i = 0; i < store.tableData.pageCount; i++){
        options.push(i);
    }
    let prev = store.condition.pageIndex - 1;
    let next = store.condition.pageIndex + 1;
    let prevIsDisabled = prev <= 0;
    let nextIsDisabled = next > store.tableData.pageCount;
    /* 实现分页功能 */
    const SelectJumpElement = useRef();
    /* endRegion 实现分页功能 */
    /* 页面渲染 */
    return (
        <div className={`${stl.statisticsTransactionHistory} boxStyle `}>
            <div>
                <div className={'searchCondition padding-top-15px'}>
                    <form action="">
                        <div className={'formLineMix'}>
                            <span className={'item'}>指令编号：</span>
                            <input type="number"
                                   onChange={e => { dispatch({type: TransactionChangeCmdID, payload:{value: e.target.value}}) }}
                                   className="myInput"
                                   placeholder="默认查询所有"
                            />
                            <span className={'itemAfter'}>合同状态：</span>
                            <Select sendData={SelectChangeEvent(TransactionChangeContractState)} options={contractState}  />
                            <SortIcon
                                meaning={['发布时间降序', '发布时间升序']}
                                getSort={SelectChangeEvent(TransactionChangeSortTime)}
                            />
                            <button className={'FUIButton FUI-btnBlue margin-left-15px'}  onClick={e => {jumpGetDataFromServer(Operations.FIRST);}}  >
                                <span className={'glyphicon glyphicon-search'}>立即检索</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className={'normalTableContainer'} style={{ height: 320 }} >
                    <table className={`table tableHover`}>
                        <thead>
                            <tr className="font-weight-600">
                            <td>
                                <input type="checkbox"/>
                            </td>
                            <td className={stl.iconTD}><img src={no_oo} alt="序号"/>序号</td>
                            <td>指令编号</td>
                            <td>合同号</td>
                            <td>指令类型</td>
                            <td>简述</td>
                            <td className={stl.iconTD}>
                                <img src={shanDian} alt="负荷量"/>
                                下发负荷量
                            </td>
                            <td className={stl.iconTD}>
                                <img src={shanDian} alt="负荷量"/>
                                实际执行负荷量
                            </td>
                            <td className={stl.iconTD}>
                                <img src={credit} alt="负荷量"/>
                                预计获得积分
                            </td>
                            <td className={stl.iconTD}>
                                <img src={credit} alt="负荷量"/>
                                实际获得积分
                            </td>
                            <td>信誉分变化</td>
                            <td>开始执行时间</td>
                            <td>预计结束时间</td>
                            <td>指令状态</td>
                            <td>合同状态</td>
                            <td>操作</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            store.tableData.data.map( (element,idx) => {
                                return (
                                    <tr key={element.contractIndex}>
                                        <td>
                                            <input type="checkbox"/>
                                        </td>
                                        <td>
                                            {(store.condition.pageIndex - 1) * store.condition.count + idx + 1}
                                        </td>
                                        <td>
                                            {element.cmdId}
                                        </td>
                                        <td> {element.contractIndex} </td>
                                        <td>
                                            <span >{element.type}</span>
                                        </td>
                                        <td className={stl.createTransactionType} >
                                            <img src={contract_icon} alt=""/> <span> {element.codeName} </span>
                                        </td>
                                        <td className={stl.iconTD}>
                                            <img src={shanDian} alt="负荷量"/>
                                            {element.valueElectric} {element.electricUnit}
                                        </td>
                                        <td className={stl.iconTD}>
                                            <img src={shanDian} alt="负荷量"/>
                                            {element.actualElectricValue} {element.electricUnit}
                                        </td>
                                        <td className={stl.iconTD}>
                                            <img src={credit} alt="负荷量"/>
                                            {element.point}
                                        </td>
                                        <td className={stl.iconTD}>
                                            <img src={credit} alt="负荷量"/>
                                            {element.actualPoint}
                                        </td>
                                        <td className={stl.iconTD}><img src={xinYu} alt="信誉分"/>  {element.reputationChange} </td>
                                        <td className={stl.showTime}>
                                            <span className={'font-blue'}>{element.carryOutTime}</span>
                                        </td>
                                        <td className={stl.showTime}>
                                            <span>{element.endTime}</span>
                                        </td>
                                        <td className={stl.showTime}>
                                            <span>{element.cmdStates}</span>
                                        </td>
                                        <td> {element.contractState}</td>
                                        <td>
                                            <button className={'normalLinkDetailOperation'} onClick={ShowContractDetail(element)}  >查看详情</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className={'division'}>
                    <div className="float-layout">
                        <label className="float-left font-weight-600 ">
                            <span className={'itemKicker'}>第{store.condition.pageIndex === 0?1:store.condition.pageIndex}页 - 总数:{store.tableData.total} 条 </span>
                        </label>
                        <div className="float-right">
                            <button className={'FUIButton FUI-btnBlue'} onClick={JumpPage(Operations.FIRST)}>
                                首页
                            </button>
                            <button  className={`FUIButton ${prevIsDisabled?"FUI-btnDisable":"FUI-btnBlue"}`}  disabled={prevIsDisabled}  onClick={JumpPage(Operations.PREV)}>
                                <span className="glyphicon glyphicon-chevron-left"/> 上一页
                            </button>
                            <button   className={`FUIButton ${nextIsDisabled?"FUI-btnDisable":"FUI-btnBlue"}`} disabled={nextIsDisabled}  onClick={JumpPage(Operations.NEXT)}>
                                下一页 <span className="glyphicon glyphicon-chevron-right"/>
                            </button>
                            <button  className={'FUIButton FUI-btnBlue'} onClick={JumpPage(Operations.LAST)}>
                                尾页
                            </button>
                            <select className={'MySelect'}  ref={SelectJumpElement}>
                                {options.map((v,i)=>{
                                    return <option value={i + 1} key={v} >第{v + 1}页</option>
                                })}
                            </select>
                            <button  className={'FUIButton FUI-btnBlue'} onClick={JumpPage(Operations.JUMP)}>跳转</button>
                        </div>
                    </div>
                </div>
                {
                    store.DetailShow?<DialogContainer
                        close={() => dispatch({type: CloseContractDetail})}
                        render={<ShowContractDetailDialogContent active0bject={store.activeObject} close={() => dispatch({type: CloseContractDetail})}  />}
                        {...dialogSetting}
                    />:''
                }
            </div>
        </div>
    );
}

export default StatisticsTransactionHistory;