import React from 'react';
import loading from '../../static/imgs/loading.gif'
import WindowUtils from "../../utils";

class Index extends React.Component{

    componentDidMount() {
        this.canvas = ()=>{
            this.forceUpdate();
        };

        window.addEventListener('resize',this.canvas, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.canvas);
    }

    render() {
        return (
            <div className={'loadingPage'} style={{height: WindowUtils.getViewport().height - 100 }}>
                <div className={'loading-icon'} style={{marginTop: (WindowUtils.getViewport().height - 120)/2 - 70 }} >
                    <img src={loading}  alt="111"/>
                    <span>正</span><span>在</span><span>拼</span>
                    <span>命</span><span>加</span><span>载</span><span>中</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span><span>.</span><span>.</span><span>.</span>
                </div>
            </div>
        )
    }
}

export default Index;