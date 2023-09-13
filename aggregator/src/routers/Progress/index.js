import React, {Fragment} from 'react';
import TopButtonClick from "./TopButtonClick";
import DirectionProgress from "./DirectionProgress";

function Progress(props) {
    return (
        <Fragment>
            <TopButtonClick/>
            <DirectionProgress/>
        </Fragment>
    );
}

export default Progress;