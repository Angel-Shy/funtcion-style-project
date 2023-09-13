import React, {useState, useCallback} from 'react';
import stl from './HistoryTrade.module.scss';
import require_ from  '../../../static/icon/alibaba/requires.svg'
import require_white from  '../../../static/icon/alibaba/requirement_white.svg'
import trans  from '../../../static/icon/alibaba/trasmean.svg';
import transaction_white  from '../../../static/icon/alibaba/tranaction_white.svg';
import notice from '../../../static/icon/alibaba/shuqian.svg';
import notice_white from '../../../static/icon/alibaba/shuqian_white.svg';
import {Outlet, useNavigate} from 'react-router-dom';
import {NotifyMessage} from "../../../pubsub";

function HistoryTrade(props) {

    let [actives, setActives] = useState([true, false, false]);

    let navigate = useNavigate();

    let navigateEvent = useCallback((idx,url) => {
        return e => {
            try{
                actives.fill(false);
                actives[idx] = true;
                setActives(actives);
                navigate(url);
            }catch (e) {
                NotifyMessage(`[组件 HistoryTrade]程序错误:  ${e.message}`);
            }
        }
    });

    let changeUrl = React.useCallback(()=>{
        let route = window.location.hash.slice(1).split("/")[2];
        let index = 0;
        if (route === "requirement"){index = 0;}
        else if(route === "transaction"){index = 1;}
        else if (route === "notice"){ index = 2; };
        actives.fill(false);
        actives[index] = true;
        setActives([...actives]);
    }, [actives]);

    React.useEffect(() => {
        window.addEventListener('hashchange', changeUrl, false);
        return () => {
            window.removeEventListener('hashchange', changeUrl,false);
        }
        changeUrl();
    }, []);//去掉了 [] 降低了性能

    return (
        <div className={`content ${stl.historyContainerBigger}`}>
            <div className={stl.titleHeader}>
                <ul>
                    <li  onClick={navigateEvent(0,'/history/requirement')} className={actives[0]?stl.activeLi:''} >
                        <div>
                            <img src={actives[0]?require_white:require_} alt=""/>  需求历史
                        </div>
                    </li>
                    <li onClick={navigateEvent(1,'/history/transaction')} className={actives[1]?stl.activeLi:''}>
                        <div>
                            <img src={actives[1]?transaction_white:trans} alt=""/>  交易历史
                        </div>
                    </li>
                    <li onClick={navigateEvent(2,'/history/notice')} className={actives[2]?stl.activeLi:''}>
                        <div>
                            <img src={actives[2]?notice_white:notice} alt=""/>  通知信息
                        </div>
                    </li>
                </ul>
            </div>
            <div className={`${stl.backToMain}  float-layout`}>
                    <span className={`${stl.back} float-right`} onClick={e => { navigate('/') }}>
                        <span className={'glyphicon glyphicon-backward'}> </span>
                        返回主界面
                    </span>
            </div>
            <div className={stl.contentBody}>
                <Outlet/>
            </div>
        </div>
    );
}

export default HistoryTrade;
