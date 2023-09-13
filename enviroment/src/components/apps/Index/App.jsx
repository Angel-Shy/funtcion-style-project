import React, {Fragment} from 'react';
import './App.scss';
import "animate.css";
import LoginView from "../../../routers/LoginView/LoginView";
import PubSub from "pubsub-js";
import {SubmitMessage} from '../../../pubsub/constants';
import Notice, {getNoticeDefaultSetting} from "../../public/dialog/Notice/Notice";

const DefaultSetting = getNoticeDefaultSetting();
DefaultSetting.title = '提示框';
DefaultSetting.width = 600;
DefaultSetting.height = 170;
DefaultSetting.top = 200;

const initialState = {
    NoticeShow: false
}

function appReducer(state, action){
    switch (action.type) {
        case 'toggleNotice':
            state.Message = action.payload.message;
            state.NoticeShow = !state.NoticeShow;
            return {...state}
            break;
        case 'close':
            state.NoticeShow = false;
            return {...state}
            break;
        default:
            return state;
    }
}

function App(props) {

    const [state, dispatch] = React.useReducer(appReducer,initialState);

    React.useEffect(()=>{
        const token = PubSub.subscribe(SubmitMessage,  (msg, data) => {
            /* 获得了提示消息 */
            DefaultSetting.message = data;
            dispatch({type:'toggleNotice', payload:{message: data}});
        });
        /* 死亡了就开始取消订阅 token */
        return () => {
            PubSub.unsubscribe(token);
        }
    }, []);



    return (<Fragment>
        <LoginView/>
        {state.NoticeShow? <Notice {...DefaultSetting} close={e => dispatch({type: 'close'})} ></Notice> :''}
    </Fragment>);
}

export default App;
