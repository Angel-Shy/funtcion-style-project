import React, {useReducer, useCallback, useEffect, Fragment, useRef} from 'react';
import stl from './TradeContent.module.scss';
import Select from "../../../components/public/from/Select/Select";
import SortIcon from "./SearchCondition/SortIcon/SortIcon";
import {connect} from "react-redux";
import {NotifyMessage} from "../../../pubsub";
import TransactionBody from './TransactionBody/TransactionBody';
import {getMarketRequest} from "../../../axios/tradeRequests";
import {Operations} from "../../../toolkits";
import PubSub from "pubsub-js";
import {NewRequirementPublished, SubmitMessage} from "../../../pubsub/constants";

const ChangePriceSort = 'ChangePriceSort';
const ChangePointSort = 'ChangePointSort';
const ChangeElectricSort = 'ChangeElectricSort';
const ChangeCountNumber = 'ChangeCountNumber';
const ChangeTransactionType = 'ChangeTransactionType';
const ChangeDirectionID = 'ChangeDirectionID';
const ChangeTimeSort = 'ChangeTimeSort';
const ChangeRequirementType = 'ChangeRequirementType';
const ChangeIsOnlyMeState = 'ChangeIsOnlyMeState';
const JumpPageGetServer = 'JumpPageGetServer';
const ChangeRequirementCodeId = 'ChangeRequirementCodeId';

function reducer(state, action) {
    switch (action.type) {
        case ChangeTransactionType:
            state.condition.transactionType = action.payload.value;
            return {...state};
        case ChangeCountNumber:
            state.condition.count = action.payload.value;
            return {...state};
        case ChangeDirectionID:
            state.condition.directionId = action.payload.value;
            return {...state};
        case ChangeRequirementType:
            state.condition.requirementType = action.payload.value;
            return {...state};
        case ChangeTimeSort:
            state.condition.timeSort = action.payload.value;
            return {...state};
        case ChangePriceSort:
            state.condition.priceSort = action.payload.value;
            return {...state};
        case ChangePointSort:
            state.condition.pointSort = action.payload.value;
            return {...state};
        case ChangeRequirementCodeId:
            state.condition.requirementCodeId = action.payload.value;
            return {...state};
        case ChangeElectricSort:
            state.condition.electricSort = action.payload.value;
            return {...state};
        case ChangeIsOnlyMeState: /* 是否只查看自己的交易 */
            state.condition.isOnlyMe = action.payload.value;
            return {...state};
        case JumpPageGetServer: /* 页面跳转 */
            state.tableData = action.payload.tableData;
            state.condition.pageIndex = action.payload.pageIndex;
            return {...state};
        default:
            return state;
    }
}

