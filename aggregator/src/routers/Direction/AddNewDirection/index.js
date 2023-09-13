import React, {Component} from 'react';
import './index.scss';
import Dialog, {DialogSetting} from "../../../components/dialog";
import DialogContentAddDirection from "./DialogContentAddDirection";
import PubSub from "pubsub-js";
import {AddDirectionSuccessfully, CloseLoadingShowNow} from "../../../pubsub";

let dialogDefault = new DialogSetting();
dialogDefault.width = 1100;
dialogDefault.height =720;
dialogDefault.top = 70;
dialogDefault.title = '调控指令填写表单';
dialogDefault.bcIsCancel = false;
dialogDefault.isNeedFooter = false;

class AddNewDirection extends Component {
    state = {
        dialogShow: false
    }

    closeDialog = ()=> {
        this.setState({dialogShow: false});
    }

    openDialog = ()=> {
        this.setState({dialogShow: true});
    }


    componentDidMount() {
        this.token = PubSub.subscribe(AddDirectionSuccessfully, (msg,data )=>{
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    render() {
        return (
            <div className={'FUIContent'}>
                <div className='flex-layout addNewDirection' >
                    <div className="flex-item-5 text-align-left">调控指令管理</div>
                    <div className="flex-item-5 text-align-right">
                        <button onClick={this.openDialog} className='FUIButton FUI-btnBlack'>
                            <span className='glyphicon glyphicon-hand-down'></span>
                            下发调控指令
                        </button>
                    </div>
                </div>
                {this.state.dialogShow?
                    <Dialog
                        {...dialogDefault}
                        close={this.closeDialog}
                        render={<DialogContentAddDirection close={this.closeDialog} />}
                    />
                    :''
                }
            </div>
        );
    }
}

export default AddNewDirection;