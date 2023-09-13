import React, {Component, Fragment} from 'react';
import './index.scss';

class DirectionProgress extends Component {
    render() {
        return (
            <Fragment>
                <div className={'line-progress'}>
                    <div className={'topButtonClick flex-layout '}>
                        <div className={'flex-item-2'}>
                            <div className={'fui-liner'}>

                            </div>
                            <div className='fui-font-center'>指令初始化</div>
                        </div>
                        <div className={'flex-item-2'}>
                            <div className={'fui-liner'}>

                            </div>
                            <div className='fui-font-center'>需求响应生成</div>
                        </div>
                        <div className={'flex-item-2'}>
                            <div className={'fui-liner'}>

                            </div>
                            <div className='fui-font-center'>等待需求响应完成</div>
                        </div>
                        <div className={'flex-item-2'}>
                            <div className={'fui-liner'}>

                            </div>
                            <div  className='fui-font-center'>结果评估</div>
                        </div>
                        <div className={'flex-item-2'}>
                            <div className={'fui-liner'}>

                            </div>
                            <div className='fui-font-center'>指令完成</div>
                        </div>
                    </div>
                </div>
                <div className='directionProgress'>
                    <div className='progress-outer'>
                        <div className='progress-inner'>
                            执行进度：60%
                        </div>
                        <div className='progress-inner-button flex-layout '>
                            <div className="circle-progress-button flex-item-2">
                                <span title='查看当前进度细节' ></span>
                            </div>
                            <div className="circle-progress-button flex-item-2">
                                <span title='查看当前进度细节' ></span>
                            </div>
                            <div className="circle-progress-button flex-item-2">
                                <span title='查看当前进度细节' ></span>
                            </div>
                            <div className="circle-progress-button flex-item-2">
                                <span title='查看当前进度细节' ></span>
                            </div>
                            <div className="circle-progress-button flex-item-2">
                                <span title='查看当前进度细节' ></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='progress-states-dashboard'>
                    <div className='progress-states-header'>
                        <div className='header-name'>
                            指令执行记录:
                        </div>
                    </div>
                    <div className={'direction-progress-state'}>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>指令初始化</span>
                                <span className={'state-time'}>2022/3/21 15:40:23</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    管理员李煜发布削峰指令, IPv4地址：145.115.42.15,目标：电荷2000kw.h！ 指令备注：按照上级要求，为了满足各地供电需要，而进行的电力平衡措施！请各位尽力配合，非常感谢大家的热心合作！
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>指令上链</span>
                                <span className={'state-time'}>2022/3/21 17:41:24</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    系统接收指令(削峰指令ACFD15239875， 编号: 452)，记录数据库，并存储于区块链中！
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>链上广播</span>
                                <span className={'state-time'}>2022/3/21 17:41:24</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    系统整理指令信息，并进行需求响应广播！
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>广播完成</span>
                                <span className={'state-time'}>2022/3/21 19:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    区块链网络中所有节点都已经确认收到广播信息！
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>智能调度</span>
                                <span className={'state-time'}>2022/3/21 19:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    正在根据算法进行智能调度，合理分配电荷量！
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>节点 AAAA4152 合同响应</span>
                                <span className={'state-time'}>2022/3/21 19:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    编号为：AAAA4152，地址为上海浦东新区陆家嘴环路958号华能联合大厦的节点接收响应指令，并生成合同编号为：4511, 预计减少电荷量：400kw.h！
                                    预计获得积分：41.5。
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>节点 AAAA116 合同响应</span>
                                <span className={'state-time'}>2022/3/21 19:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    编号为：	AAAA116，地址为上海市浦东新区国耀路209鲁能国际D座的节点接收响应指令，并生成合同编号为：4512, 预计减少电荷量：300kw.h！
                                    预计获得积分：29.1。
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>节点 AAAA115 合同响应</span>
                                <span className={'state-time'}>2022/3/21 19:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    编号为：	AAAA115，地址为上海浦东新区基隆路28号喜来登酒店的节点接收响应指令，并生成合同编号为：4513, 预计减少电荷量：450kw.h！
                                    预计获得积分：47.4。
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>节点 AAAA115 发布电力互济广播</span>
                                <span className={'state-time'}>2022/3/21 19:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    编号为：	AAAA115，地址为上海浦东新区基隆路28号喜来登酒店的节点接收响应指令，因为无法完成调控要求，发布发布电力互济广播！ 争取电力：300kw.h
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>电力互济响应情况</span>
                                <span className={'state-time'}>2022/3/21 19:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    <ol className={'padding-left-30px'}>
                                        <li>编号为:AAAC118的节点愿意提供电力：300kw.h 交换积分：45</li>
                                        <li>编号为:AAAC119的节点愿意提供电力：100kw.h 交换积分：10</li>
                                        <li>编号为:AAAC120的节点愿意提供电力：150kw.h 交换积分：19</li>
                                        <li>编号为:AAAC120的节点愿意提供电力：080kw.h 交换积分：07</li>
                                        <li>编号为:AAAC121的节点愿意提供电力：300kw.h 交换积分：50</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>节点 AAAA118 合同响应</span>
                                <span className={'state-time'}>2022/3/21 19:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    编号为：	AAAA114，地址为上海浦东新区基隆路28号喜来登酒店的节点接收响应指令，并生成合同编号为：4514, 预计减少电荷量：150kw.h！
                                    预计获得积分：17.4。
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>节点 AAAA115 电力互济广播响应完成</span>
                                <span className={'state-time'}>2022/3/21 19:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    编号为：	AAAC118，地址为上海浦东新区基隆路27号广大大厦的节点接收响应指令，并生成合同编号为：5514。
                                    AAAC118 给与 AAAA115 300kw.h 电荷。并从 AAAA115 获得积分：45！ AAAA115积分减少 46！ 手续费积分为：1。
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>合同生成完成</span>
                                <span className={'state-time'}>2022/3/21 19:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    共生成合同：10份，参与节点：9个，发出积分:357.2！
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state-finish glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>签署完成</span>
                                <span className={'state-time'}>2022/3/21 19:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    成功签署合同：10份！失败：0！
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'state glyphicon glyphicon-ok'}></span>
                                <span className={'state-title'}>等待需求响应完成</span>
                                <span className={'state-time'}>2022/3/23 14:58:57</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    需求合同执行中，等待执行完成！
                                </div>
                            </div>
                        </div>
                        <div className={'pro-state-line'}>
                            <div className={'pro-state-title'}>
                                <span className={'waiting-state'}>16</span>
                                <span className={'state-title'}>等待执行</span>
                                <span className={'state-time'}>...</span>
                            </div>
                            <div className='pro-state-detail showLine '>
                                <div className='pro-text'>
                                    等待指令进度进一步推进中...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default DirectionProgress;