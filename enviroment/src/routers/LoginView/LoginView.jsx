import React, {Fragment} from 'react';
import LoginHeader from "./LoginHeader/LoginHeader";
import LoginForm from "./LoginForm/LoginForm";
import LoginFooter from "./LoginFooter/LoginFooter";

function LoginView(props) {
    return (
        <Fragment>
            <LoginHeader/>
            <LoginForm/>
            <LoginFooter/>
        </Fragment>
    );
}

export default LoginView;
