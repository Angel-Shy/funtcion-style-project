import React, {Fragment, Suspense, lazy, useState} from 'react';
import TradeHeader from "./TradeHeader/TradeHeader";
import TradeLeftNavbar from './TradeLeftNarbar/TradeLeftNarbar';
import TradeContent from  './TradeContent/TradeContent';
import LoadingTrade from "./LoadingTrade/LoadingTrade";
import {Route, Routes, Navigate} from "react-router-dom";
const HotTradeElectric =  lazy(()=> import('./HotTradeElectric/HotTradeElectric'));
const HistoryTrade =  lazy(()=> import('./HistoryTrade/HistoryTrade'));
const HotTradeCredit =  lazy(()=> import('./HotTradeCredit/HotTradeCredit'));
import {getDirectionRequest} from "../../axios/tradeRequests";
import PubSub from "pubsub-js";
import {OpenLoading, CloseLoading, OpenElectricContract, OpenCreditContract} from "../../pubsub/constants";
import Loading from "../../components/public/dialog/Loading/Loading";
import DialogContainer,{getDialogDefaultSetting} from "../../components/public/dialog/DialogContainer/DialogContainer";
import ElectricContractDetail from "./HotTradeElectric/ElectricContractDetail/ElectricContractDetail";
import CreditContractDetail from "./HotTradeCredit/CreditContractDetail/CreditContractDetail";
import {userAssetsRequest} from '../../axios/userRequests';

/* history 路由下的子组件 */
import NotificationHistory from "./HistoryTrade/NotificationHistory/NotificationHistory";
import RequirementHistory from "./HistoryTrade/RequirementHistory/RequirementHistory";
import TransactionHistory from "./HistoryTrade/TransactionHistory/TransactionHistory";

/* electric 路由下的子组件 */
import MyHotTradeElectricTable from './HotTradeElectric/MyHotTradeElectricTable/MyHotTradeElectricTable';
import PublishTradeElectricTable from "./HotTradeElectric/PublishTradeElectricTable/PublishTradeElectricTable";

/* credit 路由下的子组件 */
import TradePublishCredit from "./HotTradeCredit/TradePublishCredit/TradePublishCredit";
import TradeRequestConfirm from "./HotTradeCredit/TradeRequestConfirm/TradeRequestConfirm";

/* 展开一个电子交易合同 */
let electricContractDefaultSetting = getDialogDefaultSetting();
electricContractDefaultSetting.isNeedFooter = false;
electricContractDefaultSetting.width = 1250;
electricContractDefaultSetting.top = 60;
electricContractDefaultSetting.height = 720;
electricContractDefaultSetting.title = "电力交易合同";
electricContractDefaultSetting.isLoading = false;

/* 展开一个电子积分合同 */
let creditContractDefaultSetting = getDialogDefaultSetting();
creditContractDefaultSetting.isNeedFooter = false;
creditContractDefaultSetting.width = 1250;
creditContractDefaultSetting.top = 60;
creditContractDefaultSetting.height = 720;
creditContractDefaultSetting.title = "积分交易合同";
creditContractDefaultSetting.isLoading = false;



function TradeView(props) {

    let [loading, setLoading] = useState({show: false, message:'正在等待服务器处理...'});
    let [electricContract, setElectricContract] = useState({
        show:false,
        transaction: null,
        isDetail: false
    });

    let [creditContract, setCreditContract] = useState({
        show: false,
        transaction: null,
        isDetail: false
    })

    React.useEffect(()=>{
        /* 请求数据放到 redux 里面 */
        getDirectionRequest();
        userAssetsRequest(null);
        const OpenToken = PubSub.subscribe(OpenLoading,  (msg, data) => {
            /* 获得了提示消息 */
            setLoading({
                show: true,
                message: data
            });
        });
        const CloseToken = PubSub.subscribe(CloseLoading,  (msg, data) => {
            /* 获得了提示消息 */
            setLoading({
                show: false,
                message: ''
            });
        });
        const electricToken = PubSub.subscribe(OpenElectricContract, (_, data) => {
            setElectricContract({
                show:true,
                transaction: data.contract,
                isDetail: data.isDetail
            });
        });
        const creditToken = PubSub.subscribe(OpenCreditContract, (_, data) => {
            setCreditContract({
                show:true,
                transaction: data.transaction,
                isDetail: data.isDetail
            });
        })
        return () => {
            PubSub.unsubscribe(OpenToken);
            PubSub.unsubscribe(CloseToken);
            PubSub.unsubscribe(electricToken);
            PubSub.unsubscribe(creditToken);
        }
    }, []);

    return (
        <Fragment>
            <TradeHeader/>
            <div className={'tradeContainer'}>
                <div className={'tradeNav'}>
                    <div className={'navContent'}>
                        <TradeLeftNavbar/> {/* 侧边栏 左边类型 */}
                    </div>
                </div>
                <div className={'tradeContent'}>
                    <div className={'realContent'}>
                        <Suspense fallback={<LoadingTrade/>}>
                            <Routes>
                                <Route  path='/history' element={<HistoryTrade/>} >
                                    <Route path="notice"  element={<NotificationHistory/>} ></Route>
                                    <Route path="requirement" element={<RequirementHistory/>}></Route>
                                    <Route path="transaction" element={<TransactionHistory/>}></Route>
                                    <Route path='*' element={<RequirementHistory/>} ></Route>
                                </Route>
                                <Route  path='/electric' element={<HotTradeElectric/>} >
                                    <Route path="recipient"  element={<MyHotTradeElectricTable/>} ></Route>
                                    <Route path="sender" element={<PublishTradeElectricTable/>}></Route>
                                    <Route path='*' element={<MyHotTradeElectricTable/>} ></Route>
                                </Route>
                                <Route  path='/credit' element={<HotTradeCredit/>} >
                                    <Route path="recipient"  element={<TradeRequestConfirm/>} ></Route>
                                    <Route path="sender" element={<TradePublishCredit/>}></Route>
                                    <Route path='*' element={<TradeRequestConfirm/>} ></Route>
                                </Route>
                                <Route  path='/' element={<TradeContent/>} ></Route>
                                <Route  path='*' element={<Navigate to='/'></Navigate>} ></Route>
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </div>
            {loading.show?<Loading message={loading.message} />:''}
            {
                electricContract.show?
                    <DialogContainer
                        close={() => setElectricContract({show: false, transaction: null})}
                        render={<ElectricContractDetail transaction={electricContract.transaction}   isDetail={electricContract.isDetail} close={() => {setElectricContract({show: false, transaction: null});}}  />}
                        {...electricContractDefaultSetting}
                    />:''
            }
            {
                creditContract.show?
                 <DialogContainer
                    close={() => setCreditContract({show: false, transaction: null})}
                    render={<CreditContractDetail transaction={creditContract.transaction}  isDetail={creditContract.isDetail} close={() => {setCreditContract({show: false, transaction: null});}}  />}
                    {...creditContractDefaultSetting}
                />:""
            }
        </Fragment>
    );
}

export default TradeView;
