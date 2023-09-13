import React, {Component} from 'react';
import floor from '../../../static/imgs/old/楼房.svg';
import electric  from '../../../static/imgs/old/electronic.svg';
import co2 from '../../../static/imgs/old/二氧化碳.svg';
import score from '../../../static/imgs/icon/credit1.png';
import block from '../../../static/imgs/icon/block.svg';
import {GETDASHBOARDSTATE} from "../../../apis/routes";
import axiosConfig from "../../../apis/axios.config";
import PubSub from "pubsub-js";
import {SUBMITNOTICEERRORMESSAGE} from "../../../pubsub";


class DashBoardShow extends Component {
    state = {
        nodes: {
            online: 0,
            total:0
        },
        charge:{
            unit:'kW',
            number:0
        },
        co2:{
            unit: '公斤',
            number: 0
        },
        credit:{
            unit:'值',
            number:0
        },
        blocks:{
            unit:'块',
            number:0
        },
    }

    componentDidMount() {
        axiosConfig.get(GETDASHBOARDSTATE).then(response => {
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
            <div className="dashboard-show">
                <div title='点击更新数字..' >
                    <div className="img">
                        <img src={floor} alt=""/>
                    </div>
                    <div className="number">
                        <div>节点在线/总数</div>
                        <div>
                            <button className='button-default'>
                                {this.state.nodes.online}/{this.state.nodes.total}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="img">
                        <img src={electric} alt=""/>
                    </div>
                    <div className="number">
                        <div>已节约电荷</div>
                        <div>
                            <button className='button-default'>
                                {this.state.charge.number.toPrecision(9)} {this.state.charge.unit}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="img">
                        <img src={co2} alt=""/>
                    </div>
                    <div className="number">
                        <div>减少碳排放</div>
                        <div>
                            <button className='button-default'>
                                {this.state.co2.number.toPrecision(9)} {this.state.co2.unit}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="img">
                        <img src={score} alt=""/>
                    </div>
                    <div className="number">
                        <div>区块链积分总量</div>
                        <div>
                            <button className='button-default'>
                                {this.state.credit.number.toPrecision(9)}{this.state.credit.unit}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="img">
                        <img src={block} alt=""/>
                    </div>
                    <div className="number">
                        <div>区块链高度</div>
                        <div>
                            <button className='button-default'>
                                {this.state.blocks.number.toPrecision(9)}{this.state.blocks.unit}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default DashBoardShow;