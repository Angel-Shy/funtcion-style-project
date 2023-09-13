import React, {Component} from 'react';
import close from '../../static/imgs/icon/close.png'
import PropTypes from 'prop-types';

class Notice extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='dialogBackground' onClick={this.onClose}>
                </div>
                <div className="dialog"  style={{height:this.props.height, width: this.props.width}} >
                    <div className="dialog-header-title">
                        <div className="flex-layout">
                            <div className="flex-item-1 dialog-title-header">
                                <span>提示框</span>
                            </div>
                            <div className="flex-item-1  dialog-close">
                                <img onClick={this.onClose} src={close} alt="" width="30"/>
                            </div>
                        </div>
                    </div>
                    <div className="dialogContent">
                        {this.props.message}
                    </div>
                    <div className="dialogFooter">
                        <button onClick={this.onClose} className="FUIButton FUI-btnBlack">
                            <span className='glyphicon glyphicon-ok'></span>
                           关闭提示
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    onClose = ()=>{
        if (this.props.backgroundCancal == true){
            this.props.close();
            return null;
        }
        this.props.close();
    }

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        backgroundCancal:PropTypes.bool,
        close:PropTypes.func.isRequired
    }

    static defaultProps = {
        width:520,
        height:180
    }

}


/*
父组件必须具有的属性
state = {
    show: true
}

closeNote = () =>{
    this.setState({show: false});
}

{this.state.show?<Notice message={'你的账号或者密码不正确！'} close={this.closeNote} backgroundCancal={false} />:''}
* */

export default Notice;