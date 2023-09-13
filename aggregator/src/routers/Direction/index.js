import React, {Component, Fragment}  from 'react';
import AddNewDirection from "./AddNewDirection";
import DirectionState from "./DirectionState";
import DirectionsTabs from "./DirectionsTabs";
import {AddDirectionSuccessfully} from "../../pubsub";
import PubSub from "pubsub-js";

class Direction extends Component {

    componentDidMount() {
        //打开执行界面
        this.token = PubSub.subscribe(AddDirectionSuccessfully, (msg,data )=>{
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    render() {
        return (
            <Fragment>
                <AddNewDirection/>
                <DirectionState/>
                <DirectionsTabs/>
            </Fragment>
        );
    }
}

export default Direction;