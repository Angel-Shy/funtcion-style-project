import React, {useCallback, useReducer, useEffect} from 'react';
import stl from './Bookmark.module.scss';
import ziChan from "../../../../static/svgs/shuqiano.svg";
import msg2 from '../../../../static/svgs/msg2.svg';
import msg5 from '../../../../static/svgs/msg5.svg';
import {useNavigate} from "react-router-dom";
import error1 from '../../../../static/svgs/deleteWhite.svg';
import deltRed from '../../../../static/svgs/deleteRed.svg';
import {GetViewportWidthAndHeight} from "../../../../toolkits";
import {NotifyOpenElectricContract, NotifyOpenLoading, NotifyCloseLoading} from "../../../../pubsub";
import {connect} from "react-redux";
import {notificationDeleteRequest, notificationGetWaitingRequest} from "../../../../axios/notificationRequests";

function Bookmark(props) {
    let navigate = useNavigate();

    /* hover */
    const ToggleImg2Event = e => {
        let imgLeftTag= e.currentTarget.querySelector('.imgLeftTag');
        if (imgLeftTag != null){
            imgLeftTag.src = msg2;
            e.currentTarget.querySelector('.deleteImg').src = deltRed;
        }
    }

    /* remove */
    const ToggleImg5Event = e => {
        let imgLeftTag = e.currentTarget.querySelector('.imgLeftTag');
        if(imgLeftTag != null && imgLeftTag.src != msg5){
            imgLeftTag.src = msg5;
            e.currentTarget.querySelector('.deleteImg').src = error1;
        }
    }

    const showMessage = e => {
        NotifyOpenElectricContract(false, null, 1);
    }

    let ClickNotificationEvent = useCallback( (notificationType, notificationId) => {
        return e => {
            /* 先请求服务器删除，然后再导航 */
            notificationDeleteRequest({
                deleteType:'Single',
                notificationId
            }, () => {
                props.update();
                /* 跳转尚未实现 */
                if (notificationType == 1){
                    //有人向你发起了积分合同
                    navigate('/credit/recipient');
                }else if(notificationType == 2){
                    //有人想你发起了电力合同
                    navigate('/electric/recipient');
                } else if(notificationType == 3){
                    //新的交易需求
                    navigate('/');
                }else if (notificationType == 4 || notificationType == 7){
                    //你发起的电力交易被拒绝 或者 被接受
                    navigate('/electric/sender');
                }else if (notificationType == 5 || notificationType == 6){
                    //你发起的积分交易被拒绝 或者 被接受
                    navigate('/credit/sender');
                }else {
                    navigate('/');
                }
                //4 电力合同拒绝信息 5.积分合同拒绝信息
            });
        }
    }, []);

    let DeleteNoticeNoJump = useCallback( (notificationId) => {
        return e=>{
            e.stopPropagation();
            notificationDeleteRequest({
                deleteType:'Single',
                notificationId
            }, () => {
                props.update();
            });
        }
    } )

    let ClearAllNotificationEvent = useCallback(e => {
        NotifyOpenLoading('正在更新数据中...');
        notificationDeleteRequest({
            deleteType: 'All',
            notificationId: -1
        }, success => {
            props.update();
            setTimeout(() => {
                NotifyCloseLoading();
            }, 1000)
        }, NotifyCloseLoading);
    }, [])

    return (
        <div className={stl.bookmarkContainer}>
            <div className={`${stl.headerTitleBook} float-layout`}>
                <img src={ziChan} alt=""/> <span>当前汇报信息</span>
                <button className={'float-right FUIButton FUI-btnWhite '} onClick={ClearAllNotificationEvent} >
                    <span className={'glyphicon glyphicon-check'}></span>
                    一键清除
                </button>
            </div>
            <div className={`${stl.container} animate__animated animate__fadeInRight`} style={{height: GetViewportWidthAndHeight()[1]-130, overflowY: 'auto'}}>
                {
                    props.notifications.map( (notice, idx) => {
                        return (
                            <div  onClick={ClickNotificationEvent(notice.notificationType, notice.notificationId)} key={notice.notificationId} className={stl.notification} onMouseOver={ToggleImg2Event} onMouseLeave={ToggleImg5Event}>
                                <div>
                                    <img className={'imgLeftTag'} src={msg5} alt="123"/>
                                </div>
                                <div>
                                    <p className={stl.message}> {notice.message} </p>
                                    <p className={stl.subMessage}>{notice.publishDateTime}</p>
                                </div>
                                <div>
                                    <div title={'点击删除这条消息'} onClick={DeleteNoticeNoJump(notice.notificationId)} >
                                        <img className={'deleteImg'} src={error1} alt=""/>
                                    </div>
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    );
}

function mapStateToProps(state){
    return {
        notifications: state.notifications.notifications,
        count: state.notifications.count
    }
}

function mapDispatchToProps(dispatch){
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);
