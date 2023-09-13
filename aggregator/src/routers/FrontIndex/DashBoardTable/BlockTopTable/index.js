import React, {Component} from 'react';
import axiosConfig from "../../../../apis/axios.config";
import {GETBLOCKTOPDATA} from "../../../../apis/routes";
import PubSub from "pubsub-js";
import {SUBMITNOTICEERRORMESSAGE} from '../../../../pubsub';
import './index.scss';
import Dialog, {DialogSetting} from "../../../../components/dialog";
import DialogContentBlockTopDetail from "./DialogContentBlockTopDetail";

const dialogDefault = new DialogSetting();
dialogDefault.width = 1200;
dialogDefault.height = 520;
dialogDefault.title = '区块详情';
dialogDefault.bcIsCancel = true;
class BlockTopTable extends Component {

    state = {
        table: null,
        block:null,
        dialogShow: false
    }

    closeDialog = ()=> {
        this.setState({dialogShow: false});
    }

    openDialog = ()=> {
        this.setState({dialogShow: true});
    }

    showDetail = (idx)=>{
        return (e)=>{
            let _block = this.state.table[idx];
            this.setState({
                block:_block,
                dialogShow: true
            })
        }
    }

    getDataFromServer = ()=>{
        axiosConfig.get(GETBLOCKTOPDATA).then(response => {
            this.setState({table: response.data.data});
        }).catch(error => {
            //pubsub处理
            if (error.response){
                if (error.response.data.message == null){
                    PubSub.publish(SUBMITNOTICEERRORMESSAGE, '服务器错误！');
                }else{
                    PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
                }
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
    }

    componentDidMount() {
        this.getDataFromServer();
    }


    render() {
        let table = this.state.table;
        if (table == null) table = [];
        else table = Array.from(this.state.table);
        return (
            <div className='table-container'>
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
                    <tbody>
                    {table.map((el, idx)=>
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
                {
                    this.state.dialogShow&&this.state.block!=null?
                        <Dialog
                            close={this.closeDialog}
                            index={this.state.showIndex}
                            render={<DialogContentBlockTopDetail block={this.state.block} close={this.closeDialog}/>}
                            {...dialogDefault}
                        />:''
                }
            </div>
        );
    }
}

export default BlockTopTable;