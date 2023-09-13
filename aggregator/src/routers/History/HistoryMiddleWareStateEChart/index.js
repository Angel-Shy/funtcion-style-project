import React, {Component} from 'react';
import HistoryEChart from "./HistoryEChart";
import input from "../../../static/imgs/history/electric.png";
import bi from "../../../static/imgs/history/bi.png";
import contract from "../../../static/imgs/old/recordbook.svg";
import progress_ from "../../../static/imgs/history/progress.png";
import './index.scss';
import HistoryCalendar from "./HistoryCalendar";
import axiosConfig from "../../../apis/axios.config";
import {GETDIRECTIONPROGRESS} from "../../../apis/routes";
import PubSub from "pubsub-js";
import {SUBMITNOTICEERRORMESSAGE} from "../../../pubsub";

class HistoryMiddleWareStateEChart extends Component {

    state = {
        directionCarryHistory:{
            coin:0,
            contractCount: 0,
            progress: 0,
            valueElectric: 0
        }
    }

    getDataFromServer = ()=>{
        axiosConfig(GETDIRECTIONPROGRESS, {
            params:{
                index: this.props.direction.index
            }
        }).then( res =>{
            this.state.directionCarryHistory = res.data;
            this.setState({...this.state});
        }).catch(error => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        })
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {
        return (
            <div className={'FUIContent'}>
                <div className={'historyDashBoard flex-layout'}>
                    <div className="flex-item-2">
                        <div className='line-header'>
                            指令执行状态:
                        </div>
                        <div className={'history-container flex-layout'}>
                            <div className={'line-history flex-item-2'}>
                                <figure>
                                    <img src={input} alt="电荷输入" title='下发指定需要调控的电量' />
                                    <p>电荷量</p>
                                    <p> <span className='value'>{this.state.directionCarryHistory.valueElectric}</span> <span className='unit'>kw</span> </p>
                                </figure>
                            </div>
                            <div className={'line-history flex-item-2'}>
                                <figure>
                                    <img src={bi} alt="积分输出" title='下发指定需要调控的电量' />
                                    <p>积分</p>
                                    <p> <span className='value'>{this.state.directionCarryHistory.coin??0}</span> <span className='unit'>个</span> </p>
                                </figure>
                            </div>
                            <div className={'line-history flex-item-2'}>
                                <figure>
                                    <img src={contract} alt="生成合同数量" title='下发指定需要调控的电量' />
                                    <p>合同数量</p>
                                    <p> <span className='value'>{this.state.directionCarryHistory.contractCount}</span> <span className='unit'>份</span> </p>
                                </figure>
                            </div>
                            <div className={'line-history flex-item-2'}>
                                <figure>
                                    <img src={progress_} alt="成功签署" title='下发指定需要调控的电量' />
                                    <p>执行进度</p>
                                    <p> <span className='value'>{this.state.directionCarryHistory.progress}</span> <span className='unit'>%</span> </p>
                                </figure>
                            </div>
                        </div>
                        <div className='history-detail'>
                            指令创建时间为：<code>{this.props.direction.createTime}</code>
                            开始执行时间:<code>{this.props.direction.carryOutTime}</code>
                            预计结束时间：<code>{this.props.direction.endTime}</code>
                        </div>
                    </div>
                    <div className="flex-item-5">
                        <HistoryEChart directionID={this.props.direction.index} />
                    </div>
                    <div className="flex-item-3">
                        <HistoryCalendar direction = {this.props.direction} />
                    </div>
                </div>
                <div className={'historyProgressShow'}>
                    <div className={'HPSHeader'}>
                        指令执行进度条
                    </div>
                    <div className={'history-progress-bar'}>
                        <div className={'history-progress-outer'}>
                            <div className='history-progress-inner' style={{width: `${this.state.directionCarryHistory.progress}%`}} >
                                执行进度：{this.state.directionCarryHistory.progress}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HistoryMiddleWareStateEChart;
