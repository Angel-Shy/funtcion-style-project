import React, {Component, Fragment} from 'react';
import './index.scss';
import Select from "../../../../components/form/select";
import store from "../../../../redux/store";
import {DirectionSearchConditionAction, DirectionsSaveDataFromServerAction} from '../../../../redux/directionAction'
import axiosConfig from "../../../../apis/axios.config";
import {POSTDIRECTIONSDATE} from "../../../../apis/routes";
import {AddDirectionSuccessfully, SUBMITNOTICEERRORMESSAGE} from '../../../../pubsub'
import PubSub from "pubsub-js";


Date.prototype.format = function(fmt) {
    let o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

class SearchDirections extends Component {
    state = {
        data:{
            directionState: [
                {value:0, name:'全部指令'},
                {value:1, name:'指令初始化'},
                {value:2, name:'链上广播'},
                {value:3, name:'下发合同'},
                {value:4, name:'磋商阶段'},
                {value:5, name:'下发计划'},
                {value:6, name:'等待执行完成'},
                {value:7, name:'指令完成'}
            ],
            selectSort:[
                {value: 0, name:'默认排序'},
                {value: 1, name:'指令状态'},
                {value: 2, name:'减少电荷量'},
                {value: 3, name:'积分成交量'},
                {value: 4, name:'下发时间'},
                {value: 5, name:'持续时间'},
                {value: 6, name:'指令类型'},
            ],
            sortType:[
                {value: 0, name:'升序'},
                {value: 1, name:'降序'},
            ],
            directionTypes:[
                {value: 3, name:'全部指令'},
                {value: 0, name:'削峰指令'},
                {value: 1, name:'填谷指令'},
                {value: 2, name:'其他'},
            ]
        },
        form:{
            directionState: 0,
            startDateTime: new Date(0).format('yyyy-MM-ddThh:mm'),
            endDateTime: new Date(Date.now()).format('yyyy-MM-ddThh:mm'),
            electricNumberMore: 0, //大于
            electricNumberLess: 1000000, //小于
            creditMore:0,
            creditLess: 1000000,
            sortOne:0,
            sortTwo:0,
            sortType: 0,
            directionType:3,
            count:10,
            pageIndex:1
        }
    }

    componentDidMount() {
        store.dispatch(DirectionSearchConditionAction(this.state.form));
        this.token = PubSub.subscribe(AddDirectionSuccessfully, (msg,data )=>{
            this.getDataFromServer();
        });
        this.getDataFromServer();
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    getState = (formName) => {
        return (value) => {
            this.state.form[formName] = value;
            this.setState({...this.state});
            this.forceUpdate();
        }
    }

    setFormValue = (formName)=>{
        return (e)=>{
            this.state.form[formName] = e.target.value;
            this.setState(this.state);
        }
    }

    render() {
        return (
            <div className="searchDirections">
                <form >
                    <div className="form-line-mix">
                        <span className="item">指令状态：</span>
                        <Select sendData={this.getState('directionState')} options={this.state.data.directionState} />
                        <span className="itemAfter">指令类型：</span>
                        <Select sendData={this.getState('directionType')} options={this.state.data.directionTypes}  />
                        <span className="itemAfter">开始时间：</span>
                        <input type="datetime-local" onChange={this.setFormValue('startDateTime')}  value={this.state.form.startDateTime} className="myinput" ref={el => this.startElement = el} />
                        <span className="itemAfter">结束时间：</span>
                        <input className="myinput"   onChange={this.setFormValue('endDateTime')} value={this.state.form.endDateTime} type="datetime-local"  ref={el => this.endElement = el} />
                    </div>
                    <div className="form-line-mix float-layout">
                        <span className="item">电荷值大于：</span>
                        <input type="number" className="myinput" onChange={this.setFormValue('electricNumberMore')} value={this.state.form.electricNumberMore} min={0}  ref={el => this.eletricLessElement= el} />
                        <span className="itemAfter">小于：</span>
                        <input type="number" onChange={this.setFormValue('electricNumberLess')}  value={this.state.form.electricNumberLess} className="myinput"/>
                        <span className="item padding-left-10px "> kw</span>
                    </div>
                    <div className="form-line-mix float-layout">
                        <span className="item">成交积分：</span>
                        <input type="number"  onChange={this.setFormValue('creditMore')}  value={this.state.form.creditMore} className="myinput" min={0} />
                        <span className="itemAfter">小于：</span>
                        <input type="number" onChange={this.setFormValue('creditLess')}  value={this.state.form.creditLess} className="myinput"/>
                        <span className="itemAfter" >每页条数：</span>
                        <input type="number" onChange={this.setFormValue('count')}  value={this.state.form.count} className="myinput"/>
                    </div>
                    <div className="form-line-mix float-layout">
                        <span className="item">排序1：</span>
                        <Select sendData={this.getState('sortOne')} options={this.state.data.selectSort}  />
                        <span className="itemAfter">排序2：</span>
                        <Select sendData={this.getState('sortTwo')} options={this.state.data.selectSort}  />
                        {
                            this.state.form.sortOne == 0 && this.state.form.sortTwo == 0?"":
                                (<Fragment>
                                        <span className="itemAfter">排序方式：</span>
                                        <Select sendData={this.getState('sortType')} options={this.state.data.sortType} />
                                </Fragment>)
                        }
                        <button onClick={this.submitForm} className="margin-left-20px  FUIButton FUI-btnBlack ">
                            <span className={'glyphicon glyphicon-circle-arrow-down'}></span>
                            立即进行检索
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    submitForm = (e) => {
        e.preventDefault();//先别提交
        if (this.state.form.count < 1 || this.state.form.count > 20){
            PubSub.publish(SUBMITNOTICEERRORMESSAGE, '每页数量取值区间为 [1 - 20]');
            return ;
        }
        let startDateTime = new Date(this.state.form.startDateTime);
        let endDateTime = new Date(this.state.form.endDateTime);

        //时间检测
        if (Number.isNaN(startDateTime.getTime())){
            PubSub.publish(SUBMITNOTICEERRORMESSAGE, '开始时间设置不规范！');
            return;
        }
        if (Number.isNaN(endDateTime.getTime())){
            PubSub.publish(SUBMITNOTICEERRORMESSAGE, '结束时间设置不规范！');
            return;
        }
        if (startDateTime > endDateTime){
            PubSub.publish(SUBMITNOTICEERRORMESSAGE, '开始时间大于结束时间, 设置不规范！');
            return;
        }

        this.state.form.pageIndex = 1;//必须写1
        store.dispatch(DirectionSearchConditionAction(this.state.form));

        this.getDataFromServer();
    }

    getDataFromServer = ()=>{
        axiosConfig.post(POSTDIRECTIONSDATE, this.state.form).then(response => {
            store.dispatch(DirectionsSaveDataFromServerAction(response.data));//把数据存到redux 里面去
        }).catch(error => {
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
    }
}

export default SearchDirections;
