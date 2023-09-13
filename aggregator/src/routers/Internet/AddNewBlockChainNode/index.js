import React, {Component} from 'react';
import './index.scss';
import Dialog, {DialogSetting} from "../../../components/dialog";
import DialogContentAddNode from "./DialogContentAddNode";

let addDialog = new DialogSetting();
addDialog.width = 1200;
addDialog.height =630;
addDialog.top = 70;
addDialog.title = '添加区块链网络节点(楼宇)';
addDialog.bcIsCancel = false;
addDialog.isNeedFooter = false;

class AddNewBlockChainNode extends Component {

    state = {
        dialogShow: false
    }

    closeDialog = ()=> {
        this.setState({dialogShow: false});
    }

    openDialog = ()=> {
        this.setState({dialogShow: true});
    }

    render() {
        return (
            <div className={'flex-layout addNewBlockChainNode'}>
                <div className="flex-item-5 text-align-left">区块链网络节点管理</div>
                <div className="flex-item-5 text-align-right">
                    <button onClick={this.openDialog} className='FUIButton FUI-btnBlack'>
                        <span className='glyphicon glyphicon-plus'></span>
                        添加网络节点
                    </button>
                </div>
                {this.state.dialogShow?
                    <Dialog
                        {...addDialog}
                        close={this.closeDialog}
                        render={<DialogContentAddNode close={this.closeDialog} />}
                    />
                    :''
                }
            </div>
        );
    }
}

export default AddNewBlockChainNode;