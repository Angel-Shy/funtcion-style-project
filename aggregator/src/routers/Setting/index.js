import React, {Component} from 'react';
import key from '../../static/imgs/icon/key.png';
import skey from '../../static/imgs/icon/skey.png';
import icon from '../../static/imgs/b1tcd.png';

import './index.scss';
import Dialog ,{DialogSetting} from "../../components/dialog";
import DialogContentAlterUserPassword from "./DialogContentAlterUserPassword";

let dialogSetting = new DialogSetting();
dialogSetting.width = 1100;
dialogSetting.height =720;
dialogSetting.top = 70;
dialogSetting.title = '修改账号密码';
dialogSetting.bcIsCancel = false;
dialogSetting.isNeedFooter = true;

class Setting extends Component {

    state = {
        from:{
            phone: '15982690985',
            email: '1427035242@qq.com'
        },
        dialogShow: false
    }

    closeDialog = ()=> {
        this.setState({dialogShow: false});
    }

    openDialog = ()=> {
        this.setState({dialogShow: true});
    }

    setFormValue = (formName)=>{
        return (e)=>{
            this.state.form[formName] = e.target.value;
            this.setState(this.state);
        }
    }

    render() {
        return (
            <div className={'setting'}>
                <div className={'settingHeader flex-layout'}>
                    <div className="flex-item-5 text-align-left">系统运行设置</div>
                    <div className="flex-item-5 text-align-right">
                        <button  onClick={this.openDialog}  className='FUIButton FUI-btnBlack'>
                            <span className='glyphicon glyphicon-lock'></span>
                            修改密码
                        </button>
                    </div>
                </div>
                <div className={'settingKey margin-top-10px'}>
                    <div className={'userInfo  flex-layout'}>
                        <div className={'flex-item-1'}>
                            <img src={icon} width={100} />
                        </div>
                        <div className={'flex-item-7'}>
                            <div className={'top'}>
                                <span className={'userName'}>李煜</span>
                                <span className={'item'}>[ <span className={'glyphicon glyphicon-user'}></span> 当前用户]</span>
                            </div>
                            <div className={'bottom'}>
                                <span className={'userName'}>admin</span>
                                <span className={'item'}>[账号]</span>
                            </div>
                        </div>
                    </div>
                    <div className={'inputWrap flex-layout margin-top-10px '}>
                        <div className={'item flex-item-1 '}>
                            <span className={'glyphicon glyphicon-phone'}></span> 手机号码:
                        </div>
                        <div className={'item-input flex-item-8 '}>
                            <input type="text" className={'input'} onChange={this.setFormValue('phone')} value={this.state.from.phone} />
                        </div>
                    </div>
                    <div className={'inputWrap flex-layout margin-top-10px '}>
                        <div className={'item flex-item-1 '}>
                            <span className='glyphicon glyphicon-folder-open'></span> 电子邮箱:
                        </div>
                        <div className={'item-input flex-item-8 '}>
                            <input type="email" className={'input'} onChange={this.setFormValue('email')} value={this.state.from.email} />
                        </div>
                    </div>
                    <div className={'publicKey flex-layout margin-top-10px'}>
                        <div className={'flex-item-1'}>
                            <img src={key} alt=""/> <span>节点公钥：</span>
                        </div>
                        <div className={'flex-item-7'}>
                            5FD76C19E8DF441ED9EB9B7982FA11349B33CC14D717B1E6740266D2C1FCD2BD
                        </div>
                    </div>
                    <div className={'privateKey margin-top-10px flex-layout'}>
                        <div className={'flex-item-1'}>
                            <img src={skey} alt=""/> <span>节点私钥：</span>
                        </div>
                        <div className={'flex-item-7'}>
                            加密存放......
                        </div>
                    </div>
                </div>
                {this.state.dialogShow?
                    <Dialog
                        {...dialogSetting}
                        close={this.closeDialog}
                        render={<DialogContentAlterUserPassword close={this.closeDialog} />}
                    />
                    :''
                }
            </div>
        );
    }
}

export default Setting;