import React from 'react';
import stl from './ShowDirectionProgressDetail.module.scss';
import {getDirectionProgressRequest} from "../../../../axios/directionRequests";

function ShowDirectionProgressDetail(props) {

    let [Progress, setProgress] = React.useState({
        isShow: false,
        progress: []
    });

    React.useEffect(() =>{
        getDirectionProgressRequest({ cmdId: props.direction.cmdId }, data => {
            setProgress({
                isShow: true,
                progress: data.progress
            })
        });
    }, []);

    return (
        <div className={stl.progressContainer}>
            {
                Progress.isShow?
                    Progress.progress.map( element => (
                        <div className={stl.myStateLine} key={element.name}>
                            <span className={stl.myState}>{element.name}</span>
                            <span className={stl.myStateAnswer}>
                                {
                                    element.state ===1?<span className={stl.finish}>完成</span>:""
                                }
                                {
                                    element.state ===2?<span className={stl.nowCarry}>执行中...</span>:""
                                }
                                {
                                    element.state ===3?<span className={stl.didntfinish}>未执行...</span>:""
                                }
                                {
                                    element.state ===4?<span className={stl.failure}>已失败</span>:""
                                }
                                <span className={stl.finishDateTime}>{element.finishDataTime}</span>
                           </span>
                        </div>
                    ) ):(
                        <div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>指令初始化</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>指令上链</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>链上广播</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>需求响应生成</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>合同上链</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>楼宇签署</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>等待需求响应完成</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>需求响应执行完毕</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>响应结果评估</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>积分发放</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>信誉分发放</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                            <div className={stl.myStateLine}>
                                <span className={stl.myState}>指令完成</span>
                                <span className={stl.myStateAnswer}>
                                    <span className={stl.didntfinish}>待执行..</span>
                                    <span className={stl.finishDateTime}/>
                               </span>
                            </div>
                        </div>
                    )
            }
            <div className="flex-layout margin-top-25px ">
                <div className='flex-item-5 padding-left-15px'>

                </div>
                <div className='flex-item-5 text-align-right '>
                    <button onClick={props.close}  className="FUIButton FUI-btnBlue margin-left-15px ">
                        <span className='glyphicon glyphicon-folder-close margin-right-5px' ></span>
                        立即关闭
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShowDirectionProgressDetail;