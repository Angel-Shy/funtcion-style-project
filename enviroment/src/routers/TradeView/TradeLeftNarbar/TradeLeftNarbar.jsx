import React, {Fragment} from 'react';
import user from '../../../static/icon/alibaba/user.svg';
import directions from '../../../static/icon/alibaba/leftalignment.svg';
import history from '../../../static/icon/alibaba/shuqian.svg';
import {GetViewportWidthAndHeight} from "../../../toolkits";
import PersonalAssets from "./PersonalAssets/PersonalAssets";
import DirectionImplement from "./DirectionImplement/DirectionImplement";
import Bookmark from "./Bookmark/Bookmark";
import {notificationGetWaitingRequest} from "../../../axios/notificationRequests";
import {saveNotifications} from "../../../redux/actions";


function TradeLeftNavbar(props) {

    const [isHaveNotification, setNotification] = React.useState({
        isHave: false,
        quantity: 0
    });

    const [actives , setActives] = React.useState([false, false, false]);

    const ShowPanel = idx => {
        return e => {
            let isClose = actives[idx];
            actives.fill(false);
            //如果没有打开 那么就是要求打开 并且关闭其他的
            if (!isClose) actives[idx] = true;
            // 打开它 关闭其他
            setActives([...actives]);
        }
    }

    //每十秒查询一下通知信息
    React.useEffect(() => {
        updateDataFromServer();
        let timer = setInterval(() => {
            updateDataFromServer();
        }, 10000);

        return () => {
            clearInterval(timer);
        }
    },[]);



    let updateDataFromServer = React.useCallback( v=>{
        notificationGetWaitingRequest((data) => {
            saveNotifications(data);
            setNotification({
                isHave: data.count > 0,
                quantity: data.count
            });
        });
    }, []);


    return (
        <Fragment>
            <ul className={'navIcons'}>
                <li onClick={ShowPanel(0)}  className={actives[0]?'liHover':''} title={'个人资产'} >
                    <img src={user} width={25} alt=""/>
                </li>
                <li onClick={ShowPanel(1)}  className={actives[1]?'liHover':''} title={'当前执行指令'}>
                    <img src={directions} width={25} alt=""/>
                </li>
                <li onClick={ShowPanel(2)}  className={actives[2]?'liHover':''} title={'通知信息'}>
                    <img src={history} width={25} alt=""/>
                    {
                        isHaveNotification.isHave?<sup className={'badge'}>{isHaveNotification.quantity<99?isHaveNotification.quantity:'99+'}</sup>:''
                    }
                </li>
            </ul>
            <div className={'panel'}>
                <div className={(actives[0]?'showPanel animate__animated  animate__slideInLeft ': 'disappear') }   style={{ height: GetViewportWidthAndHeight()[1] - 71 }} >
                    {actives[0]? <PersonalAssets/> : '' }
                </div>
                <div className={actives[1]?'showPanel animate__animated  animate__slideInLeft ': 'disappear'}   style={{ height: GetViewportWidthAndHeight()[1] - 71 }} >
                    {actives[1]? <DirectionImplement/> : '' }
                </div>
                <div className={actives[2]?'showPanel animate__animated  animate__slideInLeft ': 'disappear'}   style={{ height: GetViewportWidthAndHeight()[1] - 71 }} >
                    {actives[2]? <Bookmark update={updateDataFromServer} /> : '' }
                </div>
            </div>
        </Fragment>
    );
}

export default TradeLeftNavbar;
