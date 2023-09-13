import React, {Component} from 'react';
import LoginForm from "../Login/LoginForm";


class LoginRight extends Component {
    render() {
        return (
            <div className={'flex-item-5 loginRight'}>
                <LoginForm/>
            </div>
        );
    }
}

export default LoginRight;