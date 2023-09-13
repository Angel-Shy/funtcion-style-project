import React, {Component, Fragment} from 'react';
import PubSub from "pubsub-js";
import {SUBMITNOTICEERRORMESSAGE, SUBMITNOTICEGETITERNETNODEINFO} from "../../../../pubsub";
import axiosConfig from "../../../../apis/axios.config";
import {GETINTERNETNODEINFO} from "../../../../apis/routes";

class BuildingNodeInfo extends Component {

    componentDidMount() {
        this.token = PubSub.subscribe(SUBMITNOTICEGETITERNETNODEINFO, (msg,data )=>{
            this.getInfoFromServer(data.data.name);
        })
    }

    getInfoFromServer(codeId){
        axiosConfig.get(GETINTERNETNODEINFO, {
            params:{
                codeId
            }
        }).then(respose => {
            this.setState(respose.data);
        }).catch(error => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
    }

    state = {
        id: 0, /* 节点编号，你懂的，一般是数据库里面的主键 */
        codeId:'',/* 编号，这是用来看的 */
        ipAddress:"",/* 当前IP地址 */
        address:"请选择楼宇节点，点击左侧节点编号", /* 地址 */
        credit:0, /* 积分  */
        reputation:0, /* 信誉分 */
        states:"", /* 在线或者离线 */
        phone:"", /* 电话 */
        addTime:"" /* 什么时候添加这个节点的 */
    }

    render() {
        let node = this.state;
        return (
            <Fragment>
                <div className="float-layout ">
                    <span className="myState-direction float-left">楼宇名称：</span>
                    <span className="myState-answer-direction float-left">
                            {node.address}
                        </span>
                </div>
                <div className=" float-layout ">
                    <span className="myState-direction float-left">IP地址：</span>
                    <span className="myState-answer-direction float-left">
                            {node.ipAddress}
                        </span>
                </div>
                <div className=" float-layout ">
                    <span className="myState-direction float-left">创建时间：</span>
                    <span className="myState-answer-direction float-left">
                            {node.addTime} <span className={'glyphicon-time glyphicon'}></span>
                        </span>
                </div>
                <div className=" float-layout ">
                    <span className="myState-direction float-left">负责人电话：</span>
                    <span className="myState-answer-direction float-left">
                            {node.phone}
                        </span>
                </div>
                <div className=" float-layout ">
                    <span className="myState-direction float-left">积分：</span>
                    <span className="myState-answer-direction float-left">
                           {node.credit}
                        </span>
                </div>
                <div className=" float-layout ">
                    <span className="myState-direction float-left">信誉分：</span>
                    <span className="myState-answer-direction float-left">
                            {node.reputation}
                        </span>
                </div>
                <div className=" float-layout ">
                    <span className="myState-direction float-left">节点编号：</span>
                    <span className="myState-answer-direction float-left">
                            {node.codeId}
                        </span>
                </div>
                <div className=" float-layout ">
                    <span className="myState-direction float-left">节点Index：</span>
                    <span className="myState-answer-direction float-left">
                            {node.id}
                        </span>
                </div>
                <div className=" float-layout ">
                    <span className="myState-direction float-left">状态信息：</span>
                    <span className="myState-answer-direction float-left">
                            {node.states}
                        </span>
                </div>
            </Fragment>
        );
    }
}

export default BuildingNodeInfo;