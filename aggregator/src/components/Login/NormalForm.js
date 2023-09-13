import React, {Component} from 'react';
import err from '../../static/imgs/icon/err.png'
import right from '../../static/imgs/icon/right.png'
import axios from "../../apis/axios.config";
import VCode from "./VCode";
import PubSub from 'pubsub-js';
import Loading from "../dialog/Loading";
import Notice from "../dialog/Notice";
import {saveToken} from '../../apis/user';
import {POSTUSERLOGIN} from "../../apis/routes";

class NormalForm extends Component {

    constructor(props) {
        super(props);
        /*  订阅消息 */
        this.token = PubSub.subscribe('GET_VALIDATE_CODE', (msg,data )=>{
            let str = '';
            data.forEach((v,i,a) => {
                str += String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 ));
            });
            this.setState({validateCode : str})
        });
    }

    state ={
        id:{
            iconState: false,
            idState: false,
            value:''
        },
        pwd:{
            iconState: false,
            pwdState:false,
            value:''
        },
        btnState: false,
        validateErr: false,
        validateValue:'',
        validateCode:'',
        loadingDialog:false,
        noticeDialog:false,
        noticeMessage:''
    }

    closeNotice = ()=> {
        this.setState({noticeDialog: false})
    }

    closeLoading = ()=>{
        this.setState({loadingDialog: false})
    }

    showNoticeMessage = (msg)=>{
        this.setState({
            loadingDialog: false,
            noticeDialog:true,
            noticeMessage: msg
        });
    }

    inputID = (cur) => {
        this.id = cur;
    }
    inputPwd = (cur) => {
        this.pwd = cur;
    }

    componentWillUnmount() {
        /*  组件消失就取消订阅 */
        PubSub.unsubscribe(this.token);
    }

    render() {
        return (
            <div className={'normal ' + this.props.disappear}>
                <form action="">
                    <div className='input-wrap'>
                        <span className='glyphicon glyphicon-user'></span>
                        <input onChange={this.getID} ref={this.inputID}  placeholder='请输入账号！'  type='text'/>
                        {this.state.id.iconState?<img src={this.state.id.idState?right:err} alt="?"/>:''}
                    </div>
                    <div className='input-wrap'>
                        <span className='glyphicon glyphicon-lock'></span>
                        <input onChange={this.getPwd} ref={this.inputPwd}  placeholder='请输入密码！'  type='password'/>
                        {this.state.pwd.iconState?<img src={this.state.pwd.pwdState?right:err} alt="?"/>:''}
                    </div>
                    <div className='validate-wrap'>
                        <input maxLength='4' onChange={this.getValidateCode} placeholder='输入验证码！'  type="text"  className={this.state.validateErr?'error':''} />
                        <VCode/>
                    </div>
                    <div className='button-wrap'>
                        <button className='Button' onClick={this.submit} disabled={this.state.btnState} >
                            立即登录
                        </button>
                    </div>
                </form>
                {this.state.noticeDialog?<Notice message={this.state.noticeMessage} close={this.closeNotice} backgroundCancal={true} />:'' }
                {this.state.loadingDialog?<Loading/>:'' }
            </div>
        );
    }

    submit = (e) => {
        e.preventDefault();
        //没有输入账号
        let idExisit = true;
        let pwdExisit = true;
        let validateError = false;
        if (this.id.value.toString().trim() == '') idExisit = false;
        if (this.pwd.value.toString().trim() == '') pwdExisit = false;
        //大小写不计较
        if (this.state.validateValue.toLowerCase() != this.state.validateCode.toLowerCase()){
            validateError =true;
        }
        this.setState({
            id:{
                iconState:true,
                idState: idExisit,
            },
            pwd:{
                iconState:true,
                pwdState:pwdExisit,
            },
            validateErr:validateError
        });
        if (!idExisit|| !pwdExisit ||validateError ){
            return null;
        }

        const btn = e.target;

        btn.disabled = true;
        btn.classList.remove('Button');
        btn.classList.add('Button-disabled');
        this.setState({loadingDialog: true});

        const closeLoading = this.closeLoading;
        const showNotice = this.showNoticeMessage;


        axios.post(POSTUSERLOGIN,
            {
                userId: this.id.value,
                userPwd: this.pwd.value
            }
        ).then(function (response) {
            saveToken(response.data.token);
        })
        .catch(function(error) {
            if(error.response){
                showNotice(`错误代码[${error.response.status}]: `+ error.response.data.message);
            }else {
                showNotice(error.toString());
            }
        }).finally(()=>{
            closeLoading();
            btn.disabled = false;
            btn.classList.add('Button');
            btn.classList.remove('Button-disabled');
        });
    }

    getValidateCode = (e)=>{
        let value = e.target.value.toString().trim();
        this.setState(
            {
                validateValue:value
            }
        )
    }

    getID = (e)=>{
        let idValue = e.target.value.toString().trim();
        this.setState(
            {
                id:{
                    iconState: !idValue == '',
                    idState: !idValue == '',
                    value:idValue
                }
            }
        )
    }

    getPwd =(e)=>{
        let pwdValue = e.target.value.toString().trim();
        this.setState(
            {
                pwd:{
                    iconState: !pwdValue == '',
                    pwdState:!pwdValue == '',
                    value:pwdValue
                }
            }
        )
    }
}

export default NormalForm;