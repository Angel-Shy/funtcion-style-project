import React, {Component} from 'react';
import {GETELECTRICANDCO2REDUCESTATE} from "../../../../apis/routes";
import optionOfCarbonEmissionsAndCharge from "../../../../echarts/optionOfCarbonEmissionsAndCharge";
import EChartsReact from "echarts-for-react";
import axiosConfig from "../../../../apis/axios.config";
import PubSub from 'pubsub-js';
import {SUBMITNOTICEERRORMESSAGE} from  '../../../../pubsub';


class SystemElectricAndCO2 extends Component {

    state = {
        option:optionOfCarbonEmissionsAndCharge
    }

    componentDidMount() {
        axiosConfig.get(GETELECTRICANDCO2REDUCESTATE).then(response => {
            this.state.option.series[0].data = response.data.co2;
            this.state.option.series[1].data = response.data.electric;
            this.setState(this.state, ()=>{
                this.echartRef.getEchartsInstance().setOption(this.state.option);
            });
        }).catch(error=>{
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        })
    }

    render() {
        return (
            <div className='grow systemElectricAndCO2'>
                <EChartsReact
                    ref={element => this.echartRef = element}
                    option={this.state.option}
                    lazyUpdate={true}
                    style={{width: '99%', height: 320}}
                />
            </div>
        );
    }
}

export default SystemElectricAndCO2;