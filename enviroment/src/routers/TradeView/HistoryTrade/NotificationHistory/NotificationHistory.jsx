import React, {useReducer, useCallback, useEffect, useRef} from 'react';
import stl from './NotificationHistory.module.scss';
import {connect} from "react-redux";
import Select from "../../../../components/public/from/Select/Select";
import SortIcon from "../../TradeContent/SearchCondition/SortIcon/SortIcon";
import {Operations} from "../../../../toolkits";
import no_oo from '../../../../static/icon/iconfonts/bianhao.svg';
import time_ from '../../../../static/icon/alibaba/time.svg';
import floor from '../../../../static/svgs/floor.svg';
import {notificationsGetHistoryRequest} from "../../../../axios/notificationRequests";
import {NotifyMessage} from "../../../../pubsub";


const ChangeCountNumber = 'ChangeCountNumber'
const ChangeNotificationType = 'ChangeNotificationType';
const ChangeSortTime = 'ChangeSortTime';
const JumpPageGetServer = 'JumpPageGetServer';

function reducer(state, action){
    switch (action.type) {
        case ChangeNotificationType:
            state.condition.notificationType = action.payload.value;
            return {...state};
        case ChangeSortTime:
            state.condition.sortTime = action.payload.value;
            return {...state};
        case ChangeCountNumber:
            state.condition.count = action.payload.value;
            return {...state};
        case JumpPageGetServer: /* 页面跳转 */
            state.tableData = action.payload.tableData;
            state.condition.pageIndex = action.payload.pageIndex;
            return {...state};
        default:
            return state;
    }
}

function NotificationHistory(props) {

    let [store, dispatch] = useReducer(reducer, {}, state => {
        return {
            condition:{
                notificationType: props.ntValue,
                pageIndex: 1,
                count: 10,
                sortTime: 1, /* 降序 v:1 升序 v:0 */
            },
            tableData:{
                pageCount: 1,
                data:[],
                total: 0
            }
        }
    });

    let SelectChangeEvent = useCallback((actionType) => {
        return v => { dispatch({type : actionType, payload:{value: v} });}
    }, []);

    const SubmitEvent = useCallback( e => {
        e.preventDefault();
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
        notificationsGetHistoryRequest(condition, data => {
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
    useEffect(() => {
        try {
            jumpGetDataFromServer(Operations.FIRST);
        }catch (e){
            console.log(e);
        }
    }, [])
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
        <div className={stl.NotificationHistoryContainer}>
            <div className={'searchCondition'}>
                <form action="">
                    <div className={'formLineMix'}>
                        <span className={'item'}>通知类型：</span>
                        <Select sendData={SelectChangeEvent(ChangeNotificationType)} options={props.notificationTypes}  />
                        <span className={'itemAfter'}>每页条数：</span>
                        <input type="number"
                               onChange={ e => {
                                   if (e.target.value < 5 || e.target.value > 200){
                                       NotifyMessage("每页数量必须大于等于5 小于 200");
                                       return;
                                   }
                                   dispatch({type: ChangeCountNumber, payload:{ value: e.target.value}})
                               }}
                               className="myInput"
                               value={store.condition.count}
                               min={5}  max={200}  placeholder="默认十条"
                        />
                        <SortIcon
                            meaning={['时间降序', '时间升序']}
                            getSort={SelectChangeEvent(ChangeSortTime)}
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
                            <td>发送方编号</td>
                            <td>接受者编号</td>
                            <td>通知类型</td>
                            <td>消息内容</td>
                            <td className={stl.iconTD}>
                                <img src={time_} alt="发布时间"/>
                                发布时间
                            </td>
                            <td>状态</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        store.tableData.data.map( (element, idx) => {
                            return (<tr key={element.notificationId}>
                                <td>
                                    {(store.condition.pageIndex - 1) * store.condition.count + idx + 1}
                                </td>
                                <td className={stl.iconTD}>
                                    <img src={floor} alt=""/>
                                    <span className={'font-blue'}>
                                        {element.senderCode}
                                    </span>
                                </td>
                                <td className={stl.iconTD}>
                                    <img src={floor} alt=""/>
                                    <span className={'font-blue'}>{element.recipientCode}</span>
                                </td>
                                <td>{element.notificationTypeName}</td>
                                <td>{element.message}</td>
                                <td className={stl.showTime}>
                                    <span>{element.publishDateTime}</span>
                                </td>
                                <td>{
                                    element.state == 1?"已查看":"未查看"
                                }</td>
                                <td><span className={'font-blue'}>历史消息无法操作  </span></td>
                            </tr>)
                        } )
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
        notificationTypes: state.notifications.notificationTypes,
        ntValue:state.notifications.notificationTypeDefaultValue,
    }
}

function mapDispatchToProps(dispatch){
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationHistory);
