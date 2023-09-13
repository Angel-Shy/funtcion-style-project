import React, {Fragment} from 'react';
import loading from "../../static/imgs/loading-dialog_.gif";


function Loading(props) {
    return (
        <Fragment>
            <div className='dialogBackgroundLoading'/>
            <div className="dialog-loading" style={{width:250, height:60}} >
                <div className="loading">
                    <img src={loading} width="60" alt=""/>
                     <span className="loading-message">正在加载中...</span>
                </div>
            </div>
        </Fragment>
    );
}

export default Loading;