function TradeContent(props) {

    let [store, dispatch] = useReducer(reducer, {}, state => {
        return {
            condition:{
                transactionType:props.ttValue,
                directionId: -1,
                requirementType: -1, /**/
                timeSort: 1,  /*降序为1 升序为 0*/
                priceSort:1,  /*降序为1 升序为 0*/
                pointSort:1, /*降序为1 升序为 0*/
                electricSort:1,/*降序为1 升序为 0*/
                isOnlyMe: false,
                requirementCodeId:'',
                pageIndex:1,
                count: 5,
            },
            tableData:{
                pageCount: 1,
                data:[],
                total: 0
            }
        }
    });

    let SubmitEvent = React.useCallback( e => {
        e.preventDefault();
        jumpGetDataFromServer(Operations.FIRST);
    }, [store]);

    useEffect(() => {
        jumpGetDataFromServer(Operations.FIRST);

        //监听是否有新的需求发布，有的话就重新请求一下！
        const token = PubSub.subscribe(NewRequirementPublished,  (msg, data) => {
            /* 获得了提示消息 */
            jumpGetDataFromServer(Operations.FIRST);
        });
        return () => {
            PubSub.unsubscribe(token);
        };

        return () => {

        }
    }, []);

    /* 指令列表 */
    let directionSelect = props.directions.map(d => {
        return {name: d.codeName, value:d.index};
    });
    directionSelect.unshift({name: '所有待执行指令...', value: -1});

    let SelectChangeEvent = useCallback((actionType) => {
        return v => { dispatch({type : actionType, payload:{value: v} });}
    }, []);

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
        getMarketRequest(condition, data => {
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
        <Fragment>
            <div className={`${stl.tradeContainer}`} >
                <div className={'searchCondition'}>
                    <form action="">
                        <div className={'formLineMix'}>
                            <span className={'item'}>交易需求：</span>
                            <Select options={props.transactionTypes} sendData={SelectChangeEvent(ChangeTransactionType)}  />
                            <span className={'itemAfter'}>选择指令：</span>
                            <Select options={directionSelect} sendData={SelectChangeEvent(ChangeDirectionID)}  />
                            <span className={'itemAfter'}>需求类型：</span>
                            <Select options={props.requirementTypes} sendData={SelectChangeEvent(ChangeRequirementType)}  />
                            <span className={'itemAfter'}>每页数量：</span>
                            <input type="number"
                                   onChange={ e => {
                                       let count = parseInt(e.target.value);
                                       if (Number.isNaN(count)){
                                           NotifyMessage("你应该输入数字！");
                                           e.target.value = 5;
                                           e.preventDefault();
                                           return;
                                       }
                                       if (e.target.value < 1 || e.target.value > 200){
                                           NotifyMessage("每页数量必须大于等于5 小于 200");
                                           e.preventDefault();
                                           return;
                                       }
                                       dispatch({type: ChangeCountNumber, payload:{ value: e.target.value}})
                                   }}
                                   className="myInput"
                                   value={store.condition.count}
                                   min={1}  max={200}  placeholder="默认十条"
                            />
                        </div>
                        <div className={'formLineMix'}>
                            <span className={'item'}>需求编号：</span>
                            <input type="text"
                                   className="myInput"
                                   placeholder="请输入具体的有效需求编号"
                                   onChange={ e => { dispatch({type: ChangeRequirementCodeId, payload:{ value: e.target.value}})  } }
                            />
                            <label htmlFor='myCheckPublic' className={'padding-left-15px'} >
                                <input id='myCheckPublic' type='checkbox' onChange={e => { dispatch({type: ChangeIsOnlyMeState, payload:{value: e.target.checked}}) }} ></input>
                                <span className={`${stl.icon}`}> 我的发布</span>
                            </label>
                            <SortIcon meaning={['时间降序', '时间升序']} getSort={SelectChangeEvent(ChangeTimeSort)} />
                            <SortIcon meaning={['电力降序', '电力升序']} getSort={SelectChangeEvent(ChangeElectricSort)} />
                            <SortIcon meaning={['积分降序', '积分升序']} getSort={SelectChangeEvent(ChangePointSort)} />
                            <SortIcon meaning={['[负荷/积分]降序', '[负荷/积分]升序']} getSort={SelectChangeEvent(ChangePriceSort)} />
                            <button className={'FUIButton FUI-btnBlack'} onClick={SubmitEvent}>
                                <span className="glyphicon glyphicon-search"></span>
                                点击查询
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <TransactionBody
                userId={props.user.id}
                requirements={store.tableData.data}
                pageIndex={store.condition.pageIndex}
                count = {store.condition.count}
                update = { () => { jumpGetDataFromServer(Operations.FIRST) } }
            />
            <div className={stl.divisionContainer}>
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
        </Fragment>
    );
}

function mapStateToProps(state){
    return {
        transactionTypes: state.transactions.TransactionTypes,
        ttValue:state.transactions.transactionTypesDefaultValue,
        directions: state.directions.directions,
        requirementTypes: state.requirements.RequirementTypes,
        user: state.directions.user
    }
}

function mapDispatchToProps(dispatch){
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeContent);
