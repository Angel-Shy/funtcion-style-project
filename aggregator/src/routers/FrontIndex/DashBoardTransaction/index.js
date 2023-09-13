import React, {Component} from 'react';
import axiosConfig from "../../../apis/axios.config";
import {GETSYSTEMTRADE} from "../../../apis/routes";
import PubSub from 'pubsub-js';
import {SUBMITNOTICEERRORMESSAGE} from "../../../pubsub";

class DashBoardTransaction extends Component {

    componentDidMount(){


        this.timer = setInterval(()=>{
            this.setState({nowTime: new Date(Date.now()).toLocaleString()})
        }, 1000);

        axiosConfig.get(GETSYSTEMTRADE).then(rep => {
            this.setState({
                ...rep.data,
                isGetNewDate: true
            });
        }).catch(error => {
            if (error.response){
                if (error.response.data.message == null){
                    PubSub.publish(SUBMITNOTICEERRORMESSAGE, '服务器错误！');
                }else{
                    PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
                }
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        })
    }


    componentWillUnmount(){
        clearInterval(this.timer);
    }

    state = {
        isGetNewDate: false,
        nowTime: new Date(Date.now()).toLocaleString(),
        electric: { value:0, unit: 'kw.h' },  /* 当前所有节点可接收调控电力总和 */
        trade: {value: 0},  /* 今日新增交易笔数 */
        credit: 0, /* 今日积分发出量 */
        electricTrade: 0, /* 今日电荷成交量 */
        creditPrice: 0,  /* 积分/100kw.h [当前价格]  */
        companys: 0  /* 默认接收调控的单位数量之和 */
    }

    render() {
        return (
            <div className='dashBoardTransaction_frontIndex'>
                {this.state.isGetNewDate?
                    <div className='resourceState'>
                        <div className='priceCredit'>
                            <div className='headerDetail'>
                                <span className='dateTime'>{this.state.nowTime}</span>
                                <span className='isOnline'>电力调控交易</span>
                            </div>
                            <div className='price'>
                                <span className='value'>{this.state.electric.value}</span>
                                <span className='rate'>{this.state.electric.unit} [当前所有节点可接收调控电力总和]</span>
                                <span className='dealNumber'>{this.state.trade.value}</span>
                                <span className='dealNumberUnit'>笔</span>
                                <span className='deal'>[今日新增交易笔数]</span>
                                <span className='creditNumber'>{this.state.credit}</span>
                                <span className='credit'>积分 [今日积分发出量]</span>
                                <span className='electronicNumber'>{this.state.electricTrade}</span>
                                <span className='electronicNumberUnit'>{this.state.electric.unit}</span>
                                <span className='electronic'>[今日电荷成交量]</span>
                            </div>
                        </div>
                        <div className='states-line '>
                            <div className='flex-item-5'>
                                <div className='state float-layout'>
                                    <div className='state-main float-left'>
                                        <span className='value'>{this.state.creditPrice}</span>
                                        <span className='unit'>  </span>
                                        <span className='detail'>积分/100kW [最近价格]</span>
                                    </div>
                                    <div className='state-main float-left'>
                                        <span className='value'>{this.state.companys}</span>
                                        <span className='unit'>家</span>
                                        <span className='detail'>[默认接收调控的单位数量之和]</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :""}

            </div>
        );
    }
}

export default DashBoardTransaction;