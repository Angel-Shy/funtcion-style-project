import React, {Component} from 'react';
import './index.scss';
import axiosConfig from "../../../../apis/axios.config";
import {POSTINTERNETADDBLOCKCHAINNODE} from "../../../../apis/routes";

class DialogContentAddNode extends Component {

    state = {
        errorShow: false,
        errorMessage: '',
        form:{
            ipAddress: '',
            realAddress: '',
            addTime: new Date(Date.now()),
            phone:'',
            deviceName:'',
            nickName: "",
            userName: "",
            password: ""
        }
    }

    setFormValue = (formName) =>{
        return (e)=>{
            this.state.form[formName] = e.target.value;
            this.setState(this.state);
        }
    }
    focusContent = (e) => {
        let tagName = e.target.tagName.toLowerCase();
        if ( tagName == 'input'){
            e.target.classList.remove('errorInput');
        }
    }
    //remove error message
    removeErrorMessage= (e) => {
        this.setState({
            errorShow: false,
            errorMessage: ''
        });
    }
    render() {
        return (
            <form className="dialogContentAddNode" onFocus={this.focusContent}>
                <div className="myState-line">
                    <span className="myState">节点初始化:</span>
                    <span className="myState-answer item-state"> 系统自动初始化一些字段 </span>
                </div>
                <div className="myState-line">
                    <span className="myState">IP地址:</span>
                    <span className="myState-answer">
                    <input className="myinput myinput-long"
                           pattern={'^(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)){3}$'}
                           placeholder={'请输入节点的IP 地址！'}  ref={el => this.ipAddressElement = el}
                           value={this.state.form.ipAddress}   onChange={this.setFormValue('ipAddress')}  type="text"/>
                </span>
                </div>
                <div className="myState-line">
                    <span className="myState">楼宇地址:</span>
                    <span className="myState-answer">
                    <input className="myinput myinput-long"
                       placeholder={'请输入节点的实际地理位置！'} ref={el => this.realAddressElement = el}
                       value={this.state.form.realAddress}  onChange={this.setFormValue('realAddress')} type="text"/>
                </span>
                </div>
                <div className="myState-line">
                    <span className="myState">添加时间:</span>
                    <span className="myState-answer item-state">{this.state.form.addTime.toLocaleString()}</span>
                </div>
                <div className="myState-line">
                    <span className="myState">电话号码:</span>
                    <span className="myState-answer">
                    <input className="myinput myinput-long"
                           placeholder="请输入节点负责人电话号码" ref={el => this.phoneElement = el}  value={this.state.form.phone}
                           onChange={this.setFormValue('phone')} type="text"/>
                    </span>
                </div>
                <div className="myState-line">
                    <span className="myState">拥有积分:</span>
                    <span className="myState-answer item-state"> 0 <span className={'font-blue'}>[初始积分为0]</span></span>
                </div>
                <div className="myState-line">
                    <span className="myState">设备名:</span>
                    <span className="myState-answer">
                     <input className="myinput myinput-long" placeholder="请输入设备名"
                            ref={el => this.deviceNameElement = el}  value={this.state.form.deviceName}
                            onChange={this.setFormValue('deviceName')} type="string"/>
                   </span>
                </div>
                <div className="myState-line">
                    <span className="myState">节点编号:</span>
                    <span className="myState-answer">
                     <input className="myinput myinput-long" placeholder="请输入节点编号"
                            ref={el => this.nickNameElement = el}  value={this.state.form.nickName}
                            onChange={this.setFormValue('nickName')} type="string"/>
                   </span>
                </div>
                <div className="myState-line">
                    <span className="myState">CA账号:</span>
                    <span className="myState-answer">
                     <input className="myinput myinput-long" placeholder="请输入CA账号"
                            ref={el => this.userNameElement = el}  value={this.state.form.userName}
                            onChange={this.setFormValue('userName')} type="string"/>
                   </span>
                </div>
                <div className="myState-line">
                    <span className="myState">CA密码:</span>
                    <span className="myState-answer">
                     <input className="myinput myinput-long" placeholder="请输入CA密码"
                            ref={el => this.passwordElement = el}  value={this.state.form.password}
                            onChange={this.setFormValue('password')} type="string"/>
                   </span>
                </div>
                <div className="flex-layout margin-top-25px ">
                    <div className='flex-item-5 padding-left-15px'>
                        {this.state.errorShow?<span className='errorMessageFromServer'>{this.state.errorMessage}</span>: ''}
                        {this.state.errorShow?<span onClick={this.removeErrorMessage} className={'glyphicon glyphicon-remove pointer'}></span>:''}
                    </div>
                    <div className='flex-item-5 text-align-right '>
                        <button onClick={this.props.close}  className="FUIButton  FUI-btnWhite ">
                            <span className='glyphicon glyphicon-remove'></span>
                            操作取消
                        </button>
                        <button onClick={this.onSubmit}  className="FUIButton FUI-btnBlack margin-left-15px ">
                            <span className='glyphicon glyphicon-ok'></span>
                            立即执行
                        </button>
                    </div>
                </div>
            </form>
        );
    }
    checkElements(elements){
        elements.forEach(element=>{
            if (element.value ===  ''){
                element.classList.add('errorInput');
                this.errorCount++;
            }
        });
    }
    onSubmit = (e) => {
        e.preventDefault();//先不急着提交
        this.errorCount = 0;
        this.checkElements([
            this.ipAddressElement,
            this.realAddressElement, 
            this.phoneElement, 
            this.deviceNameElement,
            this.nickNameElement,
            this.userNameElement,
            this.passwordElement
        ]);
        if (this.errorCount == 0){
            axiosConfig.post(POSTINTERNETADDBLOCKCHAINNODE, this.state.form).then(response => {
                console.log(response.data);
            }).catch(error => {
                //pubsub处理
                 this.setState({
                     errorMessage : error.response == null?error.message:error.response.data.message,
                     errorShow : true
                 })
            });
        }
    }

}

export default DialogContentAddNode;