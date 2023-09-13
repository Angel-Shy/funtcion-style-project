import React,{useCallback} from 'react';
import stl from './StatisticsEChart.module.scss';
import EChartsReact from "echarts-for-react";
import optionOfQuarterlyStatistics from "../../../../echartOptions/optionOfQuarterlyStatistics";
import optionOfSystemRunning from "../../../../echartOptions/optionOfSystemRunning";
import optionOfMonthlyStatistics from "../../../../echartOptions/optionOfMonthlyStatistics";
import EChartSelect from "../../../../components/public/from/EchartSelect/EchartSelect";
import {electricGetStatisticsRequest, quarterlyGetStatisticsRequest} from "../../../../axios/dashBoardRequests";

const LoadElectricDataFromServer = 'LoadElectricDataFromServer';

function getYearsOptions() {
    let options = [];
    let startYear = 2021;
    let yearNow = new Date(Date.now()).getFullYear();
    for (let i = yearNow; i >= startYear ; i--) {
        options.push({ name: i.toString(), value: i });
    }
    return options;
}

function reducer(state, action) {
    switch (action.type) {
        case LoadElectricDataFromServer:
            state.system.totalElectricValue = action.payload.totalElectricValue;
            state.system.ElectricUnit = action.payload.ElectricUnit;
            state.system.actualFinishElectricValue = action.payload.actualFinishElectricValue;
            state.system.waitingFinishElectricValue = action.payload.waitingFinishElectricValue;
            return {...state};
        default:
            return state;
    }
}

function StatisticsEChart(props) {
    
    let [store, dispatch] = React.useReducer(reducer, {}, (_) => {
        return {
            system: {
                totalElectricValue: 0, //总共得到了多少任务量
                ElectricUnit: 'kW',
                actualFinishElectricValue: 0, //实际完成电荷量
                waitingFinishElectricValue: 0, //待完成电荷量
            }
        }
    });

    React.useEffect( () => {
        getDataFromServer(new Date(Date.now()).getFullYear());

        electricGetStatisticsRequest(data => {
            dispatch({type: LoadElectricDataFromServer, payload: {...data}});
            optionOfSystemRunning.series.data[0].value = data.finishRate;
            optionOfSystemRunning.series.data[1].value = 100 - data.finishRate;
            optionOfMonthlyStatistics.xAxis.data = data.months;
            optionOfMonthlyStatistics.series[0].data = data.values;
            EChartRunning.current.getEchartsInstance().setOption(optionOfSystemRunning);
            EChartMonthly.current.getEchartsInstance().setOption(optionOfMonthlyStatistics);
        });
    }, [])

    /* 选择 */
    let SelectChangeEvent = useCallback((year) => {
        getDataFromServer(year);
    }, []);

    let getDataFromServer = useCallback( year => {
        quarterlyGetStatisticsRequest({year: year}, data => {
            optionOfQuarterlyStatistics.series[0].data = data.quarterly;
            EChartPieRef.current.getEchartsInstance().setOption(optionOfQuarterlyStatistics);
        });
    });



    let EChartPieRef = React.useRef();
    let EChartRunning = React.useRef();
    let EChartMonthly = React.useRef();

    return (
        <div className={`${stl.statisticsEChart} flex-layout `}>
            <div className={`flex-item-2 ${stl.quarterlyContainer} boxStyle`}>
                {/*季度统计 */}
                <EChartSelect options={getYearsOptions()}  sendData={SelectChangeEvent} />
                <EChartsReact
                    ref={EChartPieRef}
                    option={optionOfQuarterlyStatistics}
                    lazyUpdate={true}
                    style={{width: '100%', height: 400}}
                />
            </div>
            <div className={`flex-item-2 boxStyle`}>
                <div className={stl.systemRunning}>
                    <div className={stl.itemElectricValue}>
                        <span className={stl.item}>总历史任务量：</span>
                        <span> {store.system.totalElectricValue} </span>
                        <span> {store.system.ElectricUnit}</span>
                    </div>
                    <div className={stl.itemElectricValue}>
                        <span className={stl.item}>已完成调控电荷量：</span>
                        <span> {store.system.actualFinishElectricValue} </span>
                        <span> {store.system.ElectricUnit}</span>
                    </div>
                    <div className={stl.itemElectricValue}>
                        <span className={stl.item}>等待完成调控电量：</span>
                        <span> {store.system.waitingFinishElectricValue} </span>
                        <span> {store.system.ElectricUnit}</span>
                    </div>
                    <div className={stl.EChartProgressLoadingDirection}>
                        <EChartsReact
                            ref={EChartRunning}
                            className={stl.initEChartProgressLoadingDirection}
                            option = {optionOfSystemRunning}
                            lazyUpdate={true}
                            style={{height: 270, width:270}}
                        />
                    </div>
                </div>
            </div>
            <div className={`flex-item-2 ${stl.monthContainer} boxStyle`}>
                <EChartsReact
                    ref={EChartMonthly}
                    option={optionOfMonthlyStatistics}
                    lazyUpdate={true}
                    style={{width: '100%', height: 420}}
                />
            </div>
        </div>
    );
}

export default StatisticsEChart;