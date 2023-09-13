import React from 'react';

function Index(props) {
    let msg = props.operation.message;
    return (
        <div className={'operation float-layout '} >
            <span className={'sequence'}>{props.idx}</span>
            <span className={'timer'}>{props.operation.dateTime}</span>
            <span className={'detail'} dangerouslySetInnerHTML={{ __html: props.operation.message }}  ></span>
            <div className={'remark'}>
                {props.operation.result ? <span className={'icon glyphicon glyphicon-ok'}></span>:<span className={'fail-icon glyphicon glyphicon-remove'}></span>} 
                <span className={'system'}>操作结果</span>
                <span className='result'>{props.operation.result?"成功":"失败"}</span>
            </div>
        </div>
    );
}

export default Index;