import React, {Component} from 'react';
import './index.scss';
import store from "../../../../redux/store";
import Dialog, {DialogSetting} from "../../../../components/dialog";
import DialogContentDirectionDetail from "./DialogContentDirectionDetail";
import {NavLink} from "react-router-dom";

let dialogDefault = new DialogSetting();
dialogDefault.width = 1200;
dialogDefault.height = 680;
dialogDefault.top = 80;
dialogDefault.title = '指令详情';
dialogDefault.bcIsCancel = true;
dialogDefault.isNeedFooter = true;

//指令列表
class DirectionTables extends Component {

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

    showDirectionDetail = (op, index)=>{
        return (e)=>{
            if (op == this.operation.detail){
                this.setState({
                    showIndex:index,
                    dialogShow: true
                })
            }
        }
    }

    operation = {
        detail: 1,
        contracts: 2
    }

    render() {
        return (
            <div className="directionTables">
                <div className='table-container'>
                    <table className="table table-hover">
                        <thead>
                            <tr className="font-weight-600">
                                <td>指令序号</td>
                                <td>编号</td>
                                <td>发起人</td>
                                <td>简述</td>
                                <td>电话号码</td>
                                <td>下发时间</td>
                                <td>开始执行时间</td>
                                <td>预计结束时间</td>
                                <td>总电荷量</td>
                                <td>产生积分</td>
                                <td>指令状态</td>
                                <td>当下评价</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody id="direction-mount-data-table">
                            {Array.from(store.getState().direction.directions.data).map((el, idx)=>
                                <tr key={el.index}>
                                    <td>{idx + 1}</td>
                                    <td>{el.index}</td>
                                    <td><span className='font-blue'>{el.principalName}</span></td>
                                    <td><span className='font-black'>{el.codeName}</span></td>
                                    <td>{el.phone}</td>
                                    <td>{el.createTime}</td>
                                    <td>{el.carryOutTime}</td>
                                    <td>{el.endTime}</td>
                                    <td>{el.valueElectric}</td>
                                    <td>{el.coin}</td>
                                    <td> <span className={'glyphicon glyphicon-grain'}></span> {el.states}</td>
                                    <td className={'font-black'}>{el.mark}</td>
                                    <td>
                                        <NavLink className='link-detail-button'  to={`/history/${el.index}`} state={el} >执行进度</NavLink>
                                        <button className='link-detail-button'  onClick={this.showDirectionDetail(this.operation.detail, idx)}>查看详情</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {(this.state.dialogShow)?
                    <Dialog
                        {...dialogDefault}
                        close={this.closeDialog}
                        render={<DialogContentDirectionDetail index={this.state.showIndex} close={this.closeDialog} />}
                    />
                    :''
                }
            </div>
        );
    }
}

export default DirectionTables;