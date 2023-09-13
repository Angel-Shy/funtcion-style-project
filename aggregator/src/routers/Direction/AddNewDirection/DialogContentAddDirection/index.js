import React, {Component} from 'react';
import './index.scss';
import ques from  '../../../../static/imgs/old/问号.svg'
import axiosConfig from "../../../../apis/axios.config";
import {POSTDIRECTIONINFOMATION} from "../../../../apis/routes";

import Select from "../../../../components/form/select";
import {
    SUBMITNOTICEERRORMESSAGE,
    OpenLoadingDialog,
    CloseLoadingDialog,
    AddDirectionSuccessfully
} from "../../../../pubsub";

class DialogContentAddDirection extends Component {

    state = {
        data:{
            directionTypes:[
                {value: 0, name:'削峰指令'},
                {value: 1, name:'填谷指令'},
                {value: 2, name:'其他'},
            ]
        },
        form:{
            name: '',
            phone:'',
            //validateCode: '', /* 手机验证码 */
            sketch:"",
            directionType: 0,
            startDate: '',
            startTime: '',
            endDate:'',
            endTime:'',
            electric:0,
            remark:''
        },
        errorShow: false,
        errorMessage: ''
    }

    nameElement = React.createRef();
    phoneElement = React.createRef();
    sketchElement = React.createRef();
    startDateElement = React.createRef();
    startTimeElement = React.createRef();
    //validateCodeElement = React.createRef();
    endDateElement = React.createRef();
    endTimeElement =React.createRef();
    electricElement = React.createRef();
    remarkElement = React.createRef();

