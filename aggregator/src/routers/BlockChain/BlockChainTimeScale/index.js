import React, {Component} from 'react';
import './index.scss';
import EChartsReact from "echarts-for-react";
import optionOfTimeScale from "../../../echarts/blockchain/optionOfTimeScale";

class BlockChainTimeScale extends Component {

    state = {
        option: optionOfTimeScale
    }

    render() {
        return (
            <div className={'blockChainTimeScale'}>
                <div className={'echartsContainer'}>
                    <EChartsReact
                        ref={element => this.eChartRef = element}
                        option={this.state.option}
                        lazyUpdate={true}
                        style={{width: '99%', height: 320}}
                    />
                </div>
            </div>
        );
    }
}

export default BlockChainTimeScale;