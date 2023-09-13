import React, {Component, Fragment} from 'react';
import {Link, Navigate} from 'react-router-dom';
import zheDie from '../../../static/imgs/old/zheDieO.png';
import logout from '../../../static/imgs/old/logout.png';
import {loginOut} from '../../../apis/user';
import ActionNotice from "../../dialog/ActionNotice";

class TopBanner extends Component {
    state = {
        show: false
    }

    closeNotice = () =>{
        this.setState({show: false});
    }

    render() {
        return (
            <Fragment>
                <div className='right-banner'>
                    <div className="post-left">
                        <div className="icon">
                            <img src={zheDie} alt="折叠" title="折叠菜单"/>
                        </div>
                        <div className="linkList">
                            <span  title='跳转回系统首页？'>
                                <Link to='/'>系统首页</Link>
                            </span>
                        </div>
                    </div>
                    <div className="post-right">
                        <ul>
                            <li>
                                <a href="" onClick={this.Out} ><img src={logout} alt=""/> 注销用户</a>
                            </li>
                            {/*<li><a href="#">帮助文档</a></li>*/}
                        </ul>
                    </div>
                </div>
                {this.state.show?<ActionNotice message={'你确定要退出吗？'} action={this.action} close={this.closeNotice} backgroundCancal={true} />:''}
            </Fragment>
        );
    }

    Out = (e)=>{
        e.preventDefault();
        this.setState({show: true});
    }

    action = ()=> {
        loginOut();
    }
}

export default TopBanner;