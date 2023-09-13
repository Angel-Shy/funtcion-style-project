import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import input from '../../../static/imgs/history/electric.png';
import bi from '../../../static/imgs/history/bi.png';
import contract from '../../../static/imgs/old/recordbook.svg';
import progress_ from  '../../../static/imgs/history/progress.png';
import EChartsReact from "echarts-for-react";


function Index(props) {
    const navigate = useNavigate();

    return (
        <div className={'FUIContent'}>
            <div className='flex-layout historyHeader'>
                <div className="flex-item-5 text-align-left">指令执行进度 - <span>{props.direction.codeName} (编号:{props.direction.index})</span> </div>
                <div className="flex-item-5 text-align-right">
                    <button  onClick={() => navigate('/direction')}  className='FUIButton FUI-btnBlack'>
                        返回指令列表
                        <span className='glyphicon glyphicon-backward'></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Index;