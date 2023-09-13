import React, {Component} from 'react';
import point from '../../../../static/imgs/old/圆点.svg';
import loading from '../../../../static/imgs/old/loading.gif';
import building from '../../../../static/imgs/old/company.png';
import contract from '../../../../static/imgs/old/合同.svg';
import blockChain from '../../../../static/imgs/old/区块链.svg';
import axios from "../../../../apis/axios.config";
import {GETSYSTEMSTATE} from "../../../../apis/routes";
import PubSub from "pubsub-js";
import {SUBMITNOTICEERRORMESSAGE} from "../../../../pubsub";

class SystemRunning extends Component {

    state = {
        systemState:'加载中...',
        internetStateMark:'加载中...',
        company:'加载中...',
        contracts:'加载中...',
        createNewestDate:'加载中...',
        blocks:'加载中...'
    }

    componentDidMount() {
        axios.get(GETSYSTEMSTATE).then(response=>{
            this.setState(response.data);
        }).catch(error => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        })
    }


    render() {
        return (
            <div className="quiescence systemRunning">
                <div>
                    <img src={point} alt="" width="20px"/>
                    <span className="item">系统状态:</span>
                    <span className="item-state" style={{fontWeight:600}} >{this.state.systemState}</span>
                    <img src={loading} width="20px" alt=""/>
                </div>
                <div>
                    <img src={point} alt="" width="20px"/>
                    <span className="item">最新区块生成时间:</span>
                    <span className="item-state">{this.state.createNewestDate}</span>
                </div>
                <div>
                    <img src={point} alt="" width="20px"/>
                    <span className="item">网络状态:</span>
                    <span className="item-state">{this.state.internetStateMark}</span>
                </div>
                <div>
                    <img src={point} alt="" width="20px"/>
                    <span className="item">聚合商单位:</span>
                    <span className="item-state">{this.state.company}</span>
                    <img src={building} width="20px" alt=""/></div>
                <div>
                    <img src={point} alt="" width="20px"/>
                    <span className="item">今日产生合同数量:</span>
                    <span className="item-state">{this.state.contracts}份合同</span>
                    <img src={contract} width="20px" alt=""/></div>
                <div>
                    <img src={point} alt="" width="20px"/>
                    <span className="item">今日生成区块:</span>
                    <span className="item-state">{this.state.blocks}个区块</span>
                    <img src={blockChain} width="20px" alt=""/></div>
            </div>
        );
    }
}

export default SystemRunning;