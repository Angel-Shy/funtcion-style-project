import React from 'react';
import PropTypes from 'prop-types';
import close from '../../../../static/imgs/close.png';
import stl from './DialogContainer.module.scss';

/*
* 对话框参数解析
* 参数对象
{
    width: 对话框宽度,
    height: 对话框高度,
    top:距离,
    bcIsCancel: 点击背景是否可以,
    title:'提示框名称',
    isNeedFooter: 是否需要关闭按钮！,
    callback: '关闭后的回调操作'
    close:function 关闭函数
    render: {data => <组件标签 props参数 >}
}
* */
DialogContainer.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    top: PropTypes.number,
    bcIsCancel:PropTypes.bool,
    close:PropTypes.func.isRequired,
    isLoading:PropTypes.bool
};

export function getDialogDefaultSetting() {
    return {
        width:800,
        height:380,
        bcIsCancel:false,
        title:'对话框',
        isNeedFooter:true,
        top:120,
        callback:null,
        isLoading: false
    }
}

DialogContainer.defaultProps = getDialogDefaultSetting();

function DialogContainer(props) {

    const onClose = ()=>{
        props.close();
    }

    const onBCClose = ()=>{
        if (props.bcIsCancel === true){
            props.close();
            return null;
        }
    }

    const implement = ()=>{
        props.close();
        if (props.callback !=null){
            props.callback();
        }
    }

    return (
        <div>
            <div className={`${stl.dialogBackGround} animate__animated animate__slideInDown animate__faster`} onClick={onBCClose}></div>
            <div className={`${stl.dialog} animate__animated  animate__slideInDown`}  style={{height:props.height, width: props.width, top: props.top}}>
                <div className={stl.dialogHeaderTitle}>
                    <div className="flex-layout">
                        <div className={`${"flex-item-1"} ${stl.dialogTitleHeader}`}>
                            <span>{props.title}</span>
                        </div>
                        <div className={`flex-item-1  ${stl.dialogClose}`}>
                            <img onClick={onClose}  src={close} alt="" width="30"/>
                        </div>
                    </div>
                </div>
                <div className={stl.dialogContent} >
                    {props.isLoading? <div className={stl.waitingServer}>
                            正在等待服务器处理中...
                        </div>
                        :props.render}
                </div>
                {props.isNeedFooter?
                    <div className={stl.dialogFooter}>
                        <button className='FUIButton FUI-btnWhite ' onClick={onClose}>
                            <span className='glyphicon glyphicon-remove'></span>
                            操作取消
                        </button>
                        <button className='FUIButton FUI-btnBlack ' onClick={implement}>
                            <span className='glyphicon glyphicon-ok'></span>
                            立即执行
                        </button>
                    </div>:''
                }

            </div>
        </div>
    );
}



export default DialogContainer;
