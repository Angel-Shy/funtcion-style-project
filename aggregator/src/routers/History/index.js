import React, {Fragment} from 'react';
import HistoryHeader from "./HistoryHeader";
import HistoryMiddleWareStateEChart from "./HistoryMiddleWareStateEChart";
import HistoryProgressShow from "./HistoryProgressShow";
import {useLocation} from "react-router-dom";

function History(props) {
    let location = useLocation();
    let state = location.state;
    return (
        <Fragment>
            <HistoryHeader direction={state}  />
            <HistoryMiddleWareStateEChart direction={state} />
            <HistoryProgressShow directionID = {state.index} />
        </Fragment>
    );
}

export default History;