import React, {Fragment} from 'react';
import EChartsReact from "echarts-for-react";
import eOption from "../../../../echarts/history/optionOfHistoryContract";
import axiosConfig from "../../../../apis/axios.config";
import {GETDIRECTIONCONTRACTS} from "../../../../apis/routes";
import PubSub from "pubsub-js";
import {SUBMITNOTICEERRORMESSAGE} from "../../../../pubsub";

function HistoryEChart(props) {

    let [_option, setOption] = React.useState(eOption);
    const eChartRef = React.useRef();

    React.useEffect(()=>{
        axiosConfig(GETDIRECTIONCONTRACTS, {
            params:{
                index: props.directionID
            }
        }).then( res =>{
            let reqData = res.data;
            _option.xAxis[0].data = reqData.nodes;
            _option.series[0].data = reqData.coins;
            _option.series[1].data = reqData.electric;
            setOption({..._option});
            eChartRef.current.getEchartsInstance().setOption(_option);
        }).catch(err => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        })
        return ()=>{

        }
    }, []);

    return (
        <Fragment>
            <EChartsReact
                ref={eChartRef}
                option={_option}
                lazyUpdate={true}
                style={{width: '99%', height: 250}}
            />
        </Fragment>
    )
}

export default HistoryEChart;