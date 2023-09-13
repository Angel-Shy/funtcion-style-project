import React from 'react';
import LifeOperation from "./LifeOperation";

function Index(props) {
    let operationDays = props.lifeStage.operationDay;
    return (
        <div className='history-direction-initial'>
            <div className={'container-history'}>
                <div className={'parent-pointer'}>
                    <span className={'pointer'}></span>
                </div>
                {
                    operationDays.map((day, idx) =>{
                        return (<div key={day.date}  className={'operation-container'}>
                            <div className="header">{day.date}</div>
                            {day.operations.map((op, idx) => {
                                return <LifeOperation key={idx}  operation={op} idx={op.index} />
                            })}
                        </div>)
                    })
                }
            </div>
        </div>
    );
}

export default Index;