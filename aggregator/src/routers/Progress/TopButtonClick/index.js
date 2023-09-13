import React, {Component, Fragment} from 'react';
import './index.scss';
import {Link} from "react-router-dom";

class Index extends Component {
    render() {
        return (
            <Fragment>
                <div className={'topDirectionDetail'}>
                    <div className='flex-layout'>
                        <div className="flex-item-3">
                            <div className='direction-detail'>
                                <div className='line'>
                                    <span className='item'>
                                        指令简述:
                                    </span>
                                    <span className='item-state'>削峰指令ACCFD15239875</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-item-3">
                            <div className='direction-detail'>
                                <div className='line'>
                                    <span className='item'>
                                        下发时间:
                                    </span>
                                    <span className='item-state'>2021/12/6 15:41:12</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-item-3">
                            <div className='direction-detail'>
                                <div className='line'>
                                    <span className='item'>
                                        执行时间:</span>
                                    <span className='item-state'>2021/12/8 15:15:32</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-item-3 text-align-right ">
                            <Link to={'/direction'} className='button-white'>返回指令列表 <span className='glyphicon glyphicon-backward'/></Link>
                        </div>
                    </div>
                    <div className='flex-layout'>
                        <div className="flex-item-3">
                            <div className='direction-detail'>
                                <div className='line'>
                                    <span className='item'>
                                        指令编号:
                                    </span>
                                    <span className='item-state'>512</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-item-3">
                            <div className='direction-detail'>
                                <div className='line'>
                                    <span className='item'>
                                        结束时间:
                                    </span>
                                    <span className='item-state'>2021/12/18 15:00:00</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-item-3"> </div>
                        <div className="flex-item-3"> </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Index;