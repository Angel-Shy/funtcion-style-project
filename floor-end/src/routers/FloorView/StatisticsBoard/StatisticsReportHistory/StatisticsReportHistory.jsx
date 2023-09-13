import React, {useCallback, useReducer, useEffect, useRef} from 'react';
import stl from './StatisticsReportHistory.module.scss';
import {reportsGetHistoryRequest } from "../../../../axios/dashBoardRequests";
import {Operations} from "../../../../toolkits";
import no_oo from "../../../../static/icon/iconfonts/bianhao.svg";
import shandian from '../../../../static/imgs/old/shandian.png';

const JumpPageGetServer = 'JumpPageGetServer';

function reducer(state, action){
    switch (action.type) {
        case JumpPageGetServer: /* 页面跳转 */
            state.tableData = action.payload.tableData;
            state.condition.pageIndex = action.payload.pageIndex;
            return {...state};
        default:
            return state;
    }
}

function StatisticsReportHistory(props) {

    const [store, dispatch] = useReducer(reducer, {}, (_) => {
        return {
            condition:{
                pageIndex: 1,
                count: 7
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
        reportsGetHistoryRequest(condition, data => {
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
        <div className={`${stl.statisticsReportHistory} flex-layout`}>
            <div className={` flex-item-5 boxStyle ${stl.reportTableContainer} `}>
                <div className={stl.normalTableContainer}>
                    <table className={`${stl.table} ${stl.tableHover}`}>
                        <thead>
                            <tr className="font-weight-600" >
                                <td>
                                    <input type="checkbox"/>
                                </td>
                                <td className={stl.iconTD}><img src={no_oo} alt="序号"/>序号</td>
                                <td>指令编号</td>
                                <td>指令类型</td>
                                <td>意愿值</td>
                                <td>上报时间</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            store.tableData.data.map( (element,idx) => {
                                return (
                                    <tr key={element.reportId}>
                                        <td>
                                            <input type="checkbox"/>
                                        </td>
                                        <td>
                                            {(store.condition.pageIndex - 1) * store.condition.count + idx + 1}
                                        </td>
                                        <td>
                                            {element.cmdId}
                                        </td>
                                        <td>
                                            {element.type}
                                        </td>
                                        <td className={stl.iconTD}>
                                            <img src={shandian} alt="负荷量"/>
                                            {element.electricValue} {element.electricUnit}
                                        </td>
                                        <td className={stl.showTime}>
                                            <span>{element.reportDataTime}</span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div  >
                <div className={`${stl.division}`}>
                    <div className="float-layout">
                        <label className="float-left font-weight-600 ">
                            <span className={stl.itemKicker}>第{store.condition.pageIndex === 0?1:store.condition.pageIndex}页 - 总数:{store.tableData.total} 条 </span>
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
                            <select className={stl.MySelect}  ref={SelectJumpElement}>
                                {options.map((v,i)=>{
                                    return <option value={i + 1} key={v} >第{v + 1}页</option>
                                })}
                            </select>
                            <button  className={'FUIButton FUI-btnBlue'} onClick={JumpPage(Operations.JUMP)}>跳转</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatisticsReportHistory;