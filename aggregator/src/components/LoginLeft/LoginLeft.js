import React from "react";
import logo from '../../static/imgs/floor.png';

export default function LoginLeft() {
    return <div className={'flex-item-12 loginLeft'}>
        <div className='header-icon'>
            <img src={logo} alt="this is a logo"/>
        </div>
        <div className='header-title'>
            电力区块链负荷调节平台
        </div>
        <div  className='header-title-eng'>
            This is a platform that utilizes blockchain to regulate electricity loads
        </div>
        <div  className='company'>
            聚合商侧
        </div>
        <div  className='technology-server'>

        </div>
    </div>
}