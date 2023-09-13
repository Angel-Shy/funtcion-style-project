import React, {Component} from 'react';
import './index.scss';
import store from "../../../redux/store";
import DialogContentContractDetail from "./DialogContentContractDetail";
import Dialog, {DialogSetting} from "../../../components/dialog";

const dialogDefault = new DialogSetting();
dialogDefault.width = 1200;
dialogDefault.height = 620;
dialogDefault.title = '合同详情';
dialogDefault.bcIsCancel = true;
class ContractTables extends Component {

    state = {
        showIndex:1,
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

    componentDidMount() {

    }

    render() {
        return (
            <div className={'contractTables'}>
                <div className="table-container">
                    <table className="table table-hover">
                        <thead>
                            <tr className="font-weight-600">
                                <td>合同序号</td>
                                <td>合同编号</td>
                                <td>所属指令</td>
                                <td>合同类型</td>
                                <td>发起方</td>
                                <td>发起方编号</td>
                                <td>调控负荷</td>
                                <td>接收方</td>
                                <td>接收方编号</td>
                                <td>预估积分</td>
                                <td>发起时间</td>
                                <td>合同状态</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody id="contract-table-show-content-mount">
                            {Array.from(store.getState().contract.table.data).map((el, idx)=>
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td><span className={'font-blue'}>{el.id}</span> </td>
                                    <td>{el.belongDirection}</td>
                                    <td>{el.transactionTypeName}</td>
                                    <td>{el.initiatorType}</td>
                                    <td>{el.initiator}</td>
                                    <td>{el.initiatorGiveValue}</td>
                                    <td>{el.accepterType}</td>
                                    <td>{el.accepter}</td>
                                    <td>{el.accepterGiveValue}</td>
                                    <td>{el.initialTime}</td>
                                    <td>{el.states}</td>
                                    <td>
                                        <button onClick={this.showDetail(idx)}  className='link-detail-button' >查看详情</button>
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
                            render={<DialogContentContractDetail index={this.state.showIndex} close={this.closeDialog}/>}
                            {...dialogDefault}
                        />:''
                }
            </div>
        );
    }
}

export default ContractTables;