var express = require('express')
var router = express.Router();
var ContractData = require('./data');

/**
 * /contract/echart
 */
router.get('/echart', function (req, res) {
    res.status(200).json(
        {
            transactionType: [
                { value: 150, name: '需求指令合同' },
                { value: 14, name: '积分交易合同' },
                { value: 51, name: '电荷交易合同' },
            ],
            transactionVolume:{
                total:[150, 14, 51, 215],
                month:[20, 12, 32, 64]
            },
            recentTransaction:{
                requirement:[0, 2, 0, 1, 0, 0, 0],
                credit:[2, 3, 5, 4, 2, 4, 5],
                electric:[0, 1, 5, 4, 2, 0, 1]
            }
        }
    );
});


/**
 * /contract/contracts
 */
 router.post('/contracts', function (req, res) {
    console.log('检索条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('检索条件: ----------------------------- |'  );
    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    
    let count = req.body.count;
    let pageIndex = req.body.pageIndex;

    let dataFilter = ContractData.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    })

    let pageCount = Math.ceil(ContractData.length / count);

    res.status(200).json({
        total:ContractData.length,
        data:dataFilter,
        pageCount
    });
});


module.exports = router
