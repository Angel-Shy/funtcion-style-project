import React, {useCallback, useReducer} from 'react';
import classes from './LoginForm.module.scss';
import FUIButtonPrimary from "../../../components/public/buttons/FUIButtonPrimary/FUIButtonPrimary";
import application from '../../../app.json';
import {NotifyMessage} from "../../../pubsub";
import Loading from "../../../components/public/dialog/Loading/Loading";
import {userLoginRequest} from "../../../axios/userRequests";


const initialState = {
    isLoading: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'showLoading':
            state.isLoading = true;
            return {...state};
        case 'closeLoading':
            state.isLoading = false;
            return {...state};
        default:
            return state;
    }
}

/*
* 此处需要ref来处理一个自动填充账号密码的bug！
* */
function LoginForm(props){

    const [state, dispatch] = useReducer(reducer, initialState);

    const login = useCallback(e => {
        e.preventDefault();
        if (IDElement.current.value == '' || PasswordElement.current.value == '') {
            NotifyMessage('请输入密码或者账号！');
            return;
        }
        dispatch({type: 'showLoading'});
        userLoginRequest({
            userId: IDElement.current.value,
            userPwd: PasswordElement.current.value
        }, () => {
            dispatch({type: 'closeLoading'});
        });
    }, [state]);


    const IDElement = React.useRef();
    const PasswordElement = React.useRef();

    return (
        <div >
            <div className={classes.container}>
                <div className={classes.login}>
                    <div className={`${classes.loginTitle} animate__animated  animate__flipInY animate__slow`}>
                        <span>{application.appName}</span>
                    </div>
                    <form>
                        <div>
                            <span className={classes.inputTitle}>账号：</span>
                            <input
                                ref={IDElement}
                                className={classes.input}
                                type="text"
                                placeholder='请输入你的账号' />
                            <span className={classes.inputTitle}>密码：</span>
                            <input
                                ref={PasswordElement}
                                className={classes.input}
                                type="password"
                                placeholder='请输入你的密码'/>
                        </div>
                        <div>
                            <FUIButtonPrimary width={200} onClick={login}>
                                <span className={'glyphicon glyphicon-log-in'}></span>
                                 立即登陆
                            </FUIButtonPrimary>
                        </div>
                    </form>
                </div>
            </div>
            {state.isLoading? <Loading message={'正在等待服务器处理...'} />:''}
        </div>
    );
}

export default LoginForm;
