import React, {useReducer, useEffect} from 'react';
import stl from './PublishCreditTransactions.module.scss';
import {connect} from "react-redux";
import Select from "../../../../components/public/from/Select/Select";
import {
    getDirectionRequest,
    publishTradeCreditRequest
} from "../../../../axios/tradeRequests";
import {NotifyMessage} from "../../../../pubsub";

const StoreDirection = 'StoreDirection';
const StoreElectric = 'StoreElectric';
const StoreCredit = 'StoreCredit';
const StoreDirectionID = 'StoreDirectionID';
const Consult = 'Consult';
const SetError = 'SetError';
const CloseError = 'CloseError';

const initail = {
    directions: [],
    condition: {
        directionID:-1,
        isCanConsult: false,
        electric:-1,
        credit: -1
    },
    rate:-1,
    error:{
        isShow: false,
        ErrorMessage:'错误信息！'
    }
};

function reducer(state, action) {
    switch (action.type) {
        case StoreDirection:
            let dircs = action.payload.directions.map(d => {
                return {name: d.codeName, value:d.index};
            });
            dircs.unshift({name: '请选择待执行指令...', value: -1});
            state.directions = dircs;
            return {...state};
        case StoreElectric:
            state.condition.electric = action.payload.value;
            if (state.condition.electric > 0 && state.condition.credit > 0){
                state.rate = state.condition.electric / state.condition.credit;
            }
            return {...state};
        case StoreCredit:
            state.condition.credit = action.payload.value;
            if (state.condition.electric > 0 && state.condition.credit > 0){
                state.rate = state.condition.electric / state.condition.credit;
            }
            return {...state};
        case StoreDirectionID:
            state.condition.directionID = action.payload.value;
            return {...state};
        case Consult:
            state.condition.isCanConsult = action.payload.value;
            return {...state};
        case SetError:
            state.error.isShow = true;
            state.error.ErrorMessage = action.payload.message;
            return {...state};
        case CloseError:
            state.error.isShow = false;
            state.error.ErrorMessage = '';
        default:
            return state;
    }
}

