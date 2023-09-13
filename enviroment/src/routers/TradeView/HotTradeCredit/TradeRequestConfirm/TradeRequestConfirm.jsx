import React,{useReducer,useCallback,useRef}  from 'react';
import stl from './TradeRequestConfirm.module.scss';
import DialogContainer, {getDialogDefaultSetting} from "../../../../components/public/dialog/DialogContainer/DialogContainer";
import Select from "../../../../components/public/from/Select/Select";
import SortIcon from "../../TradeContent/SearchCondition/SortIcon/SortIcon";
import {NotifyMessage, NotifyOpenCreditContract } from "../../../../pubsub";
import {getYoursRequirementRequest} from "../../../../axios/requirementRequests";
import {Operations} from "../../../../toolkits";
import {getCreditTransactionRequest} from "../../../../axios/transactionRequests";
import shanDian from "../../../../static/icon/iconfonts/lightning3.svg";
import credit from "../../../../static/icon/iconfonts/jife.svg";
import electric from "../../../../static/icon/alibaba/electic.svg";
import floor from "../../../../static/svgs/floor.svg";
import no_oo from "../../../../static/icon/iconfonts/bianhao.svg";
import RefuseCreditTransactionDetail from "./RefuseCreditTransactionDetail/RefuseCreditTransactionDetail";
import PubSub from "pubsub-js";
import {CheckCreditTransactionSuccess} from "../../../../pubsub/constants";

const ChangeRequirementId = 'ChangeRequirementId';
const CloseNotice = 'CloseNotice';
const ShowNotice = 'ShowNotice';
const StoreRequirementSelects = 'StoreRequirementSelects';
const ChangeCountNumber = 'Change_Count_Number';
const ChangeSortTime = '_Change_Sort_Time_';
const JumpPageGetServer = 'JumpPageGetServer';

const DialogLoadingSetting = getDialogDefaultSetting();
DialogLoadingSetting.isNeedFooter = false;
DialogLoadingSetting.width = 1000;
DialogLoadingSetting.height = 320;
DialogLoadingSetting.top = 80;
DialogLoadingSetting.title = "拒绝交易提示";
DialogLoadingSetting.isLoading = false;

function reducer(state, action){
    switch (action.type){
        case ChangeRequirementId:
            state.condition.requirementId = parseInt(action.payload.value);
            return {...state};
        case CloseNotice:
            state.noticeIsShow = false;
            state.refuseTransactionId = -1;
            return {...state};
        case ShowNotice:
            state.noticeIsShow = true;
            state.refuseTransactionId = action.payload.value;
            return  {...state};
        case ChangeCountNumber:
            state.condition.count = parseInt(action.payload.value);
            return  {...state};
        case ChangeSortTime: /* 时间排序规则 */
            state.condition.sortTime = action.payload.value;
            return {...state};
        case StoreRequirementSelects:
            state.requirementSelects = action.payload.options;
            return  {...state};
        case JumpPageGetServer: /* 页面跳转 */
            state.tableData = action.payload.tableData;
            state.condition.pageIndex = action.payload.pageIndex;
            return {...state};
        default:
            return state;
    }
}


