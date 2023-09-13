import React, {useCallback, useReducer, useEffect, useRef} from 'react';
import stl from './TransactionHistory.module.scss';
import {connect} from "react-redux";
import Select from "../../../../components/public/from/Select/Select";
import {transactionGetHistoryRequest} from "../../../../axios/transactionRequests";
import {Operations} from "../../../../toolkits";
import {NotifyMessage, NotifyOpenCreditContract, NotifyOpenElectricContract} from "../../../../pubsub";
import SortIcon from "../../TradeContent/SearchCondition/SortIcon/SortIcon";
import electric from "../../../../static/icon/alibaba/electic.svg";
import credit from "../../../../static/icon/iconfonts/jife.svg";
import shanDian from '../../../../static/icon/iconfonts/lightning3.svg';
import floor from '../../../../static/svgs/floor.svg';
import no_oo from "../../../../static/icon/iconfonts/bianhao.svg";

const TransactionChangeTransactionType = 'Change_Transaction_Type_Transaction_';
const TransactionChangeCountNumber = 'Change_Count_Number_Transaction_';
const TransactionChangeTransactionState = 'Transaction_Change_Transaction_State_';
const TransactionChangeSortTime = 'Transaction_Change_Sort_Time_';
const TransactionChangeID = 'Transaction_Change_Id';
const TransactionChangeCmdID = 'Transaction_Change_Cmd_Id_';
const TransactionRequirementID = 'Transaction_Requirement_ID_';
const ChangePartyACode = 'ChangePartyACode';
const ChangePartyBCode = 'ChangePartyBCode';
const ChangeIsOnlyMeState = 'ChangeIsOnlyMeState';
const JumpPageGetServer = 'JumpPageGetServer';

function reducer(state, action){
    switch (action.type) {
        case ChangeIsOnlyMeState: /* 是否只查看自己的交易 */
            state.condition.isOnlyMe = action.payload.value;
            return {...state};
        case ChangePartyACode: /* 修改甲方楼宇编号 */
            state.condition.partyACode = action.payload.value;
            return {...state};
        case ChangePartyBCode: /* 修改乙方楼宇编号 */
            state.condition.partyBCode = action.payload.value;
            return {...state};
        case TransactionRequirementID: /* 修改需求编号 */
            state.condition.requirementCodeId = action.payload.value;
            return {...state};
        case TransactionChangeCmdID:/* 修改指令ID */
            state.condition.cmdId = action.payload.value;
            return {...state};
        case TransactionChangeTransactionType: /* 交易类型 */
            state.condition.transactionType = action.payload.value;
            return {...state};
        case TransactionChangeCountNumber: /* 每一页多少条数据 */
            state.condition.count = action.payload.value;
            return {...state};
        case TransactionChangeTransactionState: /* 交易的状态 */
            state.condition.transactionState = action.payload.value;
            return {...state};
        case TransactionChangeSortTime: /* 时间排序规则 */
            state.condition.sortTime = action.payload.value;
            return {...state};
        case TransactionChangeID: /* 修改交易编号 */
            state.condition.transactionCodeId = action.payload.value;
            return {...state};
        case JumpPageGetServer: /* 页面跳转 */
            state.tableData = action.payload.tableData;
            state.condition.pageIndex = action.payload.pageIndex;
            return {...state};
        default:
            return state;
    }
}

