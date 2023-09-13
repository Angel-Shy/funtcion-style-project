import React, {useCallback} from 'react';
import stl from './AuctionTradeDetail.module.scss';
import PropTypes from 'prop-types';
import lightning from '../../../../../static/icon/iconfonts/lightning3.svg';
import credit from '../../../../../static/icon/iconfonts/jife.svg';
import {NotifyCloseLoading, NotifyMessage, NotifyOpenLoading} from "../../../../../pubsub";
import {pushTransactionRequest} from "../../../../../axios/tradeRequests";

AuctionTradeDetail.propTypes = {
    close:PropTypes.func.isRequired,
    negotiability:PropTypes.bool,
    requirement: PropTypes.object
};

AuctionTradeDetail.defaultProps = {
    negotiability:false,
    requirement: null
};

function AuctionTradeDetail(props) {

    let pointElementRef = React.useRef();
    let electricElementRef = React.useRef();



    let inputChangeEvent = React.useCallback( e => {
        let electricValue = e.target.value;
        if (electricValue > 0){
            pointElementRef.current.value = (parseFloat(electricValue) / props.requirement.electricValue) * props.requirement.point;
        }
    });

    //提交
    let SubmitTransactionEvent =useCallback( v => {
        let electricValue = electricElementRef.current.value;
        let point = pointElementRef.current.value;

        if (electricValue == '' || electricValue == null){
            NotifyMessage("请填写负荷量!");
            return;
        }
        if (electricValue > props.requirement.leftElectricValue){
            NotifyMessage(`负荷量超过剩余值: ${props.requirement.leftElectricValue} ${props.requirement.electricUnit} `);
            return;
        }

        if (electricValue < 0){
            NotifyMessage(`负荷输入为负值！`);
            return;
        }
        //如果交易是可协商的
        if (props.negotiability){
            if (point == '' || point == null){
                NotifyMessage("可协商交易！请填写积分值!");
                return;
            }

            if (point > props.requirement.leftPoint){
                NotifyMessage(`你填写的积分量不应该大于了: ${props.requirement.leftPoint}!`);
                return;
            }
        }
        //发给服务器
        NotifyOpenLoading('正在等待服务器处理中...');
        pushTransactionRequest({
            requirementId: props.requirement.requirementId,
            electricValue:electricValue,
            point:point
        }, (data) => {
            setTimeout(() => {
                NotifyCloseLoading();
                props.close();
                NotifyMessage(`出价成功, 交易合同已经生成，等待甲方确认中！你可以在上方导航栏热交易-${props.requirement.transactionType == 3?'电力交易':'积分交易'}-中查看合同！`);
            }, 1200);
        }, () => {
            NotifyCloseLoading();
        });

    }, []);

    return (
        <div className={stl.auctionContainer}>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>生成合同号:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}> [系统自动生成交易编号] </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>交易类型:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState} font-blue`}>
                    <img className={`${stl.itemStateIcon}`} src={props.requirement.transactionType == 3?lightning:credit} alt=""/>
                    {props.requirement.transactionType == 3?"电力交易 (你获得积分，承担负荷调控)":"积分交易 (你付出积分，其他楼宇承担负荷调控)"}
                </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>协商条件:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}> [{props.negotiability?'可以协商价格':'不可协商价格'}] </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>{props.requirement.transactionType == 3?'你最大承担量':`最多帮你承担`}</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}>
                    {props.requirement.leftElectricValue} {props.requirement.electricUnit}
                </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>{props.requirement.transactionType == 3?'剩余可获得积分':`甲方希望获得积分`}:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}>
                    {props.requirement.leftPoint}
                </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}> {props.requirement.transactionType == 3?"帮助承担":"帮你承担"}负荷量:</span>
                <span className={stl.myStateAnswer}>
                  <input
                      ref={electricElementRef}
                      onChange={inputChangeEvent}
                      className={`${stl.myinput} ${stl.myinputLong}`}
                      min={0}
                      type="number"/> kW
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>{props.requirement.transactionType == 3?"你获得":"你付出"}积分量:</span>
                <span className={stl.myStateAnswer}>
                  <input
                      ref={pointElementRef}
                      disabled={!props.negotiability}
                      className={`${stl.myinput} ${stl.myinputLong}`}
                      min={0}
                      type="number"/>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>参考价格:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}>
                    {props.requirement.electricValue / props.requirement.point} {props.requirement.electricUnit} : 1积分
                </span>
            </div>
            <div className="flex-layout margin-top-25px ">
                <div className='flex-item-5 padding-left-15px'>

                </div>
                <div className='flex-item-5 text-align-right '>
                    <button onClick={props.close}  className="FUIButton  FUI-btnWhite ">
                        <span className='glyphicon glyphicon-remove'></span>
                        操作取消
                    </button>
                    <button onClick={SubmitTransactionEvent}  className="FUIButton FUI-btnBlack margin-left-15px ">
                        <span className='glyphicon glyphicon-ok'></span>
                        立即执行
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuctionTradeDetail;
