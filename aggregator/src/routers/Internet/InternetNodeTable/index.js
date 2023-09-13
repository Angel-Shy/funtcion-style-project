import React, {Component} from 'react';
import  './index.scss';
import Dialog, {DialogSetting} from "../../../components/dialog";
import ActionNotice from "../../../components/dialog/ActionNotice";
import store from "../../../redux/store";
import Loading from "../../../components/dialog/Loading";
import {DELETEINTERNETNODE, POSTINTERNETNODESDATA} from "../../../apis/routes";
import axiosConfig from "../../../apis/axios.config";
import PubSub from  'pubsub-js';
import {SUBMITNOTICEERRORMESSAGE} from  '../../../pubsub'
import DialogContentInternetNodeDetail from "./DialogContentInternetNodeDetail";
import {InternetSaveDataFromServerAction} from "../../../redux/internetAction";

const defaultDialog = new  DialogSetting();
defaultDialog.title = '区块链网络节点详情';
defaultDialog.height = 600;
defaultDialog.width = 1000;
defaultDialog.top = 100;
defaultDialog.bcIsCancel = true;
defaultDialog.isNeedFooter = true;

class InternetNodeTable extends Component {
    state = {
        showIndex:0,
        dialogShow: false,
        noticeShow: false,
        deleteMessage: '',
        loadingShow: false,
        deleteCodeId: ''
    }

    closeNotice = ()=> {
        this.setState({noticeShow: false});
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

    deleteNode = (codeId)=>{
        return (e) => {
            this.setState({
                noticeShow: true,
                deleteCodeId: codeId,
                deleteMessage: `你确定需要删除编号为${codeId}的网络节点吗？请慎重考虑本操作可能的危险性！`
            });
        }
    }

    closeLoading = ()=>{
        this.setState({loadingShow: false});
    }
    openLoading = ()=>{
        this.setState({loadingShow: true});
    }

    getDataFromServer = (form)=>{
        axiosConfig.post(POSTINTERNETNODESDATA, form).then(response => {
            store.dispatch(InternetSaveDataFromServerAction(response.data));
        }).catch(error => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
    }

    deleteInternetNode = ()=> {
        this.openLoading();
        axiosConfig.delete(DELETEINTERNETNODE, {
            params:{
                nodeId: this.state.deleteCodeId
            }
        }).then(response => {
            PubSub.publish(SUBMITNOTICEERRORMESSAGE, '删除成功了！');
            let form = store.getState().internet.form;
            form.pageIndex = 0;
            form.count = 10;
            this.getDataFromServer(form);

        }).catch(error => {
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        }).finally(() => {
            this.closeLoading();
        });
    }

    render() {
        return (
            <div className={'internetNodeTable'}>
                <div className={'table-container'}>
                    <table className="table table-hover">
                        <thead>
                        <tr className="font-weight-600">
                            <td>节点(楼宇)序号</td>
                            <td>节点编号</td>
                            <td>IP地址</td>
                            <td>创建时间</td>
                            <td>电话号码</td>
                            <td>实际地址</td>
                            <td>积分</td>
                            <td>信誉分</td>
                            <td>已经离线时间</td>
                            <td>上次活跃时间</td>
                            <td>节点状态</td>
                            <td>操作</td>
                        </tr>
                        </thead>
                        <tbody>
                            {Array.from(store.getState().internet.table.data).map((el, idx)=>
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{el.codeId}</td>
                                    <td> <span className={'font-blue '}>{el.ipAddress}</span></td>
                                    <td>{el.addTime}</td>
                                    <td> <span className={'glyphicon glyphicon-phone'}></span> {el.phone}</td>
                                    <td> <span className={'glyphicon glyphicon-home font-red'}></span> {el.address}</td>
                                    <td>{el.credit}</td>
                                    <td>{el.reputation}</td>
                                    <td><span className={'font-blue glyphicon glyphicon-time'}></span> {el.offLineTime}</td>
                                    <td>{el.lastLife}</td>
                                    <td><span className={'font-red'}>{el.states}</span></td>
                                    <td>
                                        <button onClick={this.showDetail(idx)}  className='link-detail-button' >查看详情</button>
                                        <button onClick={this.deleteNode(el.id)}  className='link-detail-button' >删除节点</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {this.state.noticeShow?<ActionNotice
                    message={this.state.deleteMessage}
                    height={200} width={800}
                    close={this.closeNotice}
                    action={this.deleteInternetNode}
                    backgroundCancel={true}
                />:''}
                {this.state.loadingShow? <Loading/>:''}
                {
                    this.state.dialogShow?
                        <Dialog
                            close={this.closeDialog}
                            index={this.state.showIndex}
                            render={<DialogContentInternetNodeDetail index={this.state.showIndex} close={this.closeDialog}/>}
                            {...defaultDialog}
                        />:''
                }
            </div>
        );
    }
}

export default InternetNodeTable;