import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import store from "../../../../redux/store";

/*
beforeHash: "668278c1e80388ac99d3ea57cdfdfbaef7df9f7f41151816efe10f801845f8e6"
blockHash: "2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb"
channelName: "electricChannel"
createOrganization: "Org4MSP"
createTime: "2021-11-19T09:16:46"
data: ""
dataHasH: "6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d"
index: 512
linkName: "ISCC-LINK-SINK"
number: 1
size: "15.23Kb"
validCode: "VAILD"
*/

function DialogContentContractDetail(props){

    let block = store.getState().block.table.data[props.index];
    return (
        <div className={'dialogContentContractDetail'}>
            <div className="myState-line">
                <span className="myState">区块序号[高度]:</span>
                <span className="myState-answer item-state"> {block.blockIndex} </span>
            </div>
            <div className="myState-line">
                <span className="myState">创建时间:</span>
                <span className="myState-answer item-state"> {block.createTime} </span>
            </div>
            <div className="myState-line">
                <span className="myState">创建机构:</span>
                <span className="myState-answer item-state"> 区块链系统 </span>
            </div>
            <div className="myState-line">
                <span className="myState">交易数量:</span>
                <span className="myState-answer item-state">{block.envelopeCount} </span>
            </div>
            <div className="myState-line">
                <span className="myState">交易通道:</span>
                <span className="myState-answer item-state">{block.channelName}  </span>
            </div>
            <div className="myState-line">
                <span className="myState">区块HASH值:</span>
                <span
                    className="myState-answer item-state"> {block.blockHash}  </span>
            </div>
            <div className="myState-line">
                <span className="myState">前部区块HASH值:</span>
                <span
                    className="myState-answer item-state"> {block.beforeHash} </span>
            </div>
            <div className="myState-line">
                <span className="myState">数据区块HASH值:</span>
                <span
                    className="myState-answer item-state"> {block.dataHash} </span>
            </div>
        </div>
    );
}

DialogContentContractDetail.propTypes = {
    index: PropTypes.number.isRequired
};

DialogContentContractDetail.defaultProps = {
    index: 0
}

export default DialogContentContractDetail;