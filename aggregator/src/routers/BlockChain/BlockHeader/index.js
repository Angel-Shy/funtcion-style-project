import React, {Component} from 'react';
import './index.scss';
import {UPDATENETWORKSTATE} from '../../../pubsub/index';
class BlockHeader extends Component {

    updateToken = (e) => {
        PubSub.publish(UPDATENETWORKSTATE, {hello: true} );
    }

    render() {
        return (
            <div className={'blockHeader flex-layout'}>
                <div className="flex-item-5 text-align-left">区块链网络节点管理</div>
                <div className="flex-item-5 text-align-right">
                    <button  className='FUIButton FUI-btnBlue' onClick={this.updateToken}>
                        <span className='glyphicon glyphicon-refresh'></span>
                        刷新统计图表
                    </button>
                </div>
            </div>
        );
    }
}

export default BlockHeader;