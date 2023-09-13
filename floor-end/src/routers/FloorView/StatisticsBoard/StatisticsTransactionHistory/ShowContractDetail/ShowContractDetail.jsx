import React from 'react';
import stl from './ShowContractDetail.module.scss';


function ShowContractDetail(props) {

    let element = props.active0bject;

    return (
        <div className={stl.contractContainer}>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>指令编号:</span>
                <span className={stl.myStateAnswer}>
                     <span className={stl.finish}>{element.type} {element.cmdId}</span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>指令简述</span>
                <span className={stl.myStateAnswer}>
                    {element.codeName}
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>指令下发时间</span>
                <span className={stl.myStateAnswer}>
                   <span className={stl.timeAnswer}>{element.createTime}</span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>指令开始执行时间</span>
                <span className={stl.myStateAnswer}>
                     <span className={stl.timeAnswer}>{element.carryOutTime}</span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>预计结束时间:</span>
                <span className={stl.myStateAnswer}>
                    <span className={stl.timeAnswer}>{element.endTime}</span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>下发调控任务:</span>
                <span className={stl.myStateAnswer}>
                    {element.valueElectric} {element.electricUnit}
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>实际执行值:</span>
                <span className={stl.myStateAnswer}>
                    {element.actualElectricValue} {element.electricUnit}
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>预计获得积分:</span>
                <span className={stl.myStateAnswer}>
                    {element.point}
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>实际获得积分:</span>
                <span className={stl.myStateAnswer}>
                    {element.actualPoint}
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>指令状态:</span>
                <span className={stl.myStateAnswer}>
                    {element.cmdStates}
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>合同状态:</span>
                <span className={stl.myStateAnswer}>
                    {element.contractState}
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>执行评价:</span>
                <span className={stl.myStateAnswer}>
                    {element.mark}
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>信誉分变化:</span>
                <span className={stl.myStateAnswer}>
                    {element.reputationChange}
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>合同创建时间:</span>
                <span className={stl.myStateAnswer}>
                    <span className={stl.timeAnswer}>{element.contractCreateTime}</span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>详细说明:</span>
                <span className={stl.myStateAnswer}>
                    <span className={stl.timeAnswer}>{element.directionDetail}</span>
               </span>
            </div>
            <div className="flex-layout margin-top-25px ">
                <div className='flex-item-5 padding-left-15px'>

                </div>
                <div className='flex-item-5 text-align-right '>
                    <button onClick={props.close}  className="FUIButton FUI-btnBlue margin-left-15px ">
                        <span className='glyphicon glyphicon-folder-close margin-right-5px' ></span>
                        立即关闭
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShowContractDetail;