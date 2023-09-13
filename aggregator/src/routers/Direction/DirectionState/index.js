import React, {Component} from 'react';
import './index.scss';
import loading from '../../../static/imgs/old/loading-dialog_.gif'
import {GETDIRECTIONSYSTEMSTATE} from '../../../apis/routes';
import axiosConfig from "../../../apis/axios.config";
import {AddDirectionSuccessfully, SUBMITNOTICEERRORMESSAGE} from "../../../pubsub";
import PubSub from "pubsub-js";

class DirectionState extends Component {

    state = {
        count: 0,
        dateTime:'',
        directionSystemState: false, /* 执行或者没有执行 */
        directionKetch: ''
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    componentDidMount() {
        this.getDataFromServer();
        //打开执行界面
        this.token = PubSub.subscribe(AddDirectionSuccessfully, (msg,data )=>{
            this.getDataFromServer();
        });
    }

    getDataFromServer = () => {
        axiosConfig.post(GETDIRECTIONSYSTEMSTATE).then(response => {
            this.setState(response.data);
        }).catch(error => {
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        });
    }

    render() {
        return (
            <div className={'directionState'}>
                <span className="item">指令下发数量:</span>
                <span className="item-state number">{this.state.count}</span>
                <span className="item">上次下发时间:</span>
                <span className="item-state">{this.state.dateTime}</span>
                <span className="item">指令系统状态:</span>
                {this.state.directionSystemState === false? <span className="item-state">空闲状态</span>: '' }
                {this.state.directionSystemState === true? <span className="item-state">正在执行指令</span>: ''}
                {this.state.directionSystemState?<span className="item-state-direction">[{this.state.directionKetch}]</span>:''}
                {this.state.directionSystemState? <img src={loading} style={{verticalAlign: '-20%'}}  alt={"错误"} width="20px"/>: ''}
            </div>
        );
    }
}

export default DirectionState;