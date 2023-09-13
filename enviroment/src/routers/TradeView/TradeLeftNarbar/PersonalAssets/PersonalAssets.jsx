import React,{useState} from 'react';
import stl from './PersonalAssets.module.scss';
import {connect} from "react-redux";



/* 图标信息 */
import floor from '../../../../static/svgs/floor.svg'
import ziChan from '../../../../static/svgs/zican.svg';
import credit from '../../../../static/svgs/credit1.png';
import leaver from '../../../../static/svgs/leaveCredit.svg';
import dotMove from '../../../../static/svgs/冻结.svg';
import creditFill from '../../../../static/svgs/信誉_fill.svg';
import phone from '../../../../static/svgs/phone.svg';
import lightning from '../../../../static/imgs/old/shandian.png';
import wenhao from '../../../../static/imgs/old/favicon.png';
import directions from "../../../../redux/directionReducer/reducer";
import {userAssetsRequest} from "../../../../axios/userRequests";


function PersonalAssets(props) {

    let [UserInfo, setUserInfo] = React.useState(props.userInformation)

    let [toggle, setToggle] = useState(true);

    React.useEffect( () => {
        userAssetsRequest( (data) => {
            setUserInfo(data);
        } );
    }, []);

    return (
        <div className={`${stl.personalAssets}`}>
            <div className={`${stl.headerTitle} float-layout`}>
                <img src={ziChan} alt=""/> <span>当前资产情况</span>
                <button className={'float-right FUIButton FUI-btnWhite '} onClick={e => {setToggle(!toggle)}}>
                    <span className={'glyphicon glyphicon-circle-arrow-up'}></span>
                    切换
                </button>
            </div>
            {toggle?
                <div className={`${stl.divIcons} float-layout animate__animated animate__pulse`}>
                    <div className={`${stl.lineHistory} float-left`} >
                        <figure>
                            <img src={credit} alt="积分" title='' />
                            <p>总积分[个]</p>
                            <p> <span className={stl.value}>
                                {UserInfo.points}
                            </span></p>
                        </figure>
                    </div>
                    <div className={`${stl.lineHistory} float-left`} >
                        <figure>
                            <img src={leaver} alt="积分" title='' />
                            <p>可用积分</p>
                            <p> <span className={stl.value}>
                                {UserInfo.availablePoints}
                            </span></p>
                        </figure>
                    </div>
                    <div className={`${stl.lineHistory} float-left`} >
                        <figure>
                            <img src={dotMove} alt="积分" title='' />
                            <p>冻结积分</p>
                            <p>
                                <span className={stl.value}>
                                    {UserInfo.freezingPoints}
                                </span>
                            </p>
                        </figure>
                    </div>
                    <div className={`${stl.lineHistory} float-left`} >
                        <figure>
                            <img src={creditFill} alt="积分" title='' />
                            <p>信誉分</p>
                            <p> <span className={stl.value}>{UserInfo.reputation}</span></p>
                        </figure>
                    </div>
                    <div className={`${stl.lineHistory} float-left`} title={'9000008 kW'} >
                        <figure>
                            <img src={lightning} alt="负荷" title='' />
                            <p>待执行负荷</p>
                            <p>
                                <span className={stl.value}>
                                    {UserInfo.electricityToBeExecuted} {UserInfo.electricityUnit}
                                </span>
                            </p>
                        </figure>
                    </div>
                </div>:
                <div className={`${stl.lineIcons}`}>
                    <div className={stl.myStateLine}>
                        <span className={stl.myState}>总积分:</span>
                        <span className={stl.myStateAnswer}>
                          <span className={`${stl.itemState}`}>
                            {UserInfo.points}
                          </span>
                       </span>
                    </div>
                    <div className={stl.myStateLine}>
                        <span className={stl.myState}>可用积分:</span>
                        <span className={stl.myStateAnswer}>
                          <span className={`${stl.itemState}`}>
                            {UserInfo.availablePoints}
                          </span>
                       </span>
                    </div>
                    <div className={stl.myStateLine}>
                        <span className={stl.myState}>冻结积分:</span>
                        <span className={stl.myStateAnswer}>
                          <span className={`${stl.itemState}`}>
                            {UserInfo.freezingPoints}
                          </span>
                       </span>
                    </div>
                    <div className={stl.myStateLine}>
                        <span className={stl.myState}>信誉分:</span>
                        <span className={stl.myStateAnswer}>
                          <span className={`${stl.itemState}`}>
                           {UserInfo.reputation}
                          </span>
                       </span>
                    </div>
                    <div className={stl.myStateLine}>
                        <span className={stl.myState}>待执行负荷:</span>
                        <span className={stl.myStateAnswer}>
                          <span className={`${stl.itemState}`}>
                            {UserInfo.electricityToBeExecuted} {UserInfo.electricityUnit}
                          </span>
                       </span>
                    </div>
                </div>
            }
            <div className={stl.floor}>
                 <p>
                     <img src={phone} alt="2"/> <span>{UserInfo.phone}</span>
                 </p>
                <p>
                    <img src={floor} alt="3"/> <span>{UserInfo.address}</span>
                </p>
                <p>
                    <img src={wenhao} alt="5"/> <span>节点编号: {UserInfo.codeId}</span>
                </p>
            </div>
        </div>
    );
}

function mapStateToProps(state){
    return {
        userInformation: state.directions.user
    }
}

function mapDispatchToProps(dispatch){
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonalAssets);
