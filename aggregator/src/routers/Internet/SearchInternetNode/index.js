import React, {Component} from 'react';
import './index.scss';
import Select from "../../../components/form/select";
import store from "../../../redux/store";
import {InternetSaveDataFromServerAction,InternetSaveSearchConditionAction} from '../../../redux/internetAction'
import axiosConfig from "../../../apis/axios.config";
import {POSTINTERNETNODESDATA} from "../../../apis/routes";
import {SUBMITNOTICEERRORMESSAGE} from "../../../pubsub";

class SearchInternetNode extends Component {

    state = {
        selectOption:{
            nodeState:[
                {value: 0, name:'所有节点'},
                {value: 1, name:'在线节点'},
                {value: 2, name:'离线节点'},
            ],
            selectSort:[
                {value: 0, name:'默认排序'},
                {value: 1, name:'节点状态'},
                {value: 2, name:'拥有积分'},
                {value: 3, name:'拥有信誉分'},
                {value: 4, name:'IP地址'},
            ],
            sortType:[
                {value: 0, name:'默认排序'},
                {value: 1, name:'升序'},
                {value: 2, name:'降序'},
            ]
        },
        form:{
            nodeState: 0,
            ipAddress:'',
            realAddress:'',
            phone:'',
            creditMore:0,
            creditLess:5000,
            reputationMore:0,
            reputationLess:1000,
            sortOne: 0,
            sortTwo:0,
            sortType: 0,
            count:10,
            pageIndex:1
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

    render() {
        return (
            <div className={'searchInternetNode'}>
                <form action="">
                    <div className="form-line-mix">
                        <span className="item">节点状态：</span>
                        <Select sendData={this.getState('nodeState')} options={this.state.selectOption.nodeState} />
                        <span className="itemAfter">网络IP地址：</span>
                        <input type="text" placeholder={'默认查询所有'} className="myinput" onChange={this.setFormValue('ipAddress')} value={this.state.form.ipAddress} />
                        <span className="itemAfter">实际地址：</span>
                        <input className="myinput"
                               onChange={this.setFormValue('realAddress')} value={this.state.form.realAddress}
                               placeholder={'默认查询所有'} type="text" />
                    </div>
                    <div className="form-line-mix ">
                        <span className="item">节点积分大于：</span>
                        <input type="number" onChange={this.setFormValue('creditMore')} value={this.state.form.creditMore} className="myinput"/>
                        <span className="itemAfter">小于：</span>
                        <input type="number" onChange={this.setFormValue('creditLess')} value={this.state.form.creditLess} className="myinput"/>
                        <span className="itemAfter">负责人电话：</span>
                        <input className="myinput" placeholder={'默认查询所有'} onChange={this.setFormValue('phone')} value={this.state.form.phone} type="number" />
                    </div>
                    <div className="form-line-mix ">
                        <span className="item">节点信誉大于：</span>
                        <input type="number" onChange={this.setFormValue('reputationMore')} value={this.state.form.reputationMore} className="myinput" />
                        <span className="itemAfter">小于：</span>
                        <input type="number" onChange={this.setFormValue('reputationLess')} value={this.state.form.reputationLess} className="myinput"/>
                        <span className="itemAfter">每页数据：</span>
                        <input className="myinput" onChange={this.setFormValue('count')} value={this.state.form.count} type="number" />
                    </div>
                    <div className="form-line-mix ">
                        <span className="item">排序1：</span>
                        <Select sendData={this.getState('sortOne')} options={this.state.selectOption.selectSort} />
                        <span className="itemAfter">排序2：</span>
                        <Select sendData={this.getState('sortOne')} options={this.state.selectOption.selectSort} />
                        <span className="itemAfter">排序方式：</span>
                        <Select sendData={this.getState('sortType')} options={this.state.selectOption.sortType} />
                        <button onClick={this.submitForm} className="margin-left-20px  FUIButton FUI-btnBlack ">
                            <span className={'glyphicon glyphicon-search'}></span>
                            立即进行检索
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    submitForm = (e) => {
        e.preventDefault();//先别提交

        if (this.state.form.count < 5){
            PubSub.publish(SUBMITNOTICEERRORMESSAGE, '每页数量必须大于5条');
            return ;
        }

        this.state.form.pageIndex = 1;//必须写1
        store.dispatch(InternetSaveSearchConditionAction(this.state.form));
        this.getDataFromServer(this.state.form);

    }

    componentDidMount() {
        store.dispatch(InternetSaveSearchConditionAction(this.state.form));
        this.getDataFromServer(this.state.form);
    }

    getDataFromServer = (form)=>{
        axiosConfig.post(POSTINTERNETNODESDATA, form).then(response => {
            store.dispatch(InternetSaveDataFromServerAction(response.data));
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

export default SearchInternetNode;