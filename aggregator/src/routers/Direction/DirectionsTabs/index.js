import React, {lazy} from 'react';
import './index.scss';
import SearchDirections from "./SearchDirections";
import DirectionTables from "./DirectionTables";
import DivisionPage from "./DivisionPage";
import AdjustableElectricityResourceChart from "./AdjustableElectricityResourceChart";

function DirectionTabs(props) {

    const [active, setActive] = React.useState({
        tabs:[true, false]
    });

    function showMe(index){
        return (e) => {
            active.tabs.fill(false);
            active.tabs[index] = true;
            setActive({
                tabs: active.tabs
            })
        }
    }

    return (
        <div className={'directionsTabs'}>
            <ul className='tabs float-layout' >
                <li onClick={showMe(0)} className={active.tabs[0]?'active':''} >
                    <span>指令检索</span>
                </li>
                <li onClick={showMe(1)} className={active.tabs[1]?'active':''}>
                    <span>指令信息统计</span>
                </li>
            </ul>
            <div className='tabContent'>
                <div className={active.tabs[0]?'':'disappear'}>
                    <SearchDirections/>
                    <DirectionTables/>
                    <DivisionPage/>
                </div>
                <div className={active.tabs[1]?'':'disappear'}>
                    <AdjustableElectricityResourceChart/>
                </div>
            </div>
        </div>
    );
}

export default DirectionTabs;