import React, {Component, Fragment} from 'react';
import DashBoardShow from "./DashBoardShow";
import DashBoardEChartBlock from "./DashBoardEcharBlock";
import DashBoardTransaction from "./DashBoardTransaction";
import DashBoardTable from "./DashBoardTable";
import BlockChainTimeScale from "../BlockChain/BlockChainTimeScale";

class FrontIndex extends Component {
    render() {
        return (
            <Fragment>
                <DashBoardShow/>
                <DashBoardEChartBlock/>
                {/* <DashBoardTransaction/> */}
                {/* <BlockChainTimeScale/> */}
                <DashBoardTable/>
            </Fragment>
        );
    }
}

export default FrontIndex;