import React, {useCallback, useState} from 'react';
import stl from './DirectionImplement.module.scss';
import {connect} from "react-redux";
import {getDirectionRequest} from "../../../../axios/tradeRequests";
import {NotifyOpenLoading, NotifyCloseLoading} from "../../../../pubsub";

import direction from '../../../../static/svgs/directionSetting.svg';
import {GetViewportWidthAndHeight} from "../../../../toolkits";
import money from '../../../../static/icon/iconfonts/jife.svg';
import lightning from '../../../../static/icon/iconfonts/lightning3.svg';
import xiafa from '../../../../static/svgs/规则下发.svg';
import zhixing from '../../../../static/svgs/执行.svg';
import endCarry from '../../../../static/svgs/结束.svg';

function DirectionImplement(props) {

   let ClickEvent = useCallback( (e) => {
       NotifyOpenLoading('正在更新数据中...');
       getDirectionRequest( (data) => {
           setTimeout( () => {
               NotifyCloseLoading();
           }, 1000);
       });
   }, [])

    return (
        <div className={stl.directionImplementContainer}>
            <div className={`${stl.headerTitle} float-layout`}>
                <img src={direction} alt=""/> <span>当前待执行指令</span>
                <button className={'float-right FUIButton FUI-btnWhite '} onClick={ ClickEvent } >
                    <span className={'glyphicon glyphicon-circle-arrow-up'}></span>
                    刷新
                </button>
            </div>
            <div className={stl.container} style={{height: GetViewportWidthAndHeight()[1]-130, overflowY: 'auto'}}>
                {props.isHaveDirections?'':<div className={stl.empty}>暂未有待执行指令...</div>}
                {
                    props.directions.map( (element, idx) => {
                        return (
                            <div key={element.index} className={`${stl.Direction} animate__animated animate__fadeInRight`}>
                                <div>
                                    <div></div>
                                </div>
                                <div>
                                    <div className={`${stl.directionHeader} float-layout`}>
                                        <span className={`${stl.Name}`}>待执行指令</span>
                                        <div className={`${stl.ID} float-right`}>{element.index}</div>
                                        <div className={`${stl.type} float-right`}>{element.type}指令编号:</div>
                                    </div>
                                    <div className={`${stl.values}`}>
                                        <p>
                                            <img src={lightning} alt=""/> <span className={stl.vl}> {element.valueElectric} </span> <span className={stl.unit}>kW</span>
                                            <img src={money} alt=""/> <span className={stl.vl}> {element.coin} </span> <span className={stl.unit}>个积分</span>
                                        </p>
                                        <p>
                                            <span className={stl.firstTime}>{element.createTime}</span>
                                            <span className={stl.issue}><img src={xiafa} alt=""/>指令下发</span>
                                        </p>
                                        <p>
                                            <span className={stl.secondTime}>{element.carryOutTime}</span>
                                            <span className={stl.carryOut}><img src={zhixing} alt=""/>开始执行</span>
                                        </p>
                                        <p>
                                            <span className={stl.thirdTime}>{element.endTime}</span>
                                            <span className={stl.endCarry}><img src={endCarry} alt=""/>结束执行</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}


function mapStateToProps(state){
    return {
        directions: state.directions.directions,
        isHaveDirections: state.directions.directions.length > 0 //ture or false
    }
}

function mapDispatchToProps(dispatch){
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionImplement);