function TradeRequestConfirm(props) {

    const [store, dispatch] = useReducer(reducer, {}, state => ({
        condition:{
            count: 10,
            pageIndex: 1,
            requirementId: -1,/* 需求ID */
            sortTime: 1,/* 降序 v:1 升序 v:0 */
        },
        tableData:{
            pageCount: 1,
            data:[],
            total: 0
        },
        refuseTransactionId: -1,
        noticeIsShow:false,
        requirementSelects:[
            {name:'我发布的全部电力交易需求...', value: -1}
        ]
    }));

    //select 修改需求
    let SelectChangeEvent = useCallback((actionType) => {
        return v => { dispatch({type : actionType, payload:{value: v} });}
    }, []);

    /* 2022/7/23 检索select */
    React.useEffect( () => {
        getYoursRequirementRequest({type: 2},(data) => {
            let options = data.data.map( (ele, idx) => {
                return {
                    name:ele.codeId,
                    value: ele.requirementId
                }
            });
            options.unshift( {name:'我发布的全部积分交易需求', value: -1});
            let action = {type: StoreRequirementSelects, payload:{ options } };
            dispatch(action);
            jumpGetDataFromServer(Operations.FIRST);
        });

        const token = PubSub.subscribe(CheckCreditTransactionSuccess,  (msg, data) => {
            jumpGetDataFromServer(Operations.FIRST);

        });

        return () =>{
            PubSub.unsubscribe(token);
        }
    }, []);

    /* region --  实现分页功能 为了防止陷入状态机死循环，先获取数据再更新 store*/
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
        getCreditTransactionRequest(condition, data => {
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
    /* endRegion -- 实现分页功能 */

    //立即检索事件
    const SubmitEvent = React.useCallback( e => {
        jumpGetDataFromServer(Operations.FIRST);
    }, [store]);

    //打开拒绝交易
    let ShowNoticeActionEvent = React.useCallback((transactionId) => {
        return e =>{
            dispatch({type: ShowNotice,  payload:{value: transactionId}});
        }
    }, []);

    //关闭拒绝交易
    let CloseNoticeAction = React.useCallback(() => {
        dispatch({type: CloseNotice});
    }, []);

    //打开积分合同
    const CheckTradeContract = (contract) => {
        return e => {
            NotifyOpenCreditContract(contract, false);
        }
    }

    return (
        <div className={ `${stl.TableContainer}` }>
            <div className={stl.searchCondition}>
                <div className={stl.formLineMix}>
                    <span className={stl.item}>发布的需求：</span>
                    <Select sendData={SelectChangeEvent(ChangeRequirementId)} options={store.requirementSelects} />
                    <span className={stl.itemAfter}>每页数量：</span>
                    <input type="number"
                           onChange={ e => {
                               let count = parseInt(e.target.value);
                               if (Number.isNaN(count)){
                                   NotifyMessage("你应该输入数字！");
                                   e.target.value = 10;
                                   return;
                               }
                               if (e.target.value < 1 || e.target.value > 200){
                                   NotifyMessage("每页数量必须大于等于1 小于 200");
                                   return;
                               }
                               dispatch({type: ChangeCountNumber, payload:{ value: e.target.value}})
                           }}
                           className={stl.myInput}
                           value={store.condition.count}
                           min={1}  max={200}  placeholder="默认十条"
                    />
                    <SortIcon meaning={['时间降序', '时间升序']} getSort={SelectChangeEvent(ChangeSortTime)} />
                    <button className={'FUIButton FUI-btnBlue margin-left-15px'} onClick={SubmitEvent} >
                        <span className={'glyphicon glyphicon-search'}>立即检索</span>
                    </button>
                </div>
            </div>
            <div className={'normalTableContainer'}>
                <table className={`table tableHover`}>
                    <thead>
                    <tr className="font-weight-600">
                        <td>
                            <input type="checkbox"/>
                        </td>
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
                        <td>积分支付者[甲方]</td>
                        <td>电力承担着[乙方]</td>
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
                                        <input type="checkbox"/>
                                    </td>
                                    <td>
                                        {(store.condition.pageIndex - 1) * store.condition.count + idx + 1}
                                    </td>
                                    <td>
                                        <span className={`codeIdContainer btn`} data-clipboard-text={element.codeId} title={'点击复制交易编号'} >{element.codeId}</span>
                                    </td>
                                    <td> {element.cmdId} </td>
                                    <td>
                                        <span className={`${stl.blueStyle} codeIdContainer btn`} data-clipboard-text={element.requirementId} title={'点击复制需求编号'} >{element.requirementId}</span>
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
                                        <span>{element.partyASubscribe===null||element.partyASubscribe===''?"暂未签署":element.partyASubscribe}</span>
                                    </td>
                                    <td className={stl.showTime}>
                                        <span>{element.partyBSubscribe}</span>
                                    </td>
                                    <td>
                                        {element.state === 1? "未确认":""}
                                        {element.state === 2? "已取消":""}
                                        {element.state === 3? "已拒绝":""}
                                        {element.state === 4?"上链失败,可重新签署":''}
                                        {element.state === 5?"签署完成":''}
                                    </td>
                                    <td>
                                        {
                                            element.state === 1 || element.state === 4? <button className={stl.linkDetailOperation} onClick={CheckTradeContract(element)} >审核交易</button>: ""
                                        }
                                        {
                                            element.state === 1 || element.state === 4? <button className={stl.linkDetailOperation} onClick={ShowNoticeActionEvent(element.transactionId)} >拒绝交易</button>:""
                                        }
                                        {
                                            element.state !==1 && element.state !== 4?"无法操作":""
                                        }
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
            {
                store.noticeIsShow?
                    <DialogContainer
                        close={CloseNoticeAction}
                        render={<RefuseCreditTransactionDetail updateTable={ () => { jumpGetDataFromServer(Operations.FIRST);  } }  transactionId={store.refuseTransactionId} close = {CloseNoticeAction} />}
                        {...DialogLoadingSetting}
                    />:''
            }
        </div>
    );
}

export default TradeRequestConfirm;
