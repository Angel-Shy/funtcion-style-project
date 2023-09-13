import React, {Component} from 'react';
import './index.scss';
import running from  '../../../static/imgs/old/blockrunning.gif'
import EChartsReact from "echarts-for-react";
import axiosConfig from "../../../apis/axios.config";
import {GETBLOCKCHAINSYSYTEMSTATE} from "../../../apis/routes";
import {SUBMITNOTICEERRORMESSAGE, SUBMITNOTICEGETITERNETNODEINFO, UPDATENETWORKSTATE} from "../../../pubsub";
import PubSub from 'pubsub-js';
import BuildingNodeInfo from "./BuildingNodeInfo";

function blockchainInitChartsFirst(nodes = []) {
    const strings = ['聚合商', ...nodes]

    const datas = strings.map(string => {
        return {
            name: string,
            symbolSize:68,
            category: string === '聚合商' ? '0' : '1',
            itemStyle: {
                color: '#112a59'
            },
            label: {
                show: true,
                color: 'white'
            },
            tooltip: {
                formatter: (params) => {
                    return `
                      <div style="text-align:left">
                            <h3>详情</h3>
                      </div>
                      节点编号: ${params.name}</br> 
                      详情请点击查看</br>
                    `
                }
            }
        }
    })
    const linkData = []


    //聚合商连接其他的所有

    for (let i = 1; i < strings.length; i++) {
        linkData.push({
            source: '聚合商',
            target: strings[i],
            value: i,
            lineStyle: {
                width: 1,
                curveness: 0
            }
        })
    }

    strings.reduce((prev, cur, index ,ay) => {
        linkData.push({
            source: prev,
            target: cur,
            value: index,
            lineStyle: {
                width: 2,
                curveness: 0
            }
        });
        return cur;
    });



    const option = {
        title: {
            left: 'center',
            text: '楼宇图节点网络图',
            subtext: '每10分钟侦测一次节点状态',
            textStyle:{
                color:'white'
            },
            subtextStyle:{
                color:'white'
            }
        },
        grid:{
            top:"5%"
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        animation: false,
        series: [{
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 600,
                edgeLength: 100,
                layoutAnimation: false
            },
            edgeLabel: {
                verticalAlign: 'bottom',
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 12,
                        color: '#334B5C'
                    },
                    formatter: ''
                }
            },
            roam: false,
            label: {
                normal: {
                    show: true
                }
            },
            data: datas,
            links: linkData,
            categories: [{
                name: '0',
                symbolSize: 100
            }, {
                name: '1',
                symbolSize: '20'
            }],
            lineStyle:{

            }
        }]
    }
    return option;
}


class BlockEcharts extends Component {



    updateData = () => {
        axiosConfig.get(GETBLOCKCHAINSYSYTEMSTATE).then( response => {
            console.log(response);
            this.state.blockNet = response.data.blockNet;
            this.state.options = blockchainInitChartsFirst(response.data.nodes);
            this.setState({...this.state}, () => {
                this.eChartSecondRef.getEchartsInstance().on('click', (params) => {
                    if (params.dataIndex == 0){
                        alert(' 聚合商信息不做查询！');
                    }else{
                        {/* 让展示楼宇节点信息的组件进行更新 */}
                        PubSub.publish(SUBMITNOTICEGETITERNETNODEINFO, params);
                    }
                });
            } );
        }).catch(error => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
    }

    token = null;

    componentDidMount() {
        this.updateData();
        this.token = PubSub.subscribe(UPDATENETWORKSTATE, (msg, data )=>{
            this.updateData();
        });


        this.itmer = setInterval(() => {
            this.updateData();
        }, 1000 * 600);
    }

    componentWillUnmount() {
        /*  组件消失就取消订阅 */
        PubSub.unsubscribe(this.token);
        clearInterval(this.itmer);
    }
    state = {
        blockNet:{
            netState:"...",
            online: 0,
            allNode: 0,
            offLineNode: 0,
            number: 0,
            dayBlocks: 0, /* 今日产生区块量 */
            weekBlocks: 0, /* 本周产生区块量 */
            mathematic: "加载中...",
            TPS: '加载中...',  /* 额标TPS */
            Hash: '加载中...', /* 信息摘要算法 */
        },
        options: blockchainInitChartsFirst()
    }

    onEvents  = {
        'click': this.onChartClick
    }

    onChartClick = (param)=> {
        alert('??');
        console.log(param);
    }
    render() {
        let net = this.state.blockNet;
        return (
            <div className="blockEChartDashboard flex-layout">
                <div className="flex-item-3 internet-states">
                    <div className="block-internet-states-left">
                        <div className="system-running">
                            <div>
                                <span className="item">网络状态:</span>
                                <span className="item-state">{net.netState}
                                    <img src={running} alt="" width="20"
                                         style={{verticalAlign: 'middle'}} />
                                </span>
                            </div>
                            <div><span className="item">在线节点:</span> <span className="item-state">{net.online}</span></div>
                            <div><span className="item">全部节点:</span> <span className="item-state">{net.allNode}</span></div>
                            <div><span className="item">离线节点:</span> <span className="item-state">{net.offLineNode}</span></div>
                            <div><span className="item">区块高度:</span> <span className="">{net.number}</span></div>
                            <div><span className="item">今日产生区块量:</span> <span className="item-state">{net.dayBlocks}个新生区块</span></div>
                            <div><span className="item">本周产生区块量:</span> <span className="item-state">{net.weekBlocks}个新生区块</span>
                            </div>
                            <div><span className="item">共识算法:</span> <span className=" item-state ">{net.mathematic}</span>
                            </div>
                            <div><span className="item" title="TPS 即Transactions Per Second的缩写，每秒处理的事务数目">额标TPS:</span>
                                <span className="item-state">{net.TPS}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-item-8 ">
                    <div className={'blockEChartFirst'} style={{width: 500, height:600}}>
                        <EChartsReact
                            ref={element => this.eChartSecondRef = element}
                            option={this.state.options}
                            lazyUpdate={true}
                            onEvent={this.onEvents}
                            style={{width: '100%', height: '100%'}}
                        />
                    </div>
                </div>
                <div className="flex-item-4 internet-states" >
                    <div className="internet-states-title">
                        楼宇节点详情
                    </div>
                    <BuildingNodeInfo/>
                </div>
            </div>
        );
    }
}

export default BlockEcharts;