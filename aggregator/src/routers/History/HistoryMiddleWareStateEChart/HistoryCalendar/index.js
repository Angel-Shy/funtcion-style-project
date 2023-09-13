import React, {Component} from 'react';
import CalendarDay from "./CalendarDay";
import './index.scss';
import axiosConfig from "../../../../apis/axios.config";
import {GETDIRECTIONCALENDAR} from "../../../../apis/routes";
import PubSub from "pubsub-js";
import {SUBMITNOTICEERRORMESSAGE} from "../../../../pubsub";

function getTestData(){
    let maxTime = 10;
    let day = new Date(2022,1,1,12,0,0);
    let data = [];
    for (let i =0; i< 60; i++){
        let random = Math.ceil(Math.random() * 20);
        data.push({max: maxTime, count: 0, day: (new Date(day.valueOf() + 24*60*60*1000 * i)).toLocaleDateString()})
    }
    return data;
}

Date.prototype.Format = function (fmt) {
    var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

class Calendar extends Component {

    state={
        list:getTestData(),
        operationCount: 0,
        createDate: new Date(this.props.direction.createTime).toLocaleDateString(),
        endDate: new Date(new Date((this.props.direction.createTime)).valueOf() + 24*60*60*1000 * 60).toLocaleDateString()
    }

    componentDidMount() {
        axiosConfig.get(GETDIRECTIONCALENDAR, {
            params:{
                index: this.props.direction.index
            }
        }).then(res => {
           let allCount = 0;
           let list = res.data.data;
           let arys = [];
           list.forEach((e, idx, ary) =>{
               arys.push(e.count);
               if (e.count !== 0) allCount += e.count;
           });
           // 获得操作最大值
           const maxOp = Math.max(...arys);
           //开始日期
            //60 天哦！
            let day = new Date(this.props.direction.createTime);
            //第一天
            let dayList = [];
            for (let i =0; i< 60; i++){
                let str = (new Date(day.valueOf() + 24*60*60*1000 * i)).Format("yyyy/MM/dd");
                let timeCount = 0;
                list.forEach( one => {
                    if (one.date.trim() === str.trim()) timeCount = one.count;
                })
                dayList.push({max: maxOp, count: timeCount, day: str})
            };
            this.state.list = dayList;
            this.state.operationCount = allCount;
            this.setState({...this.state});

        }).catch(error => {
            //pubsub处理
            if (error.response){
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.response.data.message);
            }else{
                PubSub.publish(SUBMITNOTICEERRORMESSAGE, error.message);
            }
        })
    }

    render() {
        return (
            <div className={'historyCalendar'}>
                <div className={'calender-header'}>
                    操作日历
                </div>
                <div className={'calender-body'}>
                    {this.state.list.map((v,idx) => {
                        return <CalendarDay key={v.day}  {...v} />
                    })}
                </div>
                <div className={'calender-footer'}>
                    操作数量：{this.state.operationCount} 次 创建日期：{this.state.createDate} 日  限制日期: {this.state.endDate}
                </div>
            </div>
        );
    }
}

export default Calendar;