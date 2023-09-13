import React from 'react';
import loading from '../../../../static/imgs/old/loading-dialog_.gif';
import {GetViewportWidthAndHeight} from "../../../../toolkits";
import stl from './LeftLoading.module.scss';

/* 右边用于懒加载 */
function LeftLoading(props) {

    let marginTop = (GetViewportWidthAndHeight()[1] - 71)/ 2 - 70;

    return (
        <div className={'showPanel ' + stl.loadingPage} style={{ height: GetViewportWidthAndHeight()[1] - 71 }}>
            <div className={stl.loadingIcon} style={{marginTop: marginTop }} >
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

export default LeftLoading;

