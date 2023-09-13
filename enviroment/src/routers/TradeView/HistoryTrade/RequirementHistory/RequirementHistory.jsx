import React, {useReducer,useCallback, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import stl from './RequirementHistory.module.scss';
import Select from "../../../../components/public/from/Select/Select";
import SortIcon from "../../TradeContent/SearchCondition/SortIcon/SortIcon";
import cant from '../../../../static/icon/alibaba/youcant.svg';
import can from '../../../../static/icon/alibaba/youcanok.svg';
import electric from '../../../../static/icon/alibaba/electic.svg';
import credit from '../../../../static/icon/iconfonts/jife.svg';
import floor from '../../../../static/svgs/floor.svg'

import {Operations} from "../../../../toolkits";

/*
* author: jxKicker 蒋星
* 组件问题: 在改变搜索条件后，总页面数量会发生变化，而当前页面事件绑定的是跳转到上一个搜索条件下总页数。
* 解决方法：可以解决，但是对于reducer不太方便！现在已经解决了
* ---- 2022/7/17 15:24
* */

import {requirementGetHistoryRequest} from "../../../../axios/requirementRequests";
import {NotifyMessage} from "../../../../pubsub";
import no_oo from "../../../../static/icon/iconfonts/bianhao.svg";

const ChangeRequirementType = 'Change_Requirement_Type';
const ChangeTransactionType = 'Change_Transaction_Type';
const ChangeRequirementID = 'Change_Requirement_ID';
const ChangeDirectionID = 'Change_Direction_ID';
const ChangeTimeSortType = 'Change_Time_Sort_Type';
const ChangeCountNumber = 'Change_Count_Number';
const SetCheckPublish = 'Set_Check_Publish';
const JumpPageGetServer = 'Jump_Page_Get_Server';

function reducer(state, action) {
    switch (action.type) {
        case ChangeRequirementType:
            state.condition.requirementType = action.payload.value;
            return {...state};
        case ChangeTransactionType:
            state.condition.transactionType = action.payload.value;
            return {...state};
        case ChangeRequirementID:
            state.condition.requirementId = action.payload.value;
            return {...state};
        case ChangeDirectionID:
            state.condition.directionId = action.payload.value;
            return {...state};
        case ChangeTimeSortType:
            state.condition.sortTime = action.payload.value;
            return {...state};
        case SetCheckPublish:
            state.condition.isOnlyMe = action.payload.value;
            return {...state};
        case ChangeCountNumber:
            state.condition.count = action.payload.value;
            return {...state};
        case JumpPageGetServer:
            state.tableData = action.payload.tableData;
            state.condition.pageIndex = action.payload.pageIndex;
            return {...state};
        default:
            return state;
    }
}



function RequirementHistory(props) {

    const [store, dispatch] = useReducer(reducer, {}, state => ({
        condition:{
            requirementId: -1,
            directionId:-1,
            isOnlyMe: false,
            requirementType: props.rtValue,
            transactionType: props.ttValue,
            sortTime: 1, /* 降序 v:1 升序 v:0 */
            pageIndex: 1,
            count: 10
        },
        tableData:{
            pageCount: 1,
            data:[],
            total: 0
        }
    }));

    /* Select */
    let ChangeRequirementDispatch = React.useCallback((v) => {
        SearchChangeGetDataFromServer(ChangeRequirementType, 'requirementType', v);
    }, []);

    /* Select */
    let ChangeTransactionDispatch = React.useCallback( v => {
        SearchChangeGetDataFromServer(ChangeTransactionType, 'transactionType', v);
    }, []);

    let SubmitEvent = React.useCallback( e => {
        e.preventDefault();
        jumpGetDataFromServer(Operations.FIRST);
    }, [store]);

    useEffect(() => {
        //初次加载
        jumpGetDataFromServer(Operations.FIRST);
    }, []);

    /* Search 条件改变，所有向服务器发送请求 */
    let SearchChangeGetDataFromServer = useCallback((actionType, attr, val) => {
        let action = {
            type: actionType,
            payload:{
                value: val
            }
        }
        dispatch(action);
    },[store]);

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
        requirementGetHistoryRequest(condition, data => {
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
    /* 设置 select标签 option内容*/
    let options = [];
    for(let i = 0; i < store.tableData.pageCount; i++){
        options.push(i);
    }
    /* 页面跳转 功能转到 jumpGetDataFromServer */
    let JumpPage = useCallback( op => {
        return e => {
            jumpGetDataFromServer(op);
        }
    }, []);
    let prev = store.condition.pageIndex - 1;
    let next = store.condition.pageIndex + 1;
    let prevIsDisabled = prev <= 0;
    let nextIsDisabled = next > store.tableData.pageCount;
    /* 实现分页功能 */
    const SelectJumpElement = useRef();
    /* endRegion 实现分页功能 */
    /* 页面渲染 */
    return (
        <div className={stl.RequirementHistoryContainer}>
            <div className={'searchCondition'}>
                <form action="" onSubmit={SubmitEvent}>
                    <div className={'formLineMix'}>
                        <span className={'item'}>需求编号：</span>
                        <input type="text"
                               onChange={ e => {
                                   SearchChangeGetDataFromServer(ChangeRequirementID, 'requirementId' , e.target.value);
                               }}
                               className="myInput"
                               placeholder="默认查询所有需求"
                        />
                        <span className={'itemAfter'}>指令编号：</span>
                        <input type="number"
                               onChange={ e => dispatch({type: ChangeDirectionID , payload:{value:  e.target.value === ""?-1: e.target.value }}) }
                               className="myInput"
                               placeholder="默认查询所有需求"
                        />
                        <span className={'itemAfter'}>生成交易类型:</span>
                        <Select sendData={ChangeTransactionDispatch} options={props.transactionTypes}  />
                        <span className={'itemAfter'}>每页数量：</span>
                        <input type="number"
                               onChange={ e => {
                                   if (e.target.value < 5 || e.target.value > 200){
                                       NotifyMessage("每页数量必须大于等于5 小于 200");
                                       return;
                                   }
                                   SearchChangeGetDataFromServer(ChangeCountNumber,'count', e.target.value);
                               }}
                               className="myInput"
                               value={store.condition.count}
                               min={5}
                               max={200}
                               placeholder="默认十条"
                        />
                    </div>
                    <div className={'formLineMix'}>
                        <span className={'item'}>需求类型：</span>
                        <Select sendData={ChangeRequirementDispatch} options={props.requirementTypes}  />
                        <label htmlFor='myCheck' className={'padding-left-20px'} >
                            <input id='myCheck' type='checkbox' onChange={e => {SearchChangeGetDataFromServer(SetCheckPublish, 'isOnlyMe', e.target.checked);}}/>
                            <span className={stl.icon}> 只看我的发布</span>
                        </label>
                        <SortIcon
                            meaning={['时间降序', '时间升序']}
                            getSort={v => {
                                SearchChangeGetDataFromServer(ChangeTimeSortType, 'sortTime', v);
                            }}
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
                            <td>需求编号</td>
                            <td>需求类型</td>
                            <td>产生合同类型</td>
                            <td>指令编号</td>
                            <td>楼宇ID</td>
                            <td>楼宇编号</td>
                            <td>负荷量</td>
                            <td>负荷单位</td>
                            <td>积分量</td>
                            <td>剩余负荷</td>
                            <td>剩余积分</td>
                            <td>发起时间</td>
                            <td>截止时间</td>
                            <td>状态</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        store.tableData.data.map( (requirement,idx) => {
                            return (<tr key={requirement.requirementId}>
                                <td>
                                    <span >{(store.condition.pageIndex - 1) * store.condition.count + idx + 1}</span>
                                </td>
                                <td>
                                    <span className={`${stl.blueStyle} codeIdContainer btn`} data-clipboard-text={requirement.codeId} title={'点击复制需求编号'} >{requirement.codeId}</span>
                                </td>
                                <td className={stl.transactionType}>
                                    <img src={requirement.requirementType === 1?can: cant} alt=""/> <span> {requirement.requirementType === 1?"价格可协商":"价格不可协商" } </span>
                                </td>
                                <td className={stl.createTransactionType} >
                                    <img src={requirement.transactionType === 3?electric: credit} alt=""/> <span> {requirement.transactionType === 3?"电力合同":"积分合同" } </span>
                                </td>
                                <td>
                                    {requirement.cmdId}
                                </td>
                                <td>{requirement.partyA}</td>
                                <td className={stl.iconTD}><img src={floor} alt=""/>
                                    <span className={'font-blue '}>
                                        {requirement.partyACode}
                                    </span>
                                </td>
                                <td>{requirement.electricValue}</td>
                                <td>{requirement.electricUnit}</td>
                                <td>{requirement.point}</td>
                                <td>{requirement.leftElectricValue}</td>
                                <td>{requirement.leftPoint}</td>
                                <td className={stl.showTime}>
                                    <span>{requirement.publishDateTime}</span>
                                </td>
                                <td className={stl.showTime}>
                                    <span>{requirement.endDateTime}</span>
                                </td>
                                <td>
                                    {requirement.state === 1?"未撤销":"已撤销"}
                                </td>
                                <td>
                                    <span className={'font-blue'}>历史消息无法操作  </span>
                                </td>
                            </tr>)
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
        requirementTypes: state.requirements.RequirementTypes,
        rtValue:state.requirements.requirementTypesDefaultValue,
    }
}

function mapDispatchToProps(dispatch){
    return {}
}

export default connect(mapStateToProps,  mapDispatchToProps)(RequirementHistory);
