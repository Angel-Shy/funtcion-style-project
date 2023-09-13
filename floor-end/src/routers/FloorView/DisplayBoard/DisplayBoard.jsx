import React, {useCallback, useReducer, useState, useEffect} from 'react';
import stl from './DisplayBoard.module.scss';
import loading from '../../../static/imgs/loadingdialog.gif';
import offline from '../../../static/icon/alibaba/offline.png'
import directionIcon from '../../../static/svgs/directionSetting.svg'
import {getInternetNodeStateRequest} from "../../../axios/dashBoardRequests";
import DialogContainer, {getDialogDefaultSetting} from "../../../components/public/dialog/DialogContainer/DialogContainer";
import ShowDirectionProgressDetail from "./ShowDirectionProgressDetail/ShowDirectionProgressDetail";
import ReportingTheAbilityDetail from "./ReportingTheAbilityDetail/ReportingTheAbilityDetail";

import imgCredit from  '../../../static/pics/credit_jifen.png';
import imgReputation from '../../../static/pics/信誉_fill.png';
import imgWaitingGet from '../../../static/pics/watingget.png';
import imgElectric from '../../../static/pics/合同.png';
import {getInstructionDirectionRequest} from "../../../axios/directionRequests";


/* 查看进度报表对话框 */
let dialogSetting = getDialogDefaultSetting();
dialogSetting.bcIsCancel = true;
dialogSetting.height = 700;
dialogSetting.width = 1200;
dialogSetting.title = '指令执行进度';
dialogSetting.isNeedFooter = false;

/* 上报调控能力对话框 */
let reportingSetting = getDialogDefaultSetting();
reportingSetting.bcIsCancel = false;
reportingSetting.height = 480;
reportingSetting.width = 1200;
reportingSetting.title = '上报调控能力';
reportingSetting.isNeedFooter = false;

const LoadUserInformation = 'LoadUserInformation';
const ShowDirectionProgress = 'ShowDirectionProgress';
const CloseDirectionProgress = 'CloseDirectionProgress';
const OpenReportingDetail = 'OpenReportingDetail';
const CloseReportingDetail  = 'CloseReportingDetail';
const LoadInstructions = 'LoadInstructions';
function reducer(state, action) {
    switch (action.type) {
        case LoadUserInformation:
            state.nodeState = action.payload;
            return {...state};
        case ShowDirectionProgress:
            state.activeDirection = action.payload.instruction;
            state.progressDetailShow = true;
            return  {...state};
        case OpenReportingDetail:
            state.reportingDetailShow = true;
            return  {...state};
        case CloseReportingDetail:
            state.reportingDetailShow = false;
            return  {...state};
        case LoadInstructions:
            state.instructions = action.payload.instructions;
            return  {...state};
        case CloseDirectionProgress:
            state.activeDirection = null;
            state.progressDetailShow = false;
            return  {...state};
        default:
            return state;
    }
}


