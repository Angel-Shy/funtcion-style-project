import React from 'react';
import store from "../../../../redux/store";
import './index.scss';


function DialogContentInternetNodeDetail(props) {

    let node = store.getState().internet.table.data[props.index];

    return (
        <div className={'dialogContentInternetNodeDetail'}>
            <div className="myState-line">
                <span className="myState">节点编号:</span>
                <span className="myState-answer item-state"> {node.codeId} </span>
            </div>
            <div className="myState-line">
                <span className="myState">IP地址:</span>
                <span className="myState-answer item-state"> {node.ipAddress} </span>
            </div>
            <div className="myState-line">
                <span className="myState">实际地址:</span>
                <span className="myState-answer item-state"> {node.address} </span>
            </div>
            <div className="myState-line">
                <span className="myState">添加时间:</span>
                <span className="myState-answer item-state"> {node.addTime}  </span>
            </div>
            <div className="myState-line">
                <span className="myState">电话号码:</span>
                <span className="myState-answer item-state"> {node.phone} </span>
            </div>
            <div className="myState-line">
                <span className="myState">拥有积分:</span>
                <span className="myState-answer item-state"> {node.credit}</span>
            </div>
            <div className="myState-line">
                <span className="myState">信誉分:</span>
                <span className="myState-answer item-state"> {node.reputation} </span>
            </div>
            <div className="myState-line">
                <span className="myState">节点当前状态:</span>
                <span className="myState-answer item-state"> {node.states} </span>
            </div>
            <div className="myState-line">
                <span className="myState">已经离线时间:</span>
                <span className="myState-answer item-state"> {node.offLineTime} <span className={'glyphicon glyphicon-time'}></span> </span>
            </div>
            <div className="myState-line">
                <span className="myState">上次活跃时间:</span>
                <span className="myState-answer item-state"> {node.lastLife} </span>
            </div>
        </div>
    );
}

export default DialogContentInternetNodeDetail;