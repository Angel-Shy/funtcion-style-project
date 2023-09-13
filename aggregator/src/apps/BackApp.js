import React, {Fragment} from "react";
import {isLogin, loginOut} from '../apis/user'
import ContentLeft from "../components/contentLeft";
import ContentRight from "../components/contentRight";
import {HashRouter} from 'react-router-dom';
import PubSub from "pubsub-js";
import {SUBMITNOTICEERRORMESSAGE, ACTIONDIALOGCARRYOUTDIALOG, OpenLoadingShowNow, CloseLoadingShowNow} from "../pubsub";
import Notice from './../components/dialog/Notice';
import ActionNotice from "../components/dialog/ActionNotice";
import Loading from "../components/dialog/Loading";

export default class BackApp extends React.Component{

    constructor(props) {
        super(props);
        if (!isLogin()) loginOut();
    }

    state = {
        showNotice: false,
        noticeMessage:'',
        loadingShow: false,
        showActionNotice: false,
        action : null,
        message: '提示信息！'
    }

    closeNotice = () =>{
        this.setState({showNotice: false});
    }

    closeActionNotice = () => {
        this.setState({showActionNotice: false});
    }

    componentDidMount() {
        /*  订阅消息 */
        this.token = PubSub.subscribe(SUBMITNOTICEERRORMESSAGE, (msg,data )=>{
            //this.setState({name: data});noticeMessage
            this.setState({
                showNotice: true,
                noticeMessage: data
            })
        });

        //执行
        this.actionNoticeToken = PubSub.subscribe(ACTIONDIALOGCARRYOUTDIALOG, (msg,data )=>{
            this.setState({
                showActionNotice: true,
                action: data.action,
                message:data.message
            })
        });

        //打开执行界面
        this.loadingOpen = PubSub.subscribe(OpenLoadingShowNow, (msg,data )=>{
            this.setState({
                loadingShow: true,
            })
        });

        //关闭执行界面
        this.loadingClose = PubSub.subscribe(CloseLoadingShowNow, (msg,data )=>{
            this.setState({
                loadingShow: false,
            })
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
        PubSub.unsubscribe(this.actionNoticeToken);
        PubSub.unsubscribe(this.loadingOpen);
        PubSub.unsubscribe(this.loadingClose);
    }

    render() {
        return <Fragment>
            <HashRouter>
                <ContentLeft/>
                <ContentRight/>
                {this.state.loadingShow?<Loading/>:'' }
                {this.state.showNotice?<Notice message={this.state.noticeMessage} close={this.closeNotice} backgroundCancal={true} />:''}
                {this.state.showActionNotice?<ActionNotice message={this.state.message} action={this.state.action} necessary={true} close={this.closeActionNotice} backgroundCancal={false} />:''}
            </HashRouter>
        </Fragment>
    }
}