function DisplayBoard(props) {

    let [store, dispatch] = useReducer(reducer,{}, (_) =>{
       return {
           nodeState:{
               isOnline: false,
               lastReportDateTime: '0000/0/00 00:00:00',//上次上报时间
               address: '正在加载中....', //真实地址
               points:0 ,//拥有的积分
               reputation: 0 ,//信誉分
               waitPoint:0 ,//待获得积分
               contractCount:0 ,//参与合同数量
           },
           progressDetailShow: false,
           reportingDetailShow: false,
           activeDirection: null,
           instructions: []
       }
    });

    useEffect(() => {
        getInternetNodeStateRequest( data => {
            dispatch({ type:LoadUserInformation, payload: data });
        });

        getInstructionDirectionRequest(data => {
            dispatch({ type:LoadInstructions, payload: { instructions: data.data } });
        })
    }, []);

    let ShowProgressDetail = useCallback( instruction => {
       return e => {
           dispatch({ type:ShowDirectionProgress, payload: { instruction: instruction } });
       }
    });

    let reportAbilityEvent = useCallback( e => {
        dispatch({ type: OpenReportingDetail });
    }, [])

    return (
        <div className={`${stl.displayBoard}`}>
            <div className={`flex-layout`}>
                <div className={` flex-item-3 boxStyle ${stl.userInfo}`}>
                    <div className={`${stl.userContainer} flex-layout`}>
                        <div className={`flex-item-2 ${stl.avatarContainer}`}>
                            <div className={stl.avatar}>

                            </div>
                        </div>
                        <div className={`flex-item-4 ${stl.detailContainer}`}>
                            <div className={stl.infoHeader}>
                                楼宇用户
                            </div>
                            <div className={stl.infoTitle}>
                                区块链楼宇侧节点
                            </div>
                            <div className={stl.InfoState}>
                                区块链节点状态： <img src={store.nodeState.isOnline?loading:offline} alt=""/> <span >{store.nodeState.isOnline?'正常在线':'离线'}</span>
                            </div>
                            <div className={stl.lastReport}>
                                最近上报时间：{store.nodeState.lastReportDateTime}
                            </div>
                            <div className={stl.infoAddress}>
                                地址：{store.nodeState.address}
                            </div>
                            <div className={stl.infoBtn}>
                                <button className={'FUIButton FUI-btnBlue'} onClick={reportAbilityEvent}>
                                    <span className={'glyphicon glyphicon-upload padding-right-5px'}></span>
                                    调控能力上报
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={` flex-item-9 boxStyle ${stl.directions}`}>
                    <fieldset>
                        <legend className={'padding-left-15px'}> 参与指令执行进度表格</legend>
                        <div className={stl.directionProgressContainer}>
                            {
                                store.instructions.map((element, idx) => {
                                    return (
                                        <div key={element.cmdId} className={`${stl.singleDirection} flex-layout padding-left-5px`}>
                                            <div className={'flex-item-2 '}>
                                                {idx + 1}. <img src={directionIcon} alt=""/> {element.type}指令[<span>{element.cmdId}</span>]
                                            </div>
                                            <div className={`flex-item-6`}>
                                                <div className={stl.historyProgressOuter}>
                                                    <div className={stl.historyProgressInner} style={{width: `${element.progress}%`}} >
                                                        {element.progress}%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'flex-item-2'}>
                                                承担负荷: {element.electricValue??0}{element.electricUnit}
                                            </div>
                                            <div className={'flex-item-2'}>
                                                预计积分: {element.point??0}
                                            </div>
                                            <div className={'flex-item-1'}>
                                                <button className={'normalLinkDetailOperation'} onClick={ShowProgressDetail(element)} >查看进度</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={stl.yourAssets}>
                            <div className={`${stl.figureAssets} ${stl.credit_hover} float-layout`}>
                                <div className={'float-left'}>
                                    <img src={imgCredit} alt=""/>
                                </div>
                                <div className={'float-left'}>
                                    <p className={`${stl.numberAssets}`} title={store.nodeState.points} >{store.nodeState.points}</p>
                                    <p className={`${stl.detailAssets}`}>总积分</p>
                                </div>
                            </div>
                            <div className={`${stl.figureAssets} ${stl.reputation_hover}  float-layout`}>
                                <div className={'float-left'}>
                                    <img src={imgReputation} alt=""/>
                                </div>
                                <div className={'float-left'}>
                                    <p className={`${stl.numberAssets}`} title={store.nodeState.reputation} >{store.nodeState.reputation}</p>
                                    <p className={`${stl.detailAssets}`}>当前信誉分</p>
                                </div>
                            </div>
                            <div className={`${stl.figureAssets}  ${stl.waiting_hover} float-layout`}>
                                <div className={'float-left'}>
                                    <img src={imgWaitingGet} alt=""/>
                                </div>
                                <div className={'float-left'}>
                                    <p className={`${stl.numberAssets}`} title={store.nodeState.waitPoint} >{store.nodeState.waitPoint}</p>
                                    <p className={`${stl.detailAssets}`}>待获得积分</p>
                                </div>
                            </div>
                            <div className={`${stl.figureAssets}  ${stl.electric_hover} float-layout`}>
                                <div className={'float-left'}>
                                    <img src={imgElectric} alt=""/>
                                </div>
                                <div className={'float-left'}>
                                    <p className={`${stl.numberAssets}`} title={store.nodeState.contractCount} >{store.nodeState.contractCount}</p>
                                    <p className={`${stl.detailAssets}`}>合同总数</p>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            {
                store.progressDetailShow?<DialogContainer
                    close={() => dispatch({type: CloseDirectionProgress})}
                    render={<ShowDirectionProgressDetail direction={store.activeDirection} close={() => dispatch({type: CloseDirectionProgress})}  />}
                    {...dialogSetting}
                />:''
            }
            {
                store.reportingDetailShow?<DialogContainer
                    close={() => dispatch({type: CloseReportingDetail})}
                    render={<ReportingTheAbilityDetail close={() => dispatch({type: CloseReportingDetail})}  />}
                    {...reportingSetting}
                />:''
            }
        </div>
    );
}

export default DisplayBoard;