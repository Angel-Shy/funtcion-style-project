import React, {Fragment} from 'react';
import {useNavigate} from "react-router-dom";

function Index(props) {
    const navigate = useNavigate();

    function goToHistory() {
        navigate(`/history/${props.dirID}`);
    }

    return (
        <Fragment>
            <button onClick={goToHistory} className='link-detail-button'>执行进度:{props.dirID} </button>
        </Fragment>
    );
}

export default Index;