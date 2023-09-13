import React, {Component} from 'react';
import SystemRunning from "./SystemRunning";
import SystemDirection from "./SystemDirection";
import SystemElectricAndCO2 from "./SystemElectricAndCO2";


class DashBoardEChartBlock extends Component {
    render() {
        return (
            <div className='dashBoardEChartBlock'>
                <SystemRunning/>
                <SystemDirection/>
                <SystemElectricAndCO2/>
            </div>
        );
    }
}

export default DashBoardEChartBlock;