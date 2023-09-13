import React, {Component} from 'react';
import stl from './TransactionDivisionPage.module.scss';

const initialState = {
    pageIndex: 0,
    prevIsDisiable: false,
    nextIsDisiable:false,
    pageCount:2,
}

function divisionReducer(state, action) {
    return state;
}

function TransactionDivisionPage(props) {

    let [division, setDivision] = React.useReducer(divisionReducer, initialState, undefined);


    let pageIndex = division.pageIndex + 1
    let prevIsDisiable = division.prevIsDisiable;
    let nextIsDisiable = division.nextIsDisiable;
    const pageCount = division.pageCount;
    let options = [];
    for(let i = 0; i <pageCount; i++){
        options.push(i);
    }

    return (
        <div className={stl.division}>
            <div className="float-layout">
                <label className="float-left font-weight-600 ">
                    <span className={stl.item}>...</span>
                </label>
                <div className="float-right">
                    <button className={stl.linkDetailButton}>
                        首页
                    </button>
                    <button  className={stl.linkDetailButton}>
                        <span className="glyphicon glyphicon-chevron-left"></span>上一页
                    </button>
                    <button   className={stl.linkDetailButton} >
                        下一页 <span className="glyphicon glyphicon-chevron-right"></span>
                    </button>
                    <button  className={stl.linkDetailButton} >
                        尾页
                    </button>
                    <select className={stl.MySelect}>
                        {options.map((v,i)=>{
                            return <option value={i} key={v} >第{v + 1}页</option>
                        })}
                    </select>
                    <button  className={stl.linkDetailButton}>跳转</button>
                </div>
            </div>
        </div>
    );
}


export default TransactionDivisionPage;
