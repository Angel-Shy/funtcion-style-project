import React ,{lazy,useState, useCallback, Suspense} from 'react';
import stl from './StatisticsBoard.module.scss';
import {Outlet, useNavigate, Routes, Route, Navigate} from "react-router-dom";
import {NotifyMessage} from "../../../pubsub";
import require_ from  '../../../static/icon/alibaba/requires.svg'
import require_white from  '../../../static/icon/alibaba/requirement_white.svg'
import trans  from '../../../static/icon/alibaba/trasmean.svg';
import transaction_white  from '../../../static/icon/alibaba/tranaction_white.svg';
import notice from '../../../static/icon/alibaba/shuqian.svg';
import notice_white from '../../../static/icon/alibaba/shuqian_white.svg';
import statistics_white from '../../../static/icon/alibaba/statistics_white.svg';
import statistics_blue from '../../../static/icon/alibaba/statistics_blue.svg';

/** 路由信息 */
import StatisticsEChart from "./StatisticsEChart/StatisticsEChart";
import StatisticsReportHistory from "./StatisticsReportHistory/StatisticsReportHistory";
import StatisticsTransactionHistory from "./StatisticsTransactionHistory/StatisticsTransactionHistory";
import LoadingContent from "./LoadingContent/LoadingContent";
import StatisticsPointReputation from "./StatisticsPointReputation/StatisticsPointReputaion";

function StatisticsBoard(props) {

    let [actives, setActives] = useState([true, false, false, false]);

    let navigate = useNavigate();

    let navigateEvent = useCallback((idx,url) => {
        return e => {
            try{
                actives.fill(false);
                actives[idx] = true;
                setActives(actives);
                navigate(url);
            }catch (e) {
                NotifyMessage(`[组件 StatisticsBoard]程序错误:  ${e.message}`);
            }
        }
    });

    React.useEffect(() => {
        let route = window.location.hash.slice(1).split("/")[1];
        let index = 0;
        if (route === "charts"){index = 0;}
        else if(route === "transaction"){index = 1;}
        else if (route === "report"){ index = 2; }
        else if (route === "statistics"){ index = 3; };
        actives.fill(false);
        actives[index] = true;
        setActives([...actives]);
    },[]);

    return (
        <div className={stl.statisticsBoard}>
            <div className={stl.titleHeader}>
                <ul>
                    <li  onClick={navigateEvent(0,'/charts')} className={actives[0]?stl.activeLi:''} >
                        <div>
                            <img src={actives[0]?require_white:require_} alt=""/> 统计报表
                        </div>
                    </li>
                    <li onClick={navigateEvent(1,'/transaction')} className={actives[1]?stl.activeLi:''}>
                        <div>
                            <img src={actives[1]?transaction_white:trans} alt=""/> 合同历史
                        </div>
                    </li>
                    <li onClick={navigateEvent(2,'/report')} className={actives[2]?stl.activeLi:''}>
                        <div>
                            <img src={actives[2]?notice_white:notice} alt=""/>  上报历史
                        </div>
                    </li>
                    <li onClick={navigateEvent(3,'/statistics')} className={actives[3]?stl.activeLi:''}>
                        <div>
                            <img src={actives[3]?statistics_blue:statistics_white} alt=""/>  统计数据
                        </div>
                    </li>
                </ul>
            </div>
            <div className={stl.contentBody}>
                <Suspense fallback={<LoadingContent/>}>
                    <Routes>
                        <Route  path='/charts' element={<StatisticsEChart/>} ></Route>
                        <Route  path='/transaction' element={<StatisticsTransactionHistory/>} ></Route>
                        <Route  path='/report' element={<StatisticsReportHistory/>} ></Route>
                        <Route  path='/statistics' element={<StatisticsPointReputation/>} ></Route>
                        <Route  path='/' element={<StatisticsEChart/>} ></Route>
                        <Route  path='*' element={<Navigate to='/'></Navigate>} ></Route>
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default StatisticsBoard;