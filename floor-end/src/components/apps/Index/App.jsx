import React, {Fragment, useState} from 'react';
import './App.scss';
import "animate.css";
import {HashRouter} from "react-router-dom";
import PubSub from "pubsub-js";
import {SubmitMessage,OpenImplementDialog,OpenLoading,CloseLoading} from '../../../pubsub/constants';
import Notice, {getNoticeDefaultSetting} from "../../public/dialog/Notice/Notice";
import FloorView from "../../../routers/FloorView/FloorView";
import Loading from "../../public/dialog/Loading/Loading";

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
    ImplementationNotice: false
};

function appReducer(state, action){
    switch (action.type) {
        case 'toggleNotice':
            state.Message = action.payload.message;
            state.NoticeShow = !state.NoticeShow;
            return {...state}
        case 'openImplement':
            state.ImplementationNotice  = true;
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
    let [loading, setLoading] = useState({show: false, message:'正在等待服务器处理...'});

    React.useEffect(() => {
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
        /* 死亡了就开始取消订阅 token */
        return () => {
            PubSub.unsubscribe(token);
            PubSub.unsubscribe(iplToken);
            PubSub.unsubscribe(OpenToken);
            PubSub.unsubscribe(CloseToken);
        }
    },[]);

    return (
        <Fragment>
            <HashRouter>
                <FloorView/>
                {loading.show?<Loading message={loading.message} />:''}
                {state.NoticeShow? <Notice {...DefaultSetting} close={e => dispatch({type: 'close'})} ></Notice> :''}
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
