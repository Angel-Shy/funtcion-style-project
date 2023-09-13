import React, {Component} from 'react';
import './index.scss';
import Select from "../../../components/form/select";
import store from "../../../redux/store";
import {ContractSaveSearchConditionAction, ContractsSaveDataFromServerAction} from "../../../redux/contractAction";
import {SUBMITNOTICEERRORMESSAGE} from "../../../pubsub";
import axiosConfig from '../../../apis/axios.config';
import {POSTCONTRACTSDATA} from "../../../apis/routes";

class SearchContracts extends Component {

    state = {
        selectOption:{
            contractState:[
                {value: 0, name:'所有合同'},
                {value: 1, name:'签署中'},
                {value: 2, name:'锁定中'},
                {value: 3, name:'等待支付'}
            ],
            contractType:[
                {value: 0, name: '所有合同'},
                {value: 1, name: '需求指令合同'},
                {value: 2, name: '积分交易合同'},
                {value: 3, name: '电力交易合同'},

            ],
            selectSort:[
                {value: 0, name:'默认排序'},
                {value: 1, name:'合同状态'},
                {value: 2, name:'合同类型'},
                {value: 3, name:'指令编号'},
            ],
            sortType:[
                {value: 0, name:'默认时间降序'},
                {value: 1, name:'升序'},
                {value: 2, name:'降序'},
            ]
        },
        form:{
            sortType: 0,
            directionCode: '',
            pageIndex: 1,
            count:10,
            initiator:'',
            receiver:''
        }
    }

    getState = (formName) => {
        return (value) => {
            this.state.form[formName] = value;
            this.setState(this.state);
        }
    }

    setFormValue = (formName)=>{
        return (e)=>{
            this.state.form[formName] = e.target.value;
            this.setState(this.state);
        }
    }

    componentDidMount() {
        store.dispatch(ContractSaveSearchConditionAction(this.state.form));
        this.getDataFromServer(this.state.form);
    }

    render() {
        return (
            <div className={'searchContracts'}>
                <form action="">
                    <div className="form-line-mix">
                        <span className="item">发起方:</span>
                        <input type="text" className="myinput" onChange={this.setFormValue('initiator')} value={this.state.form.initiator}  placeholder="填写楼宇/聚合商编号" />
                        <span className="itemAfter">接受方：</span>
                        <input className="myinput" type="text" onChange={this.setFormValue('receiver')} value={this.state.form.receiver} placeholder="填写楼宇/聚合商编号" />
                        <span className="itemAfter">指令编号：</span>
                        <input type="number" onChange={this.setFormValue('directionCode')} placeholder={'默认查询所有'}  value={this.state.form.directionCode} className="myinput"/>
                    </div>
                    <div className="form-line-mix float-layout">
                        <span className="item" >每页条数：</span>
                        <input type="number" onChange={this.setFormValue('count')}  value={this.state.form.count} className="myinput"/>
                        <span className="itemAfter">排序方式：</span>
                        <Select sendData={this.getState('sortType')} options={this.state.selectOption.sortType} />
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
        this.state.form.pageIndex = 1;//必须写0

        if (this.state.form.count < 1 || this.state.form.count > 20){
            PubSub.publish(SUBMITNOTICEERRORMESSAGE, '每页数量取值区间为 [1 - 20]');
            return ;
        }

        store.dispatch(ContractSaveSearchConditionAction(this.state.form));
        this.getDataFromServer(this.state.form);

    }

    getDataFromServer = (form)=>{
        axiosConfig.post(POSTCONTRACTSDATA, form).then(response => {
            store.dispatch(ContractsSaveDataFromServerAction(response.data));
        }).catch(error => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
    }
}

export default SearchContracts;
