import React, {Component, Fragment} from 'react';
import BlockHeader from "./BlockHeader";
import BlockEcharts from "./BlockEcharts";
import BlockChainTimeScale from "./BlockChainTimeScale";

class BlockChain extends Component {
    render() {
        return (
            <Fragment>
                <BlockHeader/>
                <BlockEcharts/>
            </Fragment>
        );
    }
}

export default BlockChain;