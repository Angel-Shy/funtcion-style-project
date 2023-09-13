import React, {Component} from 'react';
import './index.scss';
import store from "../../../redux/store";
import Dialog, {DialogSetting} from "../../../components/dialog";
import DialogContentBlockDetail from "./DialogContentBlockDetail";

const dialogDefault = new DialogSetting();
dialogDefault.width = 1200;
dialogDefault.height = 520;
dialogDefault.title = '合同详情';
dialogDefault.bcIsCancel = true;
/*
index:512,
blockHash:"2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb",
dataHasH:"6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d",
beforeHash:"668278c1e80388ac99d3ea57cdfdfbaef7df9f7f41151816efe10f801845f8e6",
createTime:'2021-11-19T09:16:46',
channelName:"electricChannel",
createOrganization:"Org4MSP",
linkName:"ISCC-LINK-SINK",
validCode:'VAILD',
size:"15.23Kb",
number:1,
data:""
*/
class Index extends Component {

    state = {
        showIndex:0,
        dialogShow: false
    }

    closeDialog = ()=> {
        this.setState({dialogShow: false});
    }

    openDialog = ()=> {
        this.setState({dialogShow: true});
    }

    showDetail = (index)=>{
        return (e)=>{
            this.setState({
                showIndex:index,
                dialogShow: true
            })
        }
    }

    render() {
        return (
            <div className={'blockChainTable'}>
                <div className="table-container">
                    <table className="table table-hover">
                        <thead>
                            <tr className="font-weight-600">
                                <td>索引</td>
                                <td>区块索引</td>
                                <td>区块头部Hash</td>
                                <td>创建时间</td>
                                <td>创建机构</td>
                                <td>交易数量</td>
                                <td>前区块Hash</td>
                                <td>数据区块</td>
                                <td>交易通道</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody id="blockchain-table-mount">
                            {Array.from(store.getState().block.table.data).map((el, idx)=>
                                <tr key={el.blockIndex}>
                                    <td>{idx + 1}</td>
                                    <td><button onClick={this.showDetail(idx)} className={'link-detail-button'}>{el.blockIndex}</button></td>
                                    <td className="block-tr-hash font-blue "
                                        title={el.blockHash} >{el.blockHash}
                                    </td>
                                    <td>{el.createTime}</td>
                                    <td>
                                        <span className={'glyphicon glyphicon-home font-red'}></span>
                                        <span className={'font-blue'}>区块链系统</span>
                                    </td>
                                    <td>{el.envelopeCount}</td>
                                    <td className="block-tr-hash font-blue "
                                        title={el.beforeHash}>{el.beforeHash}
                                    </td>
                                    <td className={"block-tr-hash font-blue "}>{el.dataHash}</td>
                                    <td>{el.channelName}</td>
                                    <td>
                                        <button onClick={this.showDetail(idx)} className={'link-detail-button'}>查看详情</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {
                    this.state.dialogShow?
                        <Dialog
                            close={this.closeDialog}
                            index={this.state.showIndex}
                            render={<DialogContentBlockDetail index={this.state.showIndex} close={this.closeDialog}/>}
                            {...dialogDefault}
                        />:''
                }
            </div>
        );
    }
}

export default Index;