import React from 'react';
import {connect} from "react-redux";
import stl from './PublishElectricityTransactions.module.scss';
import Select from "../../../../components/public/from/Select/Select";
import {publishTradeElectricRequest, getDirectionRequest} from "../../../../axios/tradeRequests";
import {NotifyMessage} from "../../../../pubsub";

function PublishElectricityTransactions(props) {

    /* 初次登录 从redux 取得指令列表信息 */
    React.useEffect(() => {
        flashDirection(props.directions);
    }, []);

    /* 用户刷新事件 */
    const flashDirectionFromServer= e => {
        getDirectionRequest(data => {
            flashDirection(data.data);
        });
    }

    function flashDirection(directions) {
        let dircs = directions.map(d => {
            return {name: d.codeName, value:d.index};
        });
        dircs.unshift({name: '请选择待执行指令...', value: -1});
        setDirection(dircs);
    }

   /* 存储指令信息 */
   const [directions, setDirection] = React.useState([]);
   /* 用户的搜索条件 */
   const [Condition, setCondition] = React.useState({
        directionID:-1,
        isCanConsult: false,
        electric:-1,
        credit: -1
    });
    /* 显示用户参数错误信息，用在请求发送之前 */
    const [myError, setError] = React.useState({
        isShow: false,
        ErrorMessage:'错误信息！'
    });

    const [rate, setRate] = React.useState(-1);

   /* 移除红色文字错误提示 */
   const removeErrorMessage = () => {
       setError({
           isShow: false,
           ErrorMessage:'错误信息！'
       });
   }
   /* 监听Select */
   const getState = attr => {
     return (v) => {
         Condition[attr] = v;
         setCondition({...Condition});
     }
   }
   /* 监听 input onchange 事件 */
   const onChangeState = attr=>{
       return (e) => {
           Condition[attr] = e.target.value;
           if (Condition.electric > 0 && Condition.credit > 0){
               setRate(Condition.electric / Condition.credit);
           }
       }
   }
   /* 提交表单 */
   /* 依赖于 Condition 因为要提交表单信息 */
   const onSubmit = React.useCallback(()=> {

       let electric = parseFloat(Condition.electric);
       let credit = parseFloat(Condition.credit);

       if (Number.isNaN(electric) || electric < 0 ){
           NotifyMessage('负荷值输入不合理,必须大于等于0');
           return;
       }

       if (Number.isNaN(credit) || credit < 0 ){
           NotifyMessage('积分值输入不合理,必须大于等于0');
           return;
       }

       if (Condition.directionID == -1){
           NotifyMessage('当前系统没有可执行指令，或未选择指令！');
           return;
       }

      if(checkElements([electricElement, creditElement]) == 0){
          publishTradeElectricRequest(Condition, props.close);
      }else{
          NotifyMessage('请输入负荷量或积分值！');
      };

   }, [Condition]);

   let electricElement = React.useRef();
   let creditElement = React.useRef();

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
   const focusContent = (e) => {
        let tagName = e.target.tagName.toLowerCase();
        if ( tagName == 'input' || tagName == 'textarea' ){
            e.target.classList.remove(stl.errorInput);
        }
    }

    return (
        <div className={stl.electricContainer} onFocus={focusContent}>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>需求预编号:</span>
                <span className={`${stl.myStateAnswer} ${stl.itemState}`}> [系统自动生成电力交易需求编号] </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>所属指令:</span>
                <span className={stl.myStateAnswer}>
                  <Select sendData={getState('directionID')} options={directions}  />
                   <button onClick={flashDirectionFromServer} className={'FUIButton FUI-btnWhite margin-left-15px'}>
                        <span className={'glyphicon glyphicon-circle-arrow-left'}></span>
                        刷新指令
                    </button>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>需求负荷:</span>
                <span className={stl.myStateAnswer}>
                  <input
                      ref={electricElement}
                      onChange={onChangeState('electric')}
                      className={`${stl.myinput} ${stl.myinputLong}`}
                      min={0}
                      type="number"/> <span className={stl.unit}>kW</span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>给出积分量:</span>
                <span className={stl.myStateAnswer}>
                  <input
                      ref={creditElement}
                      onChange={onChangeState('credit')}
                      className={`${stl.myinput} ${stl.myinputLong}`}
                      min={0}
                      type="number"/>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>电力积分交易比:</span>
                <span className={stl.myStateAnswer}>
                  <span className={`${stl.itemState}`}>
                    {(rate == -1)?'自动计算': `${rate} kW : 1积分` }
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
                      {Condition.directionID == -1?'以指令开始执行时间前一个小时为准！': props.directions.filter(di => di.index == Condition.directionID)[0]?.carryOutTime}
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
                  <span className={`${stl.itemState}`}>电力交易 (发起方需要负荷， 并给于积分)</span>
               </span>
            </div>
            <div className="flex-layout margin-top-25px ">
                <div className='flex-item-5 padding-left-15px'>
                    {myError.isShow?<span className={stl.errorMessageFromServer}>{myError.ErrorMessage}</span>: ''}
                    {myError.isShow?<span onClick={removeErrorMessage} className={`glyphicon glyphicon-remove ${stl.pointer}`}></span>:''}
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

export default connect(mapStateToProps, {})(PublishElectricityTransactions);
