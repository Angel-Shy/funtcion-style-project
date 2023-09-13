import React, {Component} from 'react';
import EChartsReact from "echarts-for-react";
import optionOfElectricityResourceChart from "../../../../echarts/direction/optionOfElectricityResourceChart";
import optionDirectionTypeDistribution from "../../../../echarts/direction/optionDirectionTypeDistribution";
import DashBoardTransaction from "../../../FrontIndex/DashBoardTransaction";
import axiosConfig from "../../../../apis/axios.config";
import {GET_DIRECTION_TYPE, GET_DIRECTION_ELECTRIC} from  "../../../../apis/routes";
import {SUBMITNOTICEERRORMESSAGE} from "../../../../pubsub";

class AdjustableElectricityResourceChart extends Component {

    state={
        barOption: optionOfElectricityResourceChart,
        pieOption:optionDirectionTypeDistribution
    }

    componentDidMount() {
        axiosConfig.get(GET_DIRECTION_TYPE).then(response => {

            this.state.pieOption.series[0].data = response.data.data;
            this.setState({...this.state}, () => {
                this.echartPieRef.getEchartsInstance().setOption(this.state.pieOption);
            });
        }).catch(error => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });


        axiosConfig.get(GET_DIRECTION_ELECTRIC).then(response => {

            this.state.barOption.xAxis.data = response.data.nodes;
            this.state.barOption.series[0].data = response.data.acceptableValue;
            this.setState({...this.state}, () => {
                this.echartBarRef.getEchartsInstance().setOption(this.state.barOption);
            });
        }).catch(error => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
    }

    render() {
        return (
            <div className={'adjustableElectricityResourceChart'}>
                <div>
                    <DashBoardTransaction/>
                </div>
                <div className={'flex-layout'}>
                   <div className={'flex-item-4'}>
                       <EChartsReact
                           ref={element => this.echartPieRef = element}
                           option={this.state.pieOption}
                           lazyUpdate={true}
                           style={{width: '99%', height: 420}}
                       />
                   </div>
                   <div className={'flex-item-8'}>
                       <div className={'resourceChart'}>
                           <EChartsReact
                               ref={element => this.echartBarRef = element}
                               option={this.state.barOption}
                               lazyUpdate={true}
                               style={{width: '99%', height: 420}}
                           />
                       </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default AdjustableElectricityResourceChart;