    // 取消验证警告
    focusContent = (e) => {
        let tagName = e.target.tagName.toLowerCase();
        if ( tagName == 'input' || tagName == 'textarea' ){
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

    getState = (formName) => {
        return (value) => {
            this.state.form[formName] = value;
            this.setState(this.state);
        }
    }

    render() {
        return (
            <div className='dialogContentAddDirection' onFocus={this.focusContent} onSubmit={this.onSubmit} >
                    <div className="myState-line">
                        <span className="myState">指令编号:</span>
                        <span className="myState-answer item-state"> 自动编号 </span>
                    </div>
                    <div className="myState-line">
                        <span className="myState">发起人:</span>
                        <span className="myState-answer">
                            <input ref={this.nameElement}  className="myinput myinput-long"  type="text"/>
                        </span>
                    </div>
                    <div className="myState-line">
                        <span className="myState">发起人电话号码:</span>
                        <span className="myState-answer">
                          <input  ref={this.phoneElement} className="myinput myinput-long"  type="text" />
                       </span>
                    </div>
                    <div className="myState-line">
                        <span className="myState">指令类型:</span>
                        <span className="myState-answer">
                        <Select sendData={this.getState('directionType')} options={this.state.data.directionTypes} />
                        </span>
                    </div>
                    <div className="myState-line">
                        <span className="myState">指令简述:</span>
                        <span className="myState-answer">
                          <input ref={this.sketchElement} className="myinput myinput-long" placeholder="请输入指令简述（25字以内）例如：削峰指令ACFD15239875 " maxLength="25" type="text"/>
                        </span>
                    </div>
                    <div className="myState-line">
                        <span className="myState">开始日期:</span>
                        <span className="myState-answer">
                          <input ref={this.startDateElement} className="myinput myinput-long"  type="date"/>
                        </span>
                    </div>
                    <div className="myState-line">
                        <span className="myState">开始时间:</span>
                        <span className="myState-answer">
                          <input ref={this.startTimeElement}  step="1"   className="myinput myinput-long"  type="time"/>
                       </span>
                    </div>
                    <div className="myState-line">
                        <span className="myState">结束日期:</span>
                        <span className="myState-answer">
                          <input ref={this.endDateElement} className="myinput myinput-long"  type="date"/>
                       </span>
                    </div>
                    <div className="myState-line">
                        <span className="myState">结束时间:</span>
                        <span className="myState-answer">
                            <input ref={this.endTimeElement} step="1"  className="myinput myinput-long"  type="time"/>
                       </span>
                    </div>
                    <div className="myState-line">
                        <span className="myState">负荷需求量:</span>
                        <span className="myState-answer">
                            <input ref={this.electricElement} className="myinput myinput-long"   type="number"/> <span className="item">kw</span>
                        </span>
                    </div>
                    <div className="myState-line">
                        <span className="myState">负荷积分兑换比:</span>
                        <span className="myState-answer item-state" title="每减少100kw.h 可获得多少积分">[系统算法自动生成]
                           <img src={ques} alt="" width="18px"/>
                        </span>
                    </div>
                    <div className="myState-line">
                        <span className="myState">完备性备注:</span>
                        <span className="myState-answer">
                            <textarea ref={this.remarkElement} className="textarea myinput-long" style={{height: 50}}></textarea>
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
            </div>
        );
    }

    checkElements(elements){
        let tErrorCount = 0
        elements.forEach(element=>{
            if (element.current.value ===  ''){
                element.current.classList.add('errorInput');
                tErrorCount++;
            }
        });
        return tErrorCount;
    }

    onSubmit = (e)=> {

        this.removeErrorMessage();

        e.preventDefault();//先不急着提交
        let tErrorCount = 0;
        tErrorCount = this.checkElements([this.nameElement,this.phoneElement,this.sketchElement,this.startDateElement, /*this.validateCodeElement*/
            this.startTimeElement,this.endDateElement,this.endTimeElement,this.electricElement, this.remarkElement]);
        //验证码需要使用localSessionStore 存储哦 或者 localStore


        //获得数据
        this.state.form.name = this.nameElement.current.value;
        this.state.form.phone = this.phoneElement.current.value;
        this.state.form.sketch = this.sketchElement.current.value;
        //this.state.form.validateCode = this.validateCodeElement.current.value;
        this.state.form.startDate = this.startDateElement.current.value;
        this.state.form.startTime = this.startTimeElement.current.value;
        this.state.form.endDate = this.endDateElement.current.value;
        this.state.form.endTime = this.endTimeElement.current.value;
        this.state.form.remark = this.remarkElement.current.value;
        this.state.form.electric = this.electricElement.current.value;

        let startDateTime = new Date(`${this.state.form.startDate} ${this.state.form.startTime}`);
        let endDateTime = new Date(`${this.state.form.endDate} ${this.state.form.endTime}`);

        //时间检测
        if (Number.isNaN(startDateTime.getTime())){
            this.setState({
                errorShow: true,
                errorMessage: "开始执行时间设置不规范！"
            });
            return;
        }
        if (Number.isNaN(endDateTime.getTime())){
            this.setState({
                errorShow: true,
                errorMessage: "结束执行时间设置不规范！"
            });
            return;
        }

        if (this.state.form.electric <= 0){
            this.setState({
                errorShow: true,
                errorMessage: "负荷值不规范！ 应该大于 0！"
            });
            return;
        }

        if(!(/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(this.state.form.phone))){
            this.setState({
                errorShow: true,
                errorMessage: "电话号码格式不正确！"
            });
            return;
        }
        //利用后台检查数据的合理性
        if (tErrorCount === 0){
            OpenLoadingDialog();
            axiosConfig.post(POSTDIRECTIONINFOMATION, this.state.form)
                .then(response => {
                    this.props.close();
                    setTimeout( () => {
                        CloseLoadingDialog();
                        PubSub.publish(SUBMITNOTICEERRORMESSAGE,'指令下发已经成功，后台系统正在处理中!');
                        PubSub.publish(AddDirectionSuccessfully,'指令下发已经成功');
                    }, 1000);

                }).catch(error => {
                    this.setState({
                        errorShow: true,
                        errorMessage: error.response?error.response.data.message:error.message
                    });
                    setTimeout( () => {
                        CloseLoadingDialog();
                    }, 1000);
            });
        }else{
            return null;
        }
    }
}

export default DialogContentAddDirection;