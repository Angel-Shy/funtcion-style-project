import React, {Component} from 'react';
import './index.scss';
/*
props:
   max: number,
   count: number
   day: 2022/3/15
* */

class Index extends Component {

    state = {
        isShow: false
    }

    showInfo = (e) => {
        this.setState({isShow: true})
    }
    closeInfo = (e)=> {
        this.setState({isShow: false})
    }
    render() {
        let max = parseFloat(this.props.max);
        let count = parseFloat(this.props.count);
        return (
            <div onMouseEnter={this.showInfo}  onMouseLeave={this.closeInfo} className={'day'} style={{backgroundColor: `rgba(0,92,151, ${count/max})`}} >
                <div className={'calendarDayInfo'} style={{
                    display: this.state.isShow?'block':'none',
                }} >
                    <p>{this.props.count}个操作：{this.props.day}</p>
                </div>
            </div>
        );
    }

}

export default Index;