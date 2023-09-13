import React, {Component} from "react";
import store from "../../../redux/store";
import {BlockChainSaveSearchConditionAction, BlockChainSaveDataFromServerAction} from "../../../redux/blockChainAction";
import axiosConfig from "../../../apis/axios.config";
import {POSTBLOCKCHAINDATA} from "../../../apis/routes";
import {SUBMITNOTICEERRORMESSAGE} from "../../../pubsub";
import './index.scss';

class blockDivisionPage extends Component {

    state = {
        prevBtnState: true,
        nextBtnState: true,
        pageIndex:1
    }

    pageJumpNext =()=>{
        
        if (this.nextIsDisiable){
            //没有下一页了
        }else{
            let form = store.getState().block.form;
            form.pageIndex = form.pageIndex + 1;
            console.log(`new from:`);
            console.log(form);
            store.dispatch(BlockChainSaveSearchConditionAction(form));
            this.getDataFromServer(form);
        }
    }

    pageJumpPrev =()=>{
        if (this.prevIsDisiable){
            //没有下一页了
        }else{
            let form = store.getState().block.form;
            form.pageIndex = form.pageIndex - 1;
            store.dispatch(BlockChainSaveSearchConditionAction(form));

            this.getDataFromServer(form);
        }
    }

    getDataFromServer = (form)=>{
        axiosConfig.post(POSTBLOCKCHAINDATA, form).then(response => {
            //console.log(response.data);
            store.dispatch(BlockChainSaveDataFromServerAction(response.data));
        }).catch(error => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
    }

    pageJump = (op) =>{
        return (e) => {
            let block = store.getState().block;
            let form = block.form;
            let pageCount = block.table.pageCount;

            if (op == this.operation.first ){
                form.pageIndex = 1;
            }else if (op == this.operation.tail){
                form.pageIndex = pageCount;
            }else if (op == this.operation.jump){
                form.pageIndex = Number.parseInt(this.state.pageIndex);
            }
            this.getDataFromServer(form);
        }
    }

    setPageIndex = (e)=>{
        this.state.pageIndex = e.target.value;
    }

    operation = {
        first: '首页',
        next:'下一页',
        prev:'上一页',
        tail:'尾页',
        jump:'跳转页面'
    }

    render() {
        const block = store.getState().block;
        const pageIndex = pageCount == 0? 0 : block.form.pageIndex;
        const pageCount = block.table.pageCount;
        let options = [];
        for(let i = 0; i <pageCount; i++){
            options.push(i);
        }
        this.prevIsDisiable = (pageIndex == 1 || pageCount == 0);
        this.nextIsDisiable = (pageIndex  == pageCount || pageCount == 0);

        return (
            <div className={'blockDivisionPage'}>
                <div className="float-layout">
                    <label className="float-left font-weight-400 ">
                        <span className="item">...</span>
                    </label>
                    <div className=" float-right">
                        <button className="FUIButton FUI-btnWhite">
                            第{pageIndex}/{pageCount}页
                        </button>
                        <button className="FUIButton FUI-btnBlack" onClick={this.pageJump(this.operation.first)}>
                            首页
                        </button>
                        <button  onClick={this.pageJumpPrev} className={this.prevIsDisiable?'FUIButton FUI-btnDisable':'FUIButton FUI-btnBlack'}>
                            <span className="glyphicon glyphicon-chevron-left"></span>上一页
                        </button>
                        <button onClick={this.pageJumpNext} className={this.nextIsDisiable?'FUIButton FUI-btnDisable':'FUIButton FUI-btnBlack'} >
                            下一页 <span className="glyphicon glyphicon-chevron-right"></span>
                        </button>
                        <button className="FUIButton FUI-btnBlack"  onClick={this.pageJump(this.operation.tail)}>
                            尾页
                        </button>
                        <select onChange={this.setPageIndex} >
                            {options.map((v,i)=>{
                                return <option value={i + 1} key={v} >第{v + 1}页</option>
                            })}
                        </select>
                        <button onClick={this.pageJump(this.operation.jump)} className="button-white">跳转</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default blockDivisionPage;