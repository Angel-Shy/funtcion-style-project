import React, {Component} from 'react';
import err from '../../static/imgs/icon/err.png'
import right from '../../static/imgs/icon/right.png'

class PhoneForm extends Component {
    state ={
        phone:{
            phoneState: false,
        }
    }
    render() {
        return (
            <div className={'phone ' +  this.props.disappear}>
                <form action="">
                    <div className='input-wrap'>
                        <span className='glyphicon glyphicon-phone'></span>
                        <input placeholder='请输入手机号码！' type='text'/>
                        {this.state.phone.phoneState?<img src={right} alt="?"/>:''}
                    </div>
                    <div className='validate-wrap'>
                        <input placeholder='输入验证码！' type="text"/>
                        <button className='Button button-white'>发送验证码</button>
                    </div>
                    <div className='button-wrap'>
                        <button className='Button'>立即登录</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default PhoneForm;