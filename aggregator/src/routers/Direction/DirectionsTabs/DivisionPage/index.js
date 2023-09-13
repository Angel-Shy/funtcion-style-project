import React, {Component} from 'react';
import './index.scss';
import store from "../../../../redux/store";
import {DirectionSearchConditionAction, DirectionsSaveDataFromServerAction} from "../../../../redux/directionAction";
import axiosConfig from "../../../../apis/axios.config";
import {POSTDIRECTIONSDATE} from "../../../../apis/routes";
import {SUBMITNOTICEERRORMESSAGE} from "../../../../pubsub";

class DivisionPage extends Component {

    state = {
        prevBtnState: true,
        nextBtnState: true,
        pageIndex:1
    }

    pageJumpNext =()=>{
        if (this.nextIsDisiable){
            //没有下一页了
        }else{
            let form = store.getState().direction.condition.form;
            form.pageIndex = form.pageIndex + 1;
            store.dispatch(DirectionSearchConditionAction(form));

            this.getDataFromServer(form);
        }
    }

    pageJumpPrev =()=>{
        if (this.prevIsDisiable){
            //没有下一页了
        }else{
            let form = store.getState().direction.condition.form;
            form.pageIndex = form.pageIndex - 1;
            store.dispatch(DirectionSearchConditionAction(form));

            this.getDataFromServer(form);
        }
    }

    pageJump = (op) =>{
        return (e) => {
            let direction = store.getState().direction;
            let form = direction.condition.form;
            let pageCount = direction.directions.pageCount;

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

    getDataFromServer = (form) =>{
        store.dispatch(DirectionSearchConditionAction(form));
        axiosConfig.post(POSTDIRECTIONSDATE, form).then(response => {
            store.dispatch(DirectionsSaveDataFromServerAction(response.data));//把数据存到redux 里面去
            this.forceUpdate();
        }).catch(error => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
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
        const directionState = store.getState().direction;
        const pageIndex = directionState.directions.pageCount == 0? 0 : directionState.condition.form.pageIndex ;
        const pageCount = directionState.directions.pageCount;
        let options = [];
        for(let i = 0; i <pageCount; i++){
            options.push(i);
        }
        this.prevIsDisiable = (pageIndex == 1 || pageCount == 0);
        this.nextIsDisiable = (pageIndex  == pageCount || pageCount == 0);

        return (
            <div className="divisionPage">
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

export default DivisionPage;