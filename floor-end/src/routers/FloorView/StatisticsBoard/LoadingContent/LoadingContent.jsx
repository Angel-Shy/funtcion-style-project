import React from 'react';
import {GetViewportWidthAndHeight} from '../../../../toolkits'
import loading from '../../../../static/imgs/old/loading.gif';
import stl from  './LoadingContent.module.scss';

function LoadingContent(props) {
    return (
        <div className={stl.loadingPage} >
            <div className={stl.loadingIcon}  >
                <img src={loading}  alt="111"/>
                <span>正</span><span>在</span><span>拼</span>
                <span>命</span><span>加</span><span>载</span><span>中</span>
                <span>.</span>
                <span>.</span>
                <span>.</span><span>.</span><span>.</span><span>.</span>
            </div>
        </div>
    );
}

export default LoadingContent;