function TransactionHistory(props) {

    const [store, dispatch] = useReducer(reducer, {}, (_) => {
        return {
            condition:{
                cmdId: "",
                requirementCodeId:'',
                transactionType: props.ttValue,
                pageIndex: 1,
                count: 10,
                transactionCodeId:'',
                transactionState: props.tsValue,
                isOnlyMe: false,
                partyACode:'',
                partyBCode:'',
                sortTime: 1, /* 降序 v:1 升序 v:0 */
            },
            tableData:{
                pageCount: 1,
                data:[],
                total: 0
            }
        }
    });

    useEffect(() => {
        jumpGetDataFromServer(Operations.FIRST);
    },[]);

    let SelectChangeEvent = useCallback((actionType) => {
        return v => { dispatch({type : actionType, payload:{value: v} });}
    }, []);

    const SubmitEvent = useCallback( e => {
       e.preventDefault();
       if (Number.isNaN(store.codeId)){

       }

        jumpGetDataFromServer(Operations.FIRST);
    }, [store]);

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
        transactionGetHistoryRequest(condition, data => {
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

    let CheckContractEvent = React.useCallback((element) => {
        return (e) => {
            if (element.type === 3) {
                NotifyOpenElectricContract(true, element, 1,true);
            }else{
                NotifyOpenCreditContract(element, true);
            }
        }
    })
    return (
        <div className={stl.TransactionHistoryContainer}>
            <div className={'searchCondition'}>
                <form action="">
                    <div className={'formLineMix'}>
                        <span className={'item'}>指令编号：</span>
                        <input type="number"
                               onChange={e => { dispatch({type: TransactionChangeCmdID, payload:{value:  e.target.value === ""?-1: e.target.value}}) }}
                               className="myInput"
                               placeholder="默认查询所有"
                        />
                        <span className={'itemAfter'}>需求编号：</span>
                        <input type="text"
                               onChange={e => { dispatch({type: TransactionRequirementID, payload:{value: e.target.value}}) }}
                               className="myInput"
                               placeholder="默认查询所有"
                        />
                        <span className={'itemAfter'}>交易编号：</span>
                        <input type="text"
                               onChange={e => { dispatch({type: TransactionChangeID, payload:{value: e.target.value}}) }}
                               className="myInput"
                               placeholder="默认查询所有"
                        />
                        <span className={'itemAfter'}>交易类型：</span>
                        <Select sendData={SelectChangeEvent(TransactionChangeTransactionType)} options={props.transactionTypes}  />
                    </div>
                    <div className={'formLineMix'}>
                        <span className={'item'}>交易状态：</span>
                        <Select sendData={SelectChangeEvent(TransactionChangeTransactionState)} options={props.transactionStates}  />
                        <span className={'itemAfter'}>甲方编号：</span>
                        <input type="text"
                               onChange={e => { dispatch({type: ChangePartyACode, payload:{value: e.target.value}}) }}
                               className="myInput"
                               placeholder="请输入楼宇编号"
                        />
                        <span className={'itemAfter'}>乙方编号：</span>
                        <input type="text"
                               onChange={e => { dispatch({type: ChangePartyBCode, payload:{value: e.target.value}}) }}
                               className="myInput"
                               placeholder="请输入楼宇编号"
                        />
                    </div>
                    <div className={'formLineMix'}>
                        <span className={'item'}>每页数量：</span>
                        <input type="number"
                               onChange={ e => {
                                   if (e.target.value < 1 || e.target.value > 200){
                                       NotifyMessage("每页数量必须大于等于1且小于200");
                                       return;
                                   }
                                   dispatch({type: TransactionChangeCountNumber, payload:{ value: e.target.value}})
                               }}
                               className="myInput"
                               value={store.condition.count}
                               min={1}  max={200}  placeholder="默认十条"
                        />
                        <label htmlFor='myCheck'  className={'padding-left-15px'} >
                            <input id='myCheck' type='checkbox' onChange={e => { dispatch({type: ChangeIsOnlyMeState, payload:{value: e.target.checked}}) }} />
                            <span className={stl.icon}> 只看我的发布</span>
                        </label>
                        <SortIcon
                            meaning={['时间降序', '时间升序']}
                            getSort={SelectChangeEvent(TransactionChangeSortTime)}
                        />
                        <button className={'FUIButton FUI-btnWhite margin-left-15px'}  onClick={SubmitEvent} >
                            <span className={'glyphicon glyphicon-search'}>立即检索</span>
                        </button>
                    </div>
                </form>
            </div>
            <div className={'normalTableContainer'}>
                <table className={`table tableHover`}>
                    <thead>
                        <tr className="font-weight-600">
                            <td className={stl.iconTD}><img src={no_oo} alt="序号"/>序号</td>
                            <td>交易编号</td>
                            <td>指令编号</td>
                            <td>需求编号</td>
                            <td>合同类型</td>
                            <td className={stl.iconTD}>
                                <img src={shanDian} alt="负荷量"/>
                                负荷量
                            </td>
                            <td className={stl.iconTD}>
                                <img src={credit} alt="负荷量"/>
                                积分
                            </td>
                            <td>甲方编号</td>
                            <td>乙方编号</td>
                            <td>甲方签署时间</td>
                            <td>乙方签署时间</td>
                            <td>状态</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            store.tableData.data.map( (element,idx) => {
                                return (
                                    <tr key={element.transactionId}>

                                        <td>
                                            {(store.condition.pageIndex - 1) * store.condition.count + idx + 1}
                                        </td>
                                        <td>
                                            <span className={`codeIdContainer btn`} data-clipboard-text={element.codeId} title={'点击复制交易编号'} >{element.codeId}</span>
                                        </td>
                                        <td> {element.cmdId} </td>
                                        <td>
                                            <span className={`${stl.blueStyle} codeIdContainer btn`} data-clipboard-text={element.requirementCodeId} title={'点击复制需求编号'} >{element.requirementCodeId}</span>
                                        </td>
                                        <td className={stl.createTransactionType} >
                                            <img src={element.type === 3?electric: credit} alt=""/> <span> {element.type === 3?"电力合同":"积分合同" } </span>
                                        </td>
                                        <td>
                                            {element.electricityValue} {element.electricityUnit}
                                        </td>
                                        <td> {element.point} </td>
                                        <td className={stl.iconTD}><img src={floor} alt="楼宇"/>  {element.partyACode} </td>
                                        <td className={stl.iconTD}><img src={floor} alt="楼宇"/>  {element.partyBCode} </td>
                                        <td className={stl.showTime}>
                                            <span>{element.partyASubscribe === '' || element.partyASubscribe == null ?"未签署":element.partyASubscribe}</span>
                                        </td>
                                        <td className={stl.showTime}>
                                            <span>{element.partyBSubscribe === '' || element.partyBSubscribe == null ?"未签署":element.partyBSubscribe}</span>
                                        </td>
                                        <td>
                                            {element.state === 1? "未确认":""}
                                            {element.state === 2? "已取消":""}
                                            {element.state === 3? "已拒绝":""}
                                            {element.state === 4?"上链失败":''}
                                            {element.state === 5?"签署完成":''}
                                        </td>
                                        <td>
                                            <button className={'normalLinkDetailOperation'} onClick={CheckContractEvent(element)} >查看详情</button>
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
                        <button className={'FUIButton FUI-btnWhite'} onClick={JumpPage(Operations.FIRST)}>
                            首页
                        </button>
                        <button  className={`FUIButton ${prevIsDisabled?"FUI-btnDisable":"FUI-btnWhite"}`}  disabled={prevIsDisabled}  onClick={JumpPage(Operations.PREV)}>
                            <span className="glyphicon glyphicon-chevron-left"/> 上一页
                        </button>
                        <button   className={`FUIButton ${nextIsDisabled?"FUI-btnDisable":"FUI-btnWhite"}`} disabled={nextIsDisabled}  onClick={JumpPage(Operations.NEXT)}>
                            下一页 <span className="glyphicon glyphicon-chevron-right"/>
                        </button>
                        <button  className={'FUIButton FUI-btnWhite'} onClick={JumpPage(Operations.LAST)}>
                            尾页
                        </button>
                        <select className={'MySelect'}  ref={SelectJumpElement}>
                            {options.map((v,i)=>{
                                return <option value={i + 1} key={v} >第{v + 1}页</option>
                            })}
                        </select>
                        <button  className={'FUIButton FUI-btnWhite'} onClick={JumpPage(Operations.JUMP)}>跳转</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state){
    return {
        transactionTypes: state.transactions.TransactionTypes,
        ttValue:state.transactions.transactionTypesDefaultValue,
        transactionStates:state.transactions.transactionStates,
        tsValue: state.transactions.transactionStateSDefaultValue
    }
}

function mapDispatchToProps(dispatch){
    return {}
}

export default connect(mapStateToProps,  mapDispatchToProps)(TransactionHistory);


