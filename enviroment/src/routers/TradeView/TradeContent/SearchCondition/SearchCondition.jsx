import React from 'react';
import stl from './SearchCondition.module.scss';
import Select from "../../../../components/public/from/Select/Select";
import SortIcon from "./SortIcon/SortIcon";

const TransactionType = [
    {name: '全部交易', value: -1},
    {name: '电力交易', value: 1},
    {name: '积分交易', value: 2}
];

const directions = [
    {name: '全部指令', value: -1},
    {name: '指令1', value: 1},
    {name: '指令2', value: 2}
];

const nums = [
    {name: '每页6条', value: 6},
    {name: '每页8条', value: 8},
    {name: '每页10条', value: 10},
    {name: '每页12条', value: 12},
];

const conditionInitial = {
    transactionType: -1,
    direction: -1,
    timeSort: 1,  /*降序为1 升序为 0*/
    giveSort: 1, /**/
    needSort:1,  /**/
    count: 6,
};

function SearchCondition(props) {

    const [condition, setCondition] = React.useState(conditionInitial);

    const getCondition = React.useCallback(attr => {
        return v => {
            condition[attr] = v;
            setCondition({...condition});
        }
    }, [condition]);


    return (
        <div className={stl.search}>
            <div className={stl.line}>
                <span className={stl.label}>交易类型：</span>
                <Select options={TransactionType} sendData={getCondition('transactionType')}  />
                <span className={stl.labelLeave}>选择指令：</span>
                <Select options={directions} sendData={getCondition('direction')}  />
                <span className={stl.labelLeave}>显示数目：</span>
                <Select options={nums} sendData={getCondition('count')}  />
            </div>
            <div className={stl.line}>
                <label htmlFor='myCheck'>
                    <input id='myCheck' type='checkbox' ></input>
                    <span className={`${stl.icon}`}> 我的发布</span>
                </label>
                <label htmlFor='Negotiability' className={'margin-left-15px'}>
                    <input id='Negotiability' type='checkbox' ></input>
                    <span className={`${stl.icon}`}> 是否可协商</span>
                </label>
                <SortIcon meaning={['时间降序', '时间升序']} getSort={getCondition('timeSort')} />
                <SortIcon meaning={['需求值降序', '需求值升序']} getSort={getCondition('needSort')} />
                <SortIcon meaning={['给与值降序', '给与值升序']} getSort={getCondition('giveSort')} />
                <button className={stl.myButton}>
                    <span className="glyphicon glyphicon-search"></span>
                    点击查询
                </button>
            </div>
        </div>
    );
}

export default SearchCondition;
