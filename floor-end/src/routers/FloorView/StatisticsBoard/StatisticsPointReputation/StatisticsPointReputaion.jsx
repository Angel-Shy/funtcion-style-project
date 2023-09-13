import React from 'react';
import stl from './StatisticsPointReputation.module.scss';
import EChartsReact from "echarts-for-react";
import optionOfPointReputation from "../../../../echartOptions/optionOfPointReputation";
import {pointAndReputationGetStatisticsRequest} from "../../../../axios/dashBoardRequests";

function StatisticsPointReputation(props) {

    let EChartPieRef = React.useRef();

    React.useEffect(() => {
        pointAndReputationGetStatisticsRequest(data => {
            optionOfPointReputation.xAxis[0].data = data.cmdIdCollection;
            optionOfPointReputation.series[0].data = data.points;
            optionOfPointReputation.series[1].data = data.reputation;
            EChartPieRef.current.getEchartsInstance().setOption(optionOfPointReputation);
        });
    }, []);



    return (
        <div className={`${stl.statisticsPointReputation} boxStyle`}>
            <div>
                <EChartsReact
                    ref={EChartPieRef}
                    option={optionOfPointReputation}
                    lazyUpdate={true}
                    style={{width: '100%', height: '100%'}}
                />
            </div>
        </div>
    );
}

export default StatisticsPointReputation;