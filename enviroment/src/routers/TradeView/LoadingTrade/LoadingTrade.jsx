import React from 'react';
import stl from './LoadingTrade.module.scss';

function LoadingTrade(props) {
    return (
        <div className={stl.middle}>
            正在从服务器加载数据中......
        </div>
    );
}

export default LoadingTrade;
