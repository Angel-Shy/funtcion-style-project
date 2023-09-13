import React, {Component} from 'react';
import './index.scss';
import PubSub from 'pubsub-js';
import store from "../../../redux/store";
import {BlockChainSaveDataFromServerAction, BlockChainSaveSearchConditionAction} from "../../../redux/blockChainAction";
import {POSTBLOCKCHAINDATA} from '../../../apis/routes';
import axiosConfig from "../../../apis/axios.config";
import {SUBMITNOTICEERRORMESSAGE} from "../../../pubsub";

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
    for(let k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

class SearchBlock extends Component {

    state ={
        form:{
            blockIndex:'-1',
            blockHash:'',
            pageIndex:1,
            count: 12,
            startDateTime: new Date(0).format('yyyy-MM-ddThh:mm'),
            endDateTime: new Date(Date.now()).format('yyyy-MM-ddThh:mm'),
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
            <div className={'searchBlockFUI'}>
                <form action="" onSubmit={this.submitForm} >
                    <div className="form-line-mix">
                        <span className="itemLen">区块索引：</span>
                        <input className="myInputLong" type="number"  placeholder={"默认查询所有"}  onChange={this.setFormValue('blockIndex')} value={this.state.form.blockIndex} />
                    </div>
                    <div className="form-line-mix">
                        <span className="itemLen">区块头Hash值：</span>
                        <input className="myInputLong" type="text"  placeholder={"默认查询所有"}  onChange={this.setFormValue('blockHash')} value={this.state.form.blockHash} />
                    </div>
                    <div className="form-line-mix">
                        <span className="itemLen">开始时间：</span>
                        <input type="datetime-local"
                               onChange={this.setFormValue('startDateTime')}
                               value={this.state.form.startDateTime}
                               className="myinput"
                               ref={el => this.startElement = el} />
                        <span className="itemAfterLen">结束时间：</span>
                        <input className="myinput"   onChange={this.setFormValue('endDateTime')} value={this.state.form.endDateTime} type="datetime-local"  ref={el => this.endElement = el} />
                        <button onClick={this.submitForm} className="margin-left-20px  FUIButton FUI-btnBlack "> <span className={'glyphicon-search glyphicon'}/> 立即进行检索</button>
                    </div>
                </form>
            </div>
        );
    }

    submitForm = (e) => {
        e.preventDefault();
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

        this.state.form.pageIndex = 1;//必须写0
        store.dispatch(BlockChainSaveSearchConditionAction(this.state.form));
        this.getDataFromServer(this.state.form);
    }

    componentDidMount() {
        store.dispatch(BlockChainSaveSearchConditionAction(this.state.form));
        this.getDataFromServer(this.state.form);
    }

    getDataFromServer = (form)=>{
        axiosConfig.post(POSTBLOCKCHAINDATA, form).then(response => {
            console.log('first form');
            console.log(form);
            store.dispatch(BlockChainSaveDataFromServerAction(response.data));
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

export default SearchBlock;