function PublishCreditTransactions(props) {

    useEffect(() => {
        let action = {type: StoreDirection, payload: {directions: props.directions}};
        dispatch(action);
    }, []);

    const [store, dispatch] = useReducer(reducer, initail);

    const getState = attr => {
        return (v) => {
            let action = {};
            if (attr == 'directionID'){
                action = {type: StoreDirectionID, payload: {value: v}};
            } else if(attr == 'isCanConsult'){
                action = {type: Consult, payload: {value: v}};
            }
            dispatch(action);
        }
    }

    const flashDirectionFromServer = e => {
        getDirectionRequest(data => {
            console.log(data);
            let action = {type: StoreDirection, payload: {directions: data.data}};
            dispatch(action);
        });
    }
    /* 检查表单是否填写 没有填写 加上红色框框*/
    function checkElements(elements){
        let errorCount = 0;
        elements.forEach(element=>{
            if (element.current.value ===  ''){
                element.current.classList.add(stl.errorInput);
                errorCount++;
            }
        });
        return errorCount;
    }

    let electricElement = React.useRef();
    let creditElement = React.useRef();

    const focusContent = (e) => {
        let tagName = e.target.tagName.toLowerCase();
        if ( tagName == 'input' || tagName == 'textarea' ){
            e.target.classList.remove(stl.errorInput);
        }
    }

    /* 监听 input onchange 事件 */
    const onChangeElectricState = attr=>{
        return (e) => {
            let action = {type: StoreElectric, payload: {value: e.target.value}};
            dispatch(action);
        }
    }
    /* 监听 input onchange 事件 */
    const onChangeCreditState = attr=>{
        return (e) => {
            let action = {type: StoreCredit, payload: {value: e.target.value}};
            dispatch(action);
        }
    }

    /* 提交表单 */
    /* 依赖于 Condition 因为要提交表单信息 */
    const onSubmit = React.useCallback((e)=> {
        e.preventDefault();

        let electric = parseFloat(store.condition.electric);
        let credit = parseFloat(store.condition.credit);

        if (Number.isNaN(electric) || electric < 0 ){
            NotifyMessage('负荷值输入不合理,必须大于等于0');
            return;
        }

        if (Number.isNaN(credit) || credit < 0 ){
            NotifyMessage('积分值输入不合理,必须大于等于0');
            return;
        }

        if (store.condition.directionID == -1){
            NotifyMessage('当前系统没有可执行指令，或未选择指令！');
            return;
        }


        if(checkElements([electricElement, creditElement]) == 0){
            publishTradeCreditRequest(store.condition, props.close);
        }else{
            NotifyMessage('请输入负荷量或积分值！');
        };

    }, [store]);

    const removeErrorMessage = () => {
        let action = {type: CloseError, payload: {}};
        dispatch(action);
    }



    return (
        <div className={stl.creditContainer} onFocus={focusContent}>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>需求预编号:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}> [系统自动生成积分需求交易编号] </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>所属指令:</span>
                <span className={stl.myStateAnswer}>
                  <Select sendData={getState('directionID')} options={store.directions}  />
                    <button onClick={flashDirectionFromServer} className={'FUIButton FUI-btnWhite margin-left-15px'}>
                        <span className={'glyphicon glyphicon-circle-arrow-left'}></span>
                        刷新指令
                    </button>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>可出售负荷量:</span>
                <span className={stl.myStateAnswer}>
                  <input
                      ref={electricElement}
                      onChange={onChangeElectricState('electric')}
                      className={`${stl.myinput} ${stl.myinputLong}`}
                      min={0}
                      type="number"/> <span className={stl.unit}>kW</span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>预计获得积分:</span>
                <span className={stl.myStateAnswer}>
                  <input
                      ref={creditElement}
                      onChange={onChangeCreditState('credit')}
                      className={`${stl.myinput} ${stl.myinputLong}`}
                      min={0}
                      type="number"/>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>电力积分交易比:</span>
                <span className={stl.myStateAnswer}>
                  <span className={`${stl.itemState}`}>
                    {(store.rate == -1)?'自动计算': `${store.rate} kW : 1积分` }
                  </span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>发布时间:</span>
                <span className={stl.myStateAnswer}>
                  <span className={` ${stl.itemState}`}> {new Date(Date.now()).toLocaleString()} [参考时间 - 以系统收到请求时间为准] </span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>截止时间:</span>
                <span className={stl.myStateAnswer}>
                  <span className={` ${stl.itemState}`}>
                      {store.condition.directionID == -1?'以指令开始执行时间前一个小时为准！': props.directions.filter(dr => dr.index == store.condition.directionID)[0].carryOutTime}
                  </span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>积分是否可协商:</span>
                <span className={stl.myStateAnswer}>
                  <Select sendData={getState('isCanConsult')} options={[{name:'不可协商', value: false}, {name:'可以协商', value: true}]}  />
                    <span
                        title={'例子：如果你需要500kW，并给出5积分！ 如果不可协商，那么固定比率 100kW 兑换 1积分！对方只能决定卖多少电力！类似于超市商品不讲价，反之就是可以讲价！'}
                        className={'glyphicon glyphicon-question-sign margin-left-10px'}></span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>交易类型:</span>
                <span className={stl.myStateAnswer}>
                  <span className={` ${stl.itemState}`}>积分交易 (发起方需要积分， 并给承担负荷调控任务)</span>
               </span>
            </div>
            <div className="flex-layout margin-top-25px ">
                <div className='flex-item-5 padding-left-15px'>
                    {store.error.isShow?<span className={stl.errorMessageFromServer}>{store.error.ErrorMessage}</span>: ''}
                    {store.error.isShow?<span onClick={removeErrorMessage} className={`glyphicon glyphicon-remove ${stl.pointer}`}></span>:''}
                </div>
                <div className='flex-item-5 text-align-right '>
                    <button onClick={props.close}  className="FUIButton  FUI-btnWhite ">
                        <span className='glyphicon glyphicon-remove'></span>
                        操作取消
                    </button>
                    <button onClick={onSubmit}  className="FUIButton FUI-btnBlack margin-left-15px ">
                        <span className='glyphicon glyphicon-ok'></span>
                        立即执行
                    </button>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return state.directions;
}

export default connect(mapStateToProps, {})(PublishCreditTransactions);
