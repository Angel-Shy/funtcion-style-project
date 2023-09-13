import React, {useEffect, useReducer, useCallback, useRef} from 'react';
import stl from './ReportingTheAbilityDetail.module.scss';
import {getWaitingDirectionRequest} from "../../../../axios/directionRequests";
import Select from "../../../../components/public/from/Select/Select";
import {NotifyMessage,NotifyCloseLoading, NotifyOpenLoading} from "../../../../pubsub";
import {postReportAbilityRequest} from "../../../../axios/dashBoardRequests";


const ChangeDirectionId = 'ChangeDirectionId';
const StoreDirectionSelects = 'StoreDirectionSelects'
const ChangeElectricValue = 'ChangeElectricValue';

function reducer(state, action) {
    switch (action.type) {
        case ChangeDirectionId:
            state.condition.cmdId = parseInt(action.payload.value);
            return {...state};
        case StoreDirectionSelects:
            let dircs = action.payload.directions.map(d => {
                return {name: d.codeName, value:d.index};
            });
            dircs.unshift({name: '请选择待执行指令...', value: -1});
            state.directions = action.payload.directions;
            state.directionSelects = dircs;
            return {...state};
        case ChangeElectricValue:
            state.condition.electricValue = parseFloat(action.payload.value);
            return {...state};
        default:
            return state;
    }
}


function ReportingTheAbilityDetail(props) {

    let [now, setNow] = React.useState({ time: new Date(Date.now()).toLocaleString() });

    const [store, dispatch] = useReducer(reducer, {}, (_) => {
        return {
            condition:{
                cmdId: -1,
                electricValue: 0,
                electricUnit: 'kW'
            },
            directionSelects:[
                {name:'请选择待执行指令...', value: -1}
            ],
            directions: []
        }
    })


    useEffect(() => {
        let timer = setInterval(() => {
            setNow({ time: new Date(Date.now()).toLocaleString() });
        }, 1000);

        //加载等待执行的执行
        getWaitingDirectionRequest(data => {
            let action = {type: StoreDirectionSelects, payload: {directions: data.data}};
            dispatch(action);
        });

        return () => {
            clearInterval(timer);
        }
    }, []);

    let ElementType = useRef();
    let ElementAllValueElectric = useRef();
    let ElementAllCoin = useRef();
    let ElementCreateTime = useRef();
    let ElementCarryOutTime = useRef();

    let SelectChangeEvent = useCallback((actionType) => {
        return v => {
            if (v != -1){
                let direction = store.directions.find(cmd => cmd.index == v);
                ElementType.current.innerText = direction.type;
                ElementAllValueElectric.current.innerText = direction.valueElectric;
                ElementAllCoin.current.innerText = (direction.coin === 0?"待计算":direction.coin);
                ElementCreateTime.current.innerText  = direction.createTime;
                ElementCarryOutTime.current.innerText = direction.carryOutTime;
            }else{
                ElementType.current.innerText = '请选择指令';
                ElementAllValueElectric.current.innerText = '0';
                ElementAllCoin.current.innerText = '0';
                ElementCreateTime.current.innerText  = '...';
                ElementCarryOutTime.current.innerText = '...';
            }
            dispatch({type : actionType, payload:{value: v} });
        }
    }, [store]);

    //刷新指令系统
    let flashDirectionFromServer = e => {
        getWaitingDirectionRequest(data => {
            let action = {type: StoreDirectionSelects, payload: {directions: data.data}};
            dispatch(action);
        });
    }

    let electricElement = useRef();

    //上报
    const onSubmitEvent = React.useCallback(()=> {
        if (isNaN(store.condition.electricValue)){
            NotifyMessage('请填写正常的调控意愿值数字！')
            return;
        }
        if (store.condition.cmdId === -1){
            NotifyMessage('请选择调控指令');
            return;
        }
        NotifyOpenLoading('正在请求服务器处理...');
        postReportAbilityRequest(store.condition, () => {
            setTimeout(()=>{
                NotifyCloseLoading();
                NotifyMessage('上报成功！');
            }, 1000);
        }, () => {
            NotifyCloseLoading();
        });
    }, [store]);

    return (
        <div className={stl.reportContainer}>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>上报时间:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}> [{now.time}] </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>选择指令:</span>
                <span className={stl.myStateAnswer}>
                  <Select sendData={SelectChangeEvent(ChangeDirectionId)} options={store.directionSelects}  />
                    <button onClick={flashDirectionFromServer} className={'FUIButton FUI-btnWhite margin-left-15px'}>
                        <span className={'glyphicon glyphicon-circle-arrow-left'}></span>
                        刷新指令
                    </button>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>调控意愿值:</span>
                <span className={stl.myStateAnswer}>
                  <input
                      value={store.condition.electricValue}
                      ref={electricElement}
                      onChange={ e => {
                          if ( parseFloat(e.target.value) < 0 ){
                              NotifyMessage('错误，不可以填写负数的意愿值');
                              e.target.value = 0.0;
                              return;
                          }
                          dispatch({ type:ChangeElectricValue, payload: {value: e.target.value} })
                      } }
                      className={`${stl.myinput} `}
                      min={0}
                      type="number"/> <span className={stl.unit}>kW</span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>指令类型:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}>
                    <span ref={ElementType}>尚未选择</span>
                </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>总需求电荷量:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}>
                    <span ref={ElementAllValueElectric}>0</span>  <span >kW</span>
                </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>总发放积分:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}>
                    <span ref={ElementAllCoin}>0</span>
                </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>下发时间:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}>
                    <span ref={ElementCreateTime}>...</span>
                </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>预计执行时间:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}>
                    <span ref={ElementCarryOutTime}>...</span>
                </span>
            </div>
            <div className="flex-layout margin-top-25px ">
                <div className='flex-item-5 padding-left-15px'>

                </div>
                <div className='flex-item-5 text-align-right '>
                    <button onClick={onSubmitEvent}  className="FUIButton FUI-btnBlue margin-left-15px ">
                        <span className='glyphicon glyphicon-upload margin-right-5px' ></span>
                        立即执行
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportingTheAbilityDetail;
