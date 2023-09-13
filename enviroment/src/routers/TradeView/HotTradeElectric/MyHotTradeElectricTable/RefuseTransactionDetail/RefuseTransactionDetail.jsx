import React from 'react';
import stl from './RefuseTransactionDetail.module.scss';
import {publishTradeElectricRequest} from "../../../../../axios/tradeRequests";
import {refuseTransactionRequest} from "../../../../../axios/transactionRequests";
import {NotifyCloseLoading, NotifyMessage, NotifyOpenLoading} from "../../../../../pubsub";

function RefuseTransactionDetail(props) {

    const [refuseMessage, setMessage] = React.useState({ message:"" });

    /* 显示用户参数错误信息，用在请求发送之前 */
    const [myError, setError] = React.useState({
        isShow: false,
        ErrorMessage:'错误信息！'
    });

    const removeErrorMessage = () => {
        setError({
            isShow: false,
            ErrorMessage:'错误信息！'
        });
    }

    const onSubmit = React.useCallback((e)=> {
        if (refuseMessage.message.trim().length <= 0){
            NotifyMessage("拒绝原因为空");
            return;
        }

        NotifyOpenLoading();
        refuseTransactionRequest({
            transactionId: props.transactionId,
            reason:refuseMessage.message
        }, () => {
            props.updateTable();
            setTimeout( () => {
                NotifyCloseLoading();
                props.close();
                NotifyMessage('该交易已经被你成功拒绝了！');
            }, 1000);
        }, () => {
            NotifyCloseLoading();
        });

    }, [refuseMessage]);



    const TextAreaChangeEvent = React.useCallback( e =>{
        setMessage({message: e.target.value});
    });

    return (
        <div className={stl.refuseTransactionDetail}>
            <p className={stl.header}>请填写你的拒绝理由：</p>
            <textarea placeholder={'请填写你拒绝理由...'} onChange={TextAreaChangeEvent}  className={stl.textarea}></textarea>
            <div className="flex-layout margin-top-25px ">
                <div className='flex-item-5 padding-left-15px'>
                    {myError.isShow?<span className={stl.errorMessageFromServer}>{myError.ErrorMessage}</span>: ''}
                    {myError.isShow?<span onClick={removeErrorMessage} className={`glyphicon glyphicon-remove ${stl.pointer}`}></span>:''}
                </div>
                <div className='flex-item-5 text-align-right '>
                    <button onClick={e => {props.close()}}  className="FUIButton  FUI-btnWhite ">
                        <span className='glyphicon glyphicon-remove'></span>
                        操作取消
                    </button>
                    <button onClick={onSubmit}  className="FUIButton FUI-btnBlack margin-left-15px ">
                        <span className='glyphicon glyphicon-ok'></span>
                        立即执行
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RefuseTransactionDetail;
