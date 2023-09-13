import React, {Component} from 'react';
import './index.scss';
import EChartsReact from "echarts-for-react";
import optionOfInternetNodeState from "../../../echarts/internet/optionOfInternetNodeState";
import optionOfInternetCreditAndCoin from "../../../echarts/internet/optionOfInternetCreditAndCoin";
import axiosConfig from "../../../apis/axios.config";
import {GETINTERNETECHARTSDATE} from "../../../apis/routes";
import {SUBMITNOTICEERRORMESSAGE} from "../../../pubsub";

class InternetECharts extends Component {

    state = {
        firstOption: optionOfInternetNodeState,
        secondOption: optionOfInternetCreditAndCoin
    }

    componentDidMount() {

        this.getDataFromServer();

        this.itmer = setInterval(() => {
            this.getDataFromServer();
        }, 1000 * 600);
    }

    componentWillUnmount() {
        clearInterval(this.itmer);
    }

    getDataFromServer = ()=>{
        axiosConfig.get(GETINTERNETECHARTSDATE).then(response => {
            let credit = response.data.nodeCreditAndReputation.credit;
            let reputation = response.data.nodeCreditAndReputation.reputation;
            this.state.firstOption.series[0].data = response.data.nodesState;
            this.state.secondOption.xAxis[0].data = response.data.nodeCreditAndReputation.nodes;
            this.state.secondOption.series[0].data = credit;
            this.state.secondOption.series[1].data = reputation;

            this.setState(this.state, ()=>{
                this.eChartSecondRef.getEchartsInstance().setOption(this.state.secondOption);
                this.eChartFirstRef.getEchartsInstance().setOption(this.state.firstOption);
            })
        }).catch(error => {
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
    }

    render() {
        return (
            <div className={'internetEcharts'}>
                <div className={'echartsContainer'}>
                    <div className={'flex-layout'}>
                        <div className={'flex-item-3'}>
                            <EChartsReact
                                ref={element => this.eChartFirstRef = element}
                                option={this.state.firstOption}
                                lazyUpdate={true}
                                style={{width: '99%', height: 320}}
                            />
                        </div>
                        <div className={'flex-item-7'}>
                            <EChartsReact
                                ref={element => this.eChartSecondRef = element}
                                option={this.state.secondOption}
                                lazyUpdate={true}
                                style={{width: '94%', height: 320}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InternetECharts;