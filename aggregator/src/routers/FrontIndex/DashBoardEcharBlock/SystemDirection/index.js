import React, {Component} from 'react';
import optionOfDirectionImplement from '../../../../echarts/optionOfDirectionImplement';
import ReactEcharts from 'echarts-for-react';
import {GETDADIRECTIONIMPLEMENTSTATE} from "../../../../apis/routes";
import axiosConfig from "../../../../apis/axios.config";
import {SUBMITNOTICEERRORMESSAGE} from '../../../../pubsub';

class SystemDirection extends Component {

    state = {
        isImplementDirection: false,
        joinNodes: 0,
        startDateTime:'未开始',
        directionName:'',
        eChartOption: optionOfDirectionImplement,
        isLoading:false,
    }
    componentDidMount() {
        /*请求数据*/
        axiosConfig.get(GETDADIRECTIONIMPLEMENTSTATE).then(response => {
            if (response.data.isImplementDirection){
                this.state.isImplementDirection = response.data.isImplementDirection;
                this.state.joinNodes = response.data.joinNodes;
                this.state.startDateTime = response.data.startDateTime;
                this.state.directionName = response.data.directionName;
                this.state.eChartOption.series.data[0].value =response.data.progressValue;
                this.state.eChartOption.series.data[1].value =100 - response.data.progressValue;
                this.state.isLoading = true;
                this.setState(this.state);
            }else {
                this.state.isLoading = true;
                this.setState(this.state);
            }
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
            <div className='quiescence systemDirection'>
                <div className="code">
                    <span className="item">正在执行指令:</span>
                    <span> <a href="#">{this.state.isImplementDirection?this.state.directionName:'暂时没有可执行指令...'}</a> </span>
                </div>
                <div className="code">
                    <span className="item">参与楼宇数量：</span>
                    <span> <a href="#">{this.state.joinNodes} 个节点</a> </span>
                </div>
                <div className="code">
                    <span className="item">开始时间：</span>
                    <span> <a href="#">{this.state.startDateTime}</a> </span>
                </div>
                <div className="echart-progress-loading-direction">
                    {this.state.isLoading?
                        <ReactEcharts
                            ref={(e) => {this.echartRef  = e;}}
                            className={'init-echart-progress-loading-direction'}
                            option = {this.state.eChartOption}
                            lazyUpdate={true}
                            style={{height: 220, width:220}}
                        />:''
                    }

                </div>
            </div>
        );
    }
}

SystemDirection.propTypes = {

};

export default SystemDirection;