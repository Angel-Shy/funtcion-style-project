import React from 'react';
import store from "../../../../redux/store";
import './index.scss';
/*
index:12,
id:'af4996fd6155df0af02fdb5df3fcf1ae',
belongDirection:2,
blcokId:512,
transactionType:0,  0 指令合同 1 积分购买电荷 2 人民币兑换积分 3 混合事务
transactionTypeName:"指令合同",
initiatorType:"聚合商节点",合同发起人
accepterType:"楼宇节点",
initiator:"000001",合同发起人 编码
accepter:"AAAA115",合同接收人
detail:"",
initiatorGiveValue:"200",  减少电荷 100/ 人民币 500
accepterGiveValue:"14.3"  获得积分 71.5 / 积分 500,
initialTime:"2021/12/9 14:00:00",发起时间
states:"已记录于区块",
*/
function DialogContentContractDetail(props) {

    let contract = store.getState().contract.table.data[props.index];

    return (
        <div className="dialogContentContractDetail">
            <div className="myState-line">
                <span className="myState">当前序号:</span>
                <span className="myState-answer item-state">{props.index + 1}</span>
            </div>
            <div className="myState-line">
                <span className="myState">合同编号:</span>
                <span className="myState-answer item-state">{contract.id}</span>
            </div>
            <div className="myState-line">
                <span className="myState">所属指令号:</span>
                <span className="myState-answer item-state"> 1 </span>
            </div>
            <div className="myState-line">
                <span className="myState">所属指令号简述:</span>
                <span className="myState-answer item-state"> 削峰指令KHASKDHIJASLKD545 </span>
            </div>
            <div className="myState-line">
                <span className="myState">合同类型:</span>
                <span className="myState-answer item-state">{contract.transactionTypeName}  </span>
            </div>
            <div className="myState-line">
                <span className="myState">发起节点:</span>
                <span className="myState-answer item-state"> {contract.initiatorType}[{contract.initiator}] </span>
            </div>
            <div className="myState-line">
                <span className="myState">需要承担电荷量:</span>
                <span className="myState-answer item-state"> {contract.initiatorGiveValue} </span>
            </div>
            <div className="myState-line">
                <span className="myState">接受节点:</span>
                <span className="myState-answer item-state"> {contract.accepterType}[{contract.accepter}]</span>
            </div>
            <div className="myState-line">
                <span className="myState">预估获得积分:</span>
                <span className="myState-answer item-state"> {contract.accepterGiveValue} </span>
            </div>
            <div className="myState-line">
                <span className="myState">发起时间:</span>
                <span className="myState-answer item-state"> {contract.initialTime} </span>
            </div>
            <div className="myState-line">
                <span className="myState">合同状态:</span>
                <span className="myState-answer item-state"> {contract.states} </span>
            </div>
        </div>
    );
}



export default DialogContentContractDetail;