import React, {Component} from 'react';
import close from "../../static/imgs/icon/close.png";
import PropTypes from "prop-types";

/*
* 对话框
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
class Dialog extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='dialogBackground' onClick={this.onBCClose} >
                </div>
                <div className="dialog"  style={{height:this.props.height, width: this.props.width, top: this.props.top}}>
                    <div className="dialog-header-title">
                        <div className="flex-layout">
                            <div className="flex-item-1 dialog-title-header">
                                <span>{this.props.title}</span>
                            </div>
                            <div className="flex-item-1  dialog-close">
                                <img onClick={this.onClose}  src={close} alt="" width="30"/>
                            </div>
                        </div>
                    </div>
                    <div className="dialogContent" >
                        {this.props.render}
                    </div>
                    {this.props.isNeedFooter?
                        <div className="dialogFooter">
                            {/*<button onClick={this.onClose}  className="FUIButton FUI-btnWhite">*/}
                            {/*    <span className='glyphicon glyphicon-remove'></span>*/}
                            {/*    操作取消*/}
                            {/*</button>*/}
                            <button onClick={this.implement}  className="FUIButton FUI-btnBlack">
                                <span className='glyphicon glyphicon-ok'></span>
                                立即关闭
                            </button>
                        </div>:''
                    }

                </div>
            </div>
        );
    }

    onClose = ()=>{
        this.props.close();
    }

    onBCClose = ()=>{
        if (this.props.bcIsCancel === true){
            this.props.close();
            return null;
        }
    }

    implement = ()=>{
        this.props.close();
        if (this.props.callback !=null){
            this.props.callback();
        }
    }
    static propTypes = {
         width: PropTypes.number,
         height: PropTypes.number,
         top: PropTypes.number,
         bcIsCancel:PropTypes.bool,
         close:PropTypes.func.isRequired
     }

    static defaultProps = {
        width:520,
        height:180,
        bcIsCancel:false,
        title:'对话框',
        isNeedFooter:true,
        top:120,
        callback:null
    }
}

export class DialogSetting{
    constructor() {
        this.width = 500,
        this.height = 180,
        this.bcIsCancel= false,
        this.title='对话框',
        this.isNeedFooter= true,
        this.callback= null,
        this.top = 120
    }
}


export const dialogDefault = {
    width: 500,
    height: 180,
    bcIsCancel: false,
    title:'对话框',
    isNeedFooter: true,
    callback: null
}

export default Dialog;