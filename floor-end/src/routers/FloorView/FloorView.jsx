import React, {useState, useCallback} from 'react';
import stl from './FloorView.module.scss';
import DisplayBoard from "./DisplayBoard/DisplayBoard";
import StatisticsBoard from "./StatisticsBoard/StatisticsBoard";

function FloorView(props) {
    return (
        <div className={stl.floorView}>
            <DisplayBoard/>
            <StatisticsBoard/>
        </div>
    );
}

export default FloorView;