import React from 'react';
import style from './LoginHeader.module.scss';
import icon from '../../../static/imgs/old/home.png';
import application from '../../../app.json';
import {NotifyMessage} from '../../../pubsub';

function LoginHeader(props) {

    const forgetPassword =e => {
        NotifyMessage('请联系本公司后台服务人员重置密码！');
    };

    return (
        <header className={style.container}>
            <div className={style.header + " flex-layout"}>
                <div className={'flex-item-5'}>
                    <div className={style.brand}>
                    <span>
                        <img src={icon} alt={'网页图标...'}  />
                    </span>
                        {application.owner}
                    </div>
                </div>
                <div className={'flex-item-5'}>
                    <div className={'float-layout ' + style.forget}>
                        <span  onClick={forgetPassword} className={'float-right'}>忘记密码</span>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default LoginHeader;
