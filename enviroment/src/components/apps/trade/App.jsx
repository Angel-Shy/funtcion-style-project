import React, {Fragment} from 'react';
import './App.scss';
import "animate.css";
import TradeView from "../../../routers/TradeView/TradeView";
import {HashRouter} from "react-router-dom";
import {isLogin, logout} from '../../../axios/user';
import PubSub from "pubsub-js";
import {SubmitMessage,OpenImplementDialog, OpenMustImplementDialog} from '../../../pubsub/constants';
import Notice, {getNoticeDefaultSetting} from "../../public/dialog/Notice/Notice";
import ActionNotice  from "../../public/dialog/ActionNotice/ActionNotice";
import ClipboardJS from 'clipboard';

const DefaultSetting = getNoticeDefaultSetting();
DefaultSetting.title = '提示框';
DefaultSetting.width = 650;
DefaultSetting.height = 180;
DefaultSetting.top = 200;

const DialogLoadingSetting = getNoticeDefaultSetting();
DialogLoadingSetting.isNeedFooter = true;
DialogLoadingSetting.width = 650;
DialogLoadingSetting.height = 180;
DialogLoadingSetting.title = "提示框";
DialogLoadingSetting.bcIsCancel = false;


const initialState = {
    NoticeShow: false,
    ImplementationNotice: false,
    actionNoticeShow: false,

};

const actionMustDialog = {
    message : '',
    callback : null
}

function appReducer(state, action){
    switch (action.type) {
        case 'toggleNotice':
            state.Message = action.payload.message;
            state.NoticeShow = !state.NoticeShow;
            return {...state}
        case 'openImplement':
            state.ImplementationNotice  = true;
            return {...state}
        case 'openMustImplement':
            state.actionNoticeShow  = true;
            return {...state}
        case 'closeMustImplement':
            state.actionNoticeShow  = false;
            return {...state}
        case 'close':
            state.NoticeShow = false;
            return {...state}
        case 'closeIpm':
            state.ImplementationNotice = false;
            return {...state}
        default:
            return state;
    }
}


function App(props) {
    const [state, dispatch] = React.useReducer(appReducer,initialState);

    React.useEffect(() => {
        /* 登陆判断 */
        if(!isLogin()) logout();

        let clipboard = new ClipboardJS('.btn');

        // clipboard.on('success', function(e) {
        //    console.log(e);
        // });

        clipboard.on('error', function(e) {
            alert('复制失败！');
        });

        /* 普通的通知消息 */
        const token = PubSub.subscribe(SubmitMessage,  (msg, data) => {
            /* 获得了提示消息 */
            DefaultSetting.message = data;
            dispatch({type:'toggleNotice', payload:{message: data}});
        });
        /* 需要确认后执行的通知下次 */
        const iplToken = PubSub.subscribe(OpenImplementDialog,  (msg, data) => {
            /* 获得了提示消息 */
            DialogLoadingSetting.message = data.message;
            DialogLoadingSetting.callback = data.implement;
            dispatch({type:'openImplement'});
        });
        //必须执行
        const iplmustToken = PubSub.subscribe(OpenMustImplementDialog,  (msg, data) => {
            /* 获得了提示消息 */
            actionMustDialog.message = data.message;
            actionMustDialog.callback = data.implement;
            dispatch({type:'openMustImplement'});
        });

        /* 死亡了就开始取消订阅 token */
        return () => {
            PubSub.unsubscribe(token);
            PubSub.unsubscribe(iplToken);
            PubSub.unsubscribe(iplmustToken);
            clipboard = null;
        }
    },[]);

    return (
        <Fragment>
            <HashRouter>
                <TradeView/>
                {state.NoticeShow? <Notice {...DefaultSetting} close={e => dispatch({type: 'close'})} ></Notice> :''}
                {
                    state.ImplementationNotice?
                        <Notice
                            close={() => dispatch({type: 'closeIpm'})}
                            {...DialogLoadingSetting}
                        />:''
                }
                {state.actionNoticeShow? <ActionNotice {...actionMustDialog} close={e => dispatch({type: 'closeMustImplement'})} ></ActionNotice> :''}
                {
                    state.ImplementationNotice?
                        <Notice
                            close={() => dispatch({type: 'closeIpm'})}
                            {...DialogLoadingSetting}
                        />:''
                }
            </HashRouter>
        </Fragment>
    );
}

export default App;
