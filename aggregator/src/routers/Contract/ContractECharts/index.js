import React, {Component} from 'react';
import './index.scss';
import optionOfTransactionType from "../../../echarts/constract/optionOfTransactionType";
import optionOfTransactionVolumeMonitoring from "../../../echarts/constract/optionOfTransactionVolumeMonitoring";
import optionOfRecentTransactionMonitoring from "../../../echarts/constract/optionOfRecentTransactionMonitoring";
import EChartsReact from "echarts-for-react";
import axiosConfig from "../../../apis/axios.config";
import {GETCONTRACTECHART} from '../../../apis/routes'
import {SUBMITNOTICEERRORMESSAGE} from '../../../pubsub'

class ContractECharts extends Component {

    state = {
        firstOption: optionOfTransactionType,
        secondOption:optionOfTransactionVolumeMonitoring,
        thirdOption:optionOfRecentTransactionMonitoring
    }

    componentDidMount() {
        axiosConfig.get(GETCONTRACTECHART).then(response => {
            this.state.firstOption.series[0].data = response.data.transactionType;
            this.state.secondOption.series[0].data = response.data.transactionVolume.total;
            this.state.secondOption.series[1].data = response.data.transactionVolume.month;
            this.state.thirdOption.series[0].data = response.data.recentTransaction.requirement;
            this.state.thirdOption.series[1].data = response.data.recentTransaction.credit;
            this.state.thirdOption.series[2].data = response.data.recentTransaction.electric;
            this.setState(this.state, ()=>{
                this.eChartFirstRef.getEchartsInstance().setOption(this.state.firstOption);
                this.eChartSecondRef.getEchartsInstance().setOption(this.state.secondOption);
                this.eChartThirdRef.getEchartsInstance().setOption(this.state.thirdOption);
            })
        }).catch(error => {
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message??"服务器未说明错误！");
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
    }

    render() {
        return (
            <div className={'flex-layout contractECharts'}>
                <div className={'flex-item-4'}>
                    <EChartsReact
                        ref={element => this.eChartFirstRef = element}
                        option={this.state.firstOption}
                        lazyUpdate={true}
                        style={{width: '99%', height: 340}}
                    />
                </div>
                <div className={'flex-item-4'}>
                    <EChartsReact
                        ref={element => this.eChartSecondRef = element}
                        option={this.state.secondOption}
                        lazyUpdate={true}
                        style={{width: '99%', height: 340}}
                    />
                </div>
                <div className={'flex-item-4'}>
                    <EChartsReact
                        ref={element => this.eChartThirdRef = element}
                        option={this.state.thirdOption}
                        lazyUpdate={true}
                        style={{width: '99%', height: 340}}
                    />
                </div>
            </div>
        );
    }
}

export default ContractECharts;