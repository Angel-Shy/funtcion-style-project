import React from 'react';
import stl from './RefuseCreditReasonDetail.module.scss';

function RefuseCreditReasonDetail(props) {
    return (
        <div className={stl.reasonContainer}>
            <div className={stl.reasonMessage}>
                <div className={stl.reasonHeader}>
                    交易被拒绝的原因：
                </div>
                <div className={stl.message}>
                    {props.reason}
                </div>
            </div>
            <div className="flex-layout margin-top-25px ">
                <div className='flex-item-5 padding-left-15px'>
                </div>
                <div className='flex-item-5 text-align-right '>
                    <button onClick={e => {props.close()}}  className="FUIButton  FUI-btnWhite ">
                        <span className='glyphicon glyphicon-remove'></span>
                        关闭提示
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RefuseCreditReasonDetail;
