import React, {Fragment} from 'react';
import icon from "../../../static/imgs/old/home.png";
import application from "../../../app.json";
import electricTransaction from "../../../static/icon/alibaba/image-text.svg";
import category from "../../../static/icon/alibaba/all.svg";
import logout_icon from  '../../../static/icon/alibaba/user.svg';
import requireIcon from  '../../../static/icon/alibaba/requires.svg';
import password from  '../../../static/icon/alibaba/password.svg';
import help from  '../../../static/icon/alibaba/help.svg';
import history from '../../../static/icon/alibaba/historyRecord.svg'
import {logout} from  '../../../axios/user';
import DialogContainer,{getDialogDefaultSetting} from "../../../components/public/dialog/DialogContainer/DialogContainer";
import PublishElectricityTransactions from "./PublishElectricityTransactions/PublishElectricityTransactions";
import PublishCreditTransactions from "./PublishCreditTransactions/PublishCreditTransactions";
import AlterUserPassword from "./AlterUserPassword/AlterUserPassword";
import {useNavigate} from 'react-router-dom';

const  DefaultSetting = getDialogDefaultSetting();
DefaultSetting.isNeedFooter = false;
DefaultSetting.width = 1000;
DefaultSetting.height = 520;
DefaultSetting.title = "发布电力交易需求";
DefaultSetting.isLoading = false;

const CreditDialogSetting = getDialogDefaultSetting();
CreditDialogSetting.isNeedFooter = false;
CreditDialogSetting.width = 1000;
CreditDialogSetting.height = 520;
CreditDialogSetting.title = "发布积分交易需求";
CreditDialogSetting.isLoading = false;

const DialogLoadingSetting = getDialogDefaultSetting();
DialogLoadingSetting.isNeedFooter = true;
DialogLoadingSetting.width = 580;
DialogLoadingSetting.height = 180;
DialogLoadingSetting.title = "提示框";
DialogLoadingSetting.isLoading = false;
DialogLoadingSetting.callback = logout;
DialogLoadingSetting.bcIsCancel = true;

const AlterPasswordSetting = getDialogDefaultSetting();
AlterPasswordSetting.isNeedFooter = false;
AlterPasswordSetting.width = 740;
AlterPasswordSetting.height = 290;
AlterPasswordSetting.title = "修改用户密码";
AlterPasswordSetting.isLoading = false;

function TradeHeader(props) {

    let navigate = useNavigate();

    const [NoticeLogout, setNoticeLogout] = React.useState(false);
    const [NoticeAlterPassword, setNoticeAlterPassword] = React.useState(false);
    const [PublishElectric, setPublishElectric] = React.useState(false);
    const [PublishCredit, setPublishCredit] = React.useState(false);
    const logoutEvent = e => {
        setNoticeLogout(true);
    }

    const alterPasswordEvent = e => {
      setNoticeAlterPassword(true);
    }

    const gotoHistoryEvent = e =>{
        let route = window.location.hash.slice(1).split("/")[2];
        if (route === "requirement"){
            navigate('/history/requirement');
        }
        else if(route === "transaction"){
            navigate('/history/transaction');
        }
        else if (route === "notice"){
            navigate('/history/notice');
        }else {
            navigate('/history/requirement');
        }
    }

    return (
        <Fragment>
            <div className={'tradeHeader'}>
                <div className={'flex-layout'}>
                    <div className={'flex-item-6 flex-layout nav-brand '}>
                        <div className={' flex-item-2 brand'} onClick={e => { navigate('/') }}>
                            <img src={icon} alt="icon"/>
                            <span className='brandContent'>
                                {application.owner}
                            </span>
                        </div>
                        <div className={' flex-item-4 navList'}>
                            <ul>
                                <li>
                                    <a href="#" onClick={e => {e.preventDefault()}}>
                                        <img src={electricTransaction} alt=""/>
                                        <span>发布交易</span>
                                    </a>
                                    <ul>
                                        <li onClick={e => setPublishElectric(true)}>发布电力需求</li>
                                        <li onClick={e => setPublishCredit(true)}>发布积分需求</li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" onClick={e => {e.preventDefault()}}>
                                        <img src={category} alt=""/>
                                        <span>热交易</span>
                                    </a>
                                    <ul>
                                        <li onClick={e => { navigate('/electric/recipient') }}>查看电力交易</li>
                                        <li onClick={e => { navigate('/credit/recipient') }}>查看积分交易</li>
                                    </ul>
                                </li>
                                <li onClick={gotoHistoryEvent }>
                                    <a href="#" onClick={e => {e.preventDefault()}}>
                                        <img src={history} alt=""/>
                                        <span >历史信息</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={'flex-item-4 right-navLink'}>
                        <ul>
                            <li onClick={logoutEvent}>
                                <img src={logout_icon}  alt=""/>
                                <span>注销退出</span>
                            </li>
                            {/*<li onClick={alterPasswordEvent}>*/}
                            {/*    <img src={password}  alt=""/>*/}
                            {/*    <span>修改密码</span>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <img src={help}  alt=""/>*/}
                            {/*    <span>帮助手册</span>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>
            </div>
            {
                PublishElectric?
                    <DialogContainer
                        close={() => setPublishElectric(false)}
                        render={<PublishElectricityTransactions close={() => setPublishElectric(false)} /> }
                        {...DefaultSetting}
                    />:''
            }
            {
                PublishCredit?
                    <DialogContainer
                        close={() => setPublishCredit(false)}
                        render={<PublishCreditTransactions close={() => setPublishCredit(false)} /> }
                        {...CreditDialogSetting}
                    />:''
            }
            {
                NoticeLogout?
                    <DialogContainer
                        close={() => setNoticeLogout(false)}
                        render={'你确定要注销当前的账户吗？'}
                        {...DialogLoadingSetting}
                    />:''
            }
            {
                NoticeAlterPassword?
                    <DialogContainer
                        close={() => setNoticeAlterPassword(false)}
                        render={<AlterUserPassword close={() => setNoticeAlterPassword(false)} />}
                        {...AlterPasswordSetting}
                    />:''
            }
        </Fragment>
    );
}

export default TradeHeader;
