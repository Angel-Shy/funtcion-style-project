import React from 'react';
import './index.scss';


function Index(props) {
    console.log(props);

    return (
        <div className={'dialogContentBlockTopDetail'}>
            <div className="myState-line">
                <span className="myState">区块序号[高度]:</span>
                <span className="myState-answer item-state"> {props.block.blockIndex} </span>
            </div>
            <div className="myState-line">
                <span className="myState">数据Hash值:</span>
                <span className="myState-answer item-state"> {props.block.dataHash} </span>
            </div>
            <div className="myState-line">
                <span className="myState">创建时间:</span>
                <span className="myState-answer item-state"> {props.block.createTime} </span>
            </div>
            <div className="myState-line">
                <span className="myState">创建机构:</span>
                <span className="myState-answer item-state"> 区块链系统 </span>
            </div>
            <div className="myState-line">
                <span className="myState">交易数量:</span>
                <span className="myState-answer item-state">{props.block.envelopeCount} </span>
            </div>
            <div className="myState-line">
                <span className="myState">交易通道:</span>
                <span className="myState-answer item-state">{props.block.channelName}  </span>
            </div>
            <div className="myState-line">
                <span className="myState">区块HASH值:</span>
                <span
                    className="myState-answer item-state"> {props.block.blockHash}  </span>
            </div>
            <div className="myState-line">
                <span className="myState">前部区块HASH值:</span>
                <span
                    className="myState-answer item-state"> {props.block.beforeHash} </span>
            </div>
        </div>
    );
}

export default Index;