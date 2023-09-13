import React from 'react';
import stl from './Notice.module.scss';
import PropTypes from 'prop-types';
import close from '../../../../static/imgs/close.png';

export function getNoticeDefaultSetting() {
    return {
        width:580,
        height:180,
        bcIsCancel:false,
        title:'对话框',
        isNeedFooter:true,
        top:120,
        callback:null,
        message:"这是一个消息提示框!"
    }
}

Notice.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    top: PropTypes.number,
    bcIsCancel:PropTypes.bool,
    close:PropTypes.func.isRequired,
    title:PropTypes.string
};

Notice.defaultProps = getNoticeDefaultSetting();

function Notice(props) {

    const onClose = ()=>{
        if (props.callback != null){
            props.callback();
        }
        /* 关闭 */
        if (props.bcIsCancel === true){
            props.close();
            return null;
        }
        props.close();
    }

    let onOnlyClose = e => {
        /* 关闭 */
        if (props.bcIsCancel === true){
            props.close();
            return null;
        }
        props.close();
    }

    return (
        <div>
            <div className={`${stl.dialogBackGround} animate__animated animate__slideInDown animate__faster`} onClick={onOnlyClose}></div>
            <div className={`${stl.noticeContainer} animate__animated  animate__slideInDown`}  style={{height: props.height, width: props.width, top: props.top}}>
                <div className={stl.noticeHeader}>
                    <div className="flex-layout">
                        <div className={ `flex-item-1 ` + stl.noticeHeaderTitle } >
                            <span>
                                {props.title}
                            </span>
                        </div>
                        <div className={ `flex-item-1 ` + stl.noticeClose }>
                            <img onClick={onOnlyClose} src={close}  width="30"/>
                        </div>
                    </div>
                </div>
                <div className={stl.dialogContent}>
                    {props.message}
                </div>
                <div className={stl.dialogFooter}>
                    <button className={stl.noticeButton} onClick={onClose}>
                        <span className='glyphicon glyphicon-remove'></span>
                        {props.callback == null?"关闭通知":"立即执行"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Notice;
