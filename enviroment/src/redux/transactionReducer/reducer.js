
const InitialState = {
    TransactionTypes:[{name:'全部类型', value: -1},{name:'电力交易', value: 1},{name: '积分交易', value: 2}],
    transactionStates:[{name:'全部类型', value: -1},{name:'正常', value: 1},{name: '已取消', value: 2},{name: '已拒绝', value: 3}],
    transactionTypesDefaultValue: -1, /* 默认值 */
    transactionStateSDefaultValue: -1,
}


export default function reducer(state, action){
    const {data, type} = action;
    switch (type) {
        default:
            return InitialState;
    }
}
