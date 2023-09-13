import React from 'react';
import stl from './ActionNotice.module.scss';
import PropTypes from 'prop-types';
import close from '../../../../static/imgs/close.png';

export function getNoticeDefaultSetting() {
    return {
        width:580,
        height:180,
        bcIsCancel:false,
        title:'提示框',
        isNeedFooter:true,
        top:120,
        callback:null,
        message:"提示信息!"
    }
}

ActionNotice.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    top: PropTypes.number,
    bcIsCancel:PropTypes.bool,
    close:PropTypes.func.isRequired,
    title:PropTypes.string
};

ActionNotice.defaultProps = getNoticeDefaultSetting();

function ActionNotice(props) {

    const onClose = ()=>{
        //执行回调
        if (props.callback != null){
            props.callback();
        }
        props.close();
    }

    let onOnlyClose = e => {
        //执行回调
        if (props.callback != null){
            props.callback();
        }
        props.close();
    }

    let closeBackground = e => {
        //执行回调
        if (props.callback != null){
            props.callback();
        }
        props.close();
    }

    return (
        <div>
            <div className={`${stl.dialogBackGround} animate__animated animate__slideInDown animate__faster`} onClick={closeBackground}></div>
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

export default ActionNotice;
