import React, {Component, Fragment} from 'react';
import './index.scss';
import HistoryLifeStage from "./HistoryLifeStage";
import axiosConfig from "../../../apis/axios.config";
import {GETDIRECTIONLIFE} from "../../../apis/routes";
import PubSub from "pubsub-js";
import {SUBMITNOTICEERRORMESSAGE} from "../../../pubsub";

class Index extends Component {

    state = {
        active:[true, false, false, false, false,false, false, false, false,false, false, false],
        life:["指令初始化","指令上链","链上广播","广播完成","智能调度","需求响应生成","合同上链","磋商阶段","等待需求响应完成","需求响应执行完毕","响应结果评估","积分发放","信誉分发放","指令完成"],
        stageLife: []
    }

    showMe = index => {
        return (e) => {
            if (this.state.stageLife.length > 0){
                this.state.active.fill(false);
                this.state.active[index] = true;
                this.setState(this.state)
            }
        }
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    getDataFromServer = ()=>{
        axiosConfig.get(GETDIRECTIONLIFE, {
            params:{
                index: this.props.directionID
            }
        }).then(  res => {
            this.state.stageLife = res.data.life;
            this.setState({});
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
            <Fragment>
                <div className={'direction-life-circle'}>
                    <ul className='tabs float-layout' >
                        {this.state.life.map((v,idx)=> {
                            return <li key={idx} onClick={this.showMe(idx)} className={this.state.active[idx]?'active':''} >
                                <span>{v}</span>
                            </li>
                        })}
                    </ul>
                    <div className='tabContent'>
                        {
                            this.state.stageLife.map((stage, idx) => {
                                return <div key={idx}  className={this.state.active[idx]?'':'disappear'}>
                                    <HistoryLifeStage lifeStage={stage} />
                                </div>
                            })
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Index;