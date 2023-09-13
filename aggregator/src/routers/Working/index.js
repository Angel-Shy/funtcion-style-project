import React from 'react';
import isWorking from '../../static/imgs/icon/shigong1.png'
import WindowUtils from "../../utils";

class Index extends React.Component{

    componentDidMount() {

    }

    render() {
        return (
            <div className={'workingPage'} style={{height: WindowUtils.getViewport().height - 100 }}>
                <div className={'loading-icon'} style={{marginTop: (WindowUtils.getViewport().height - 120)/2 - 70 }} >
                    <img src={isWorking}  alt="111"/>
                    <span>当前页面正在施工建设中</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span><span>.</span><span>.</span><span>.</span>
                </div>
            </div>
        )
    }
}

export default Index;