import React, {Component} from 'react';
import NormalForm from "./NormalForm";
import PhoneForm from "./PhoneForm";

class LoginForm extends Component {

    state = {
        normal:true,
        normalLink:true,
        phone:false,
        phoneLink:false,
        nowStr: new Date(Date.now()).toLocaleString()
    }

    timer = null;

    changeLoginForm = (type)=>{
        return (e)=>{
            e.preventDefault();
            if (type == 'normal'){
                this.setState({
                    normal:true,
                    normalLink:true,
                    phone:false,
                    phoneLink:false
                });
            }else{
                this.setState({
                    normal:false,
                    normalLink:false,
                    phone:true,
                    phoneLink:true
                });
            }
        }

    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                nowStr: new Date(Date.now()).toLocaleString()
            })
        }, 1000)
    }

    componentWillUnmount() {
        this.timer = null;
    }

    render() {
        return (
            <div className={'loginForm'}>
                <div className='title'>欢迎登录</div>
                <hr className='hr-default' />
                <div className='login-link flex-layout'>
                    <div className='flex-item-5 center'>
                        <a href="/" onClick={this.changeLoginForm('normal')} className={this.state.normalLink?'loginLink active':'loginLink' }>
                            <span className={'glyphicon glyphicon-paste'}></span>
                            账号密码登录
                        </a>
                    </div>
                    <div className='flex-item-5 center'>
                        <a href="/" onClick={this.changeLoginForm('phone')} className={this.state.phoneLink?'loginLink active':'loginLink' }>
                            <span className={'glyphicon glyphicon-time padding-right-5px '}></span>
                            {this.state.nowStr}
                        </a>
                    </div>
                </div>
                <div className='form-layout'>
                    <NormalForm />
                </div>
            </div>
        );
    }
}


export default LoginForm;