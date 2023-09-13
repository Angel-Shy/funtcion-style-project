import React from 'react';
import stl from './CreditContractDetail.module.scss';
import app from '../../../../app.json';
import {subscribeTransactionRequest} from "../../../../axios/transactionRequests";
import {
    NotifyCloseLoading,
    NotifyCreditTransactionSuccess,
    NotifyMessage,
    NotifyOpenLoading
} from "../../../../pubsub";

function CreditContractDetail(props) {

    const [myError, setError] = React.useState({
        isShow: false,
        ErrorMessage:'错误信息！'
    });

    /* 移除红色文字错误提示 */
    const removeErrorMessage = () => {
        setError({
            isShow: false,
            ErrorMessage:'错误信息！'
        });
    }

    let onSubscribeClickEvent = React.useCallback( () =>{
        NotifyOpenLoading();
        subscribeTransactionRequest({
            transactionId: props.transaction.transactionId
        }, () => {
            NotifyCreditTransactionSuccess();
            setTimeout( () => {
                NotifyCloseLoading();
                props.close();
                NotifyMessage('签署完成，已请求区块链系统进行上链处理！');
            }, 1000);
        }, () => {
            NotifyCloseLoading();
        })
    }, []);

    const element = props.transaction;
    return (
        <div className={stl.creditContractContainer}>
            <div className={stl.header}>
                <p className={'text-align-left'}>
                    <span className={stl.leftItem}>合同/交易编号:</span>
                    <span className={stl.itemAnswer}>{element.codeId}</span>
                </p>
                <p>
                    <span className={stl.leftItem}>
                        甲方:
                    </span>
                    <span className={stl.itemAnswer}>
                        {element.partyAAddress}
                    </span>
                    <span className={stl.centerItem}>
                        编号:
                    </span>
                    <span className={stl.itemAnswer}>
                        {element.partyACode}
                    </span>
                </p>
                <p>
                    <span className={stl.leftItem}>
                        乙方:
                    </span>
                    <span className={stl.itemAnswer}>
                        {element.partyBAddress}
                    </span>
                    <span className={stl.centerItem}>
                        编号:
                    </span>
                    <span className={stl.itemAnswer}>
                        {element.partyBCode}
                    </span>
                </p>
            </div>
            <div className={stl.content}>
                甲乙双方根据各自条件和需要，本着友好协商、共同发展的原则定立本合同，合同内容如下：由于上级对电力调控的需要，于<code>{element.directionCreateTime}</code> 下发了<span className={stl.type}>{element.directionType}</span>指令:
                <code>{element.cmdId}</code> 预计开始执行时间为：<code>{element.directionStartTime}</code>，预计结束时间为： <code>{element.directionEndTime}</code>。
                在指令执行期间甲方需要按照上级要求减少一定的电量使用，由于甲方自身具有丰富的电力调控能力，可以帮助其他楼宇承担电荷调控。乙方可以委托甲方承担部分电量任务(见合同下方)，同时乙方支付一定量的积分 (见合同下方)！
                合同完成双方签署后，甲方帮助乙方完成一定量的电力调控，乙方支付甲方一定量的积分，甲方有责任承担合同规定的原本由乙方承担的电量任务，并且该部分电量对应的系统奖励积分在甲方完成该部分电量调控任务后，由甲方获得！
                如果甲方未完成该部分电力任务，则责任由甲方自行承担！
            </div>
            <div className={stl.tfooter}>
                <p >
                    <span className={stl.leftItem}>甲方承担电量:</span>
                    <span className={stl.itemAnswer}>{element.electricityValue} {element.electricityUnit}</span>
                </p>
                <p>
                    <span className={stl.leftItem}>乙方支付积分:</span>
                    <span className={stl.itemAnswer}>{element.point}</span>
                </p>
                {/*<p>*/}
                {/*    <span className={stl.leftItem}>甲方签名：</span>*/}
                {/*    <span className={stl.itemAnswer}>{element.partyASignature===null||element.partyASignature===''?"暂未签署":element.partyASignature}[公钥签名]</span>*/}
                {/*</p>*/}
                <p>
                    <span className={stl.leftItem}>甲方签署日期：</span>
                    <span className={stl.itemAnswer}>{element.partyASubscribe===null||element.partyASubscribe===''?"暂未签署":element.partyASubscribe}</span>
                </p>
                {/*<p>*/}
                {/*    <span className={stl.leftItem}>乙方签名：</span>*/}
                {/*    <span className={stl.itemAnswer}>{element.partyBSignature===null||element.partyBSignature===''?"暂未签署":element.partyBSignature}[公钥签名]</span>*/}
                {/*</p>*/}
                <p>
                    <span className={stl.leftItem}>乙方签署日期：</span>
                    <span className={stl.itemAnswer}>{element.partyBSubscribe===null||element.partyBSubscribe===''?"暂未签署":element.partyBSubscribe}</span>
                </p>
                <p>
                    <span className={stl.leftItem}>协议状态：</span>
                    <span className={stl.itemAnswer}>{element.state === 1?'甲方尚未签署':'已结束'}</span>
                </p>
                <p>
                    <span className={stl.leftItem}>办理单位：</span>
                    <span className={stl.itemAnswer}>{app.owner}</span>
                </p>
            </div>
            <div className={stl.rfooter}>
                合同一旦签署，立即生效！ 有效期为合同签署完成开始，直到本次电力调控指令完成为止！合同实施与合同有关的一切争端，甲乙双方首先应通过友好协商来解决。合同未尽事宜，由甲乙双方另行协商解决！
            </div>
            <div className="flex-layout margin-top-25px ">
                <div className='flex-item-5 padding-left-15px'>
                    {myError.isShow?<span className={stl.errorMessageFromServer}>{myError.ErrorMessage}</span>: ''}
                    {myError.isShow?<span onClick={removeErrorMessage} className={`glyphicon glyphicon-remove ${stl.pointer}`}/>:''}
                </div>
                {
                    props.isDetail == true?"":
                        (<div className={'flex-item-5 text-align-right '} onClick={onSubscribeClickEvent}>
                            <button  className={stl.linkDetailButton}>
                                签署本合同
                            </button>
                        </div>)
                }
            </div>
        </div>
    );
}

export default CreditContractDetail;
