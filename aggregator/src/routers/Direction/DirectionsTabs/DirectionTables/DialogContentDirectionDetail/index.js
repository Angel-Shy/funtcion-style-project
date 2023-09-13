import React from 'react';
import store from "../../../../../redux/store";
import './index.scss';
/*
carryOutTime: "2021.12.8 15:15:32"
codeName: "削峰指令ACFD15239875"
coin: "71.5"
createTime: "2021/12/6 15:41:12"
detail: "按照上级要求，为了满足各地供电需要，而进行的电力平衡措施！请各位尽力配合，非常感谢大家的热心合作！"
endTime: "2021/12/18 15:00:00"
index: 1
mark: "良"
phone: "021-74155158"
principalName: "李向峰"
rate: 7.15
states: "锁定执行"
valueElectric: 1000
*/
function DialogContentDirectionDetail(props) {

    let direction = store.getState().direction.directions.data[props.index];

    return (
        <div className="dialogContentDirectionDetail">
            <div className="myState-line">
                <span className="myState">指令编号:</span>
                <span className="myState-answer item-state"> {direction.index} </span>
            </div>
            <div className="myState-line">
                <span className="myState">发起人:</span>
                <span className="myState-answer item-state"> {direction.principalName} </span>
            </div>
            <div className="myState-line">
                <span className="myState">发起人电话号码:</span>
                <span className="myState-answer item-state"> {direction.phone} </span>
            </div>
            <div className="myState-line">
                <span className="myState">指令简述:</span>
                <span className="myState-answer item-state"> {direction.codeName} </span>
            </div>
            <div className="myState-line">
                <span className="myState">开始时间:</span>
                <span className="myState-answer item-state">  {direction.carryOutTime}</span>
            </div>
            <div className="myState-line">
                <span className="myState">结束时间:</span>
                <span className="myState-answer item-state"> {direction.endTime} </span>
            </div>
            <div className="myState-line">
                <span className="myState">电荷需求量:</span>
                <span className="myState-answer item-state"> {direction.valueElectric} {direction.electricUnit??"kw"} </span>
            </div>
            <div className="myState-line">
                <span className="myState">产生积分数量:</span>
                <span className="myState-answer item-state" title="每减少100kw.h 可获得多少积分">
                    <span className={'font-blue weight'}>{direction.coin}</span>
               </span>
            </div>
            <div className="myState-line">
                <span className="myState">电荷积分兑换比:</span>
                <span className="myState-answer item-state" title="每减少100kw.h 可获得多少积分">
                    {direction.rate}
                </span>
            </div>
            <div className="myState-line">
                <span className="myState">执行评价:</span>
                <span className="myState-answer item-state" title="每减少100kw.h 可获得多少积分">
                    {direction.mark}
                </span>
            </div>
            <div className="myState-line">
                <span className="myState">指令状态:</span>
                <span className="myState-answer item-state" title="每减少100kw.h 可获得多少积分">
                    {direction.states}
                </span>
            </div>
            <div className="myState-line longText ">
                <span className="myState">完备性备注:</span>
                <span className="myState-answer item-state">
                    {direction.detail}
                </span>
            </div>
        </div>
    );
}

export default DialogContentDirectionDetail;