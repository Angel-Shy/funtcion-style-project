import React from 'react';
import stl from './HotCreditHeader.module.scss';
import {useNavigate} from 'react-router-dom';


function HotCreditHeader(props) {

    let navigate = useNavigate();

    return (
        <div className={stl.hotHeader}>
            <div className={`${stl.title} flex-layout`}>
                <div className={'flex-item-2'}>
                    <span className={stl.brand}>[积分]热交易： 一方发起的但是并未被双方签署确定的交易合同/双方都已确认但指令尚未开始执行的交易</span>
                </div>
                <div className={'flex-item-2'}>
                    <span className={stl.back} onClick={e => { navigate('/') }}>
                        <span className={'glyphicon glyphicon-backward'}> </span>
                        返回主界面
                    </span>
                </div>
            </div>
        </div>
    );
}

export default HotCreditHeader;
