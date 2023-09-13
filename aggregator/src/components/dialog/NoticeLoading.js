import React, {Fragment} from 'react';
import loading from "../../static/imgs/loading-dialog_.gif";
import close from '../../static/imgs/icon/close.png';

function NoticeLoading(props) {

    const  onClose = () =>{
        props.close();
    }
    return (
        <div>
            <div>
                <div className='dialogBackground' >
                </div>
                <div className="dialog"  style={{height:'210px', width:'500px'}} >
                    <div className="dialog-header-title">
                        <div className="flex-layout">
                            <div className="flex-item-1 dialog-title-header">
                                <span>数据加载提示框</span>
                            </div>
                            <div className="flex-item-1  dialog-close">
                                <img onClick={onClose} src={close} alt="" width="30"/>
                            </div>
                        </div>
                    </div>
                    <div className="dialogContent">
                        <img src={loading}  width='60px' alt=""/>
                        <span style={{verticalAlign: '90%'}} className='loadingFont' >正在从后台加载数据中,请稍等...</span>
                    </div>
                    <div className="dialogFooter">
                        <button onClick={onClose} className="button-default">
                            <span className='glyphicon glyphicon-ok'></span>
                            后台加载
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


/*
    state = {
        loadingShow: true
    }

    closeLoading = ()=>{
        this.setState({loadingShow: false});
    }

    {this.state.loadingShow? <NoticeLoading close={this.closeLoading}  />:''}
* */

export default NoticeLoading;