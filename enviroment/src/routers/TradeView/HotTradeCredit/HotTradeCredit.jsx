import React from 'react';
import stl from './HotTradeCredit.module.scss';
import HotCreditHeader from "./HotCreditHeader/HotCreditHeader";
import {Outlet, useNavigate} from  'react-router-dom';

function HotTradeCredit(props) {

    let navigater = useNavigate();

    const [active, setActive] = React.useState({
        tabs:[true, false]
    });

    function showMe(index){
        return (e) => {
            if (index == 0){
                navigater('/credit/recipient')
            }else{
                navigater('/credit/sender')
            }

            active.tabs.fill(false);
            active.tabs[index] = true;
            setActive({
                tabs: active.tabs
            })
        }
    }

    /* 代码有些重复，但是我也难得修改了 */
    React.useEffect(() => {
        let route = window.location.hash.slice(1).split("/")[2];
        let index = 0;
        if (route === "recipient"){index = 0;}
        else if(route === "sender"){index = 1;}
        active.tabs.fill(false);
        active.tabs[index] = true;
        setActive({
            tabs: [...active.tabs]
        });
        return () => {
            setActive({
                tabs:[true, false]
            });
        }
    },[]);

    return (
        <div className={'content'}>
            <HotCreditHeader/>
            <div className={stl.tabPanelCredit}>
                <ul className={`${stl.tabs} float-layout`} >
                    <li onClick={showMe(0)} className={active.tabs[0]?`${stl.active}`:''} >
                        交易请求
                    </li>
                    <li onClick={showMe(1)} className={active.tabs[1]?`${stl.active}`:''}>
                        我发起的交易
                    </li>
                </ul>
                <div className={`${stl.tabContent}`}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default HotTradeCredit;
