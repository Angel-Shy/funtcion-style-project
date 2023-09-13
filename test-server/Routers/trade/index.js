let express = require('express');
let router = express.Router();

let requirements = require('./requirements.js');

/**
 * /trade/electric
 * 添加 一个电力交易需求
 */
 router.post('/electric', function (req, res) {
    console.log("/trade/electric 请求参数----------------------------");
    console.log(req.body);
    console.log("----------------------------");
    if(Math.ceil(Math.random() * 10) > 3){
        res.status(200).json({
            isOk: true
        }).end();
    }else{
        res.status(405).json({
            message: '我也不知道是什么错误，反正就是错误了！'
        }).end();
    }
});


/**
 * /trade/electric
 * 添加 一个积分交易需求
 */
 router.post('/credit', function (req, res) {
    console.log("/trade/credit 请求参数----------------------------");
    console.log(req.body);
    console.log("----------------------------");
    if(Math.ceil(Math.random() * 10) > 3){
        res.status(200).json({
            isOk: true
        }).end();
    }else{
        res.status(405).json({
            message: '我也不知道是什么错误，反正就是错误了！'
        }).end();
    }
});


/**
 * 交易市场 检索
 */
router.post('/market', function(req,res){
    console.log("/trade/market 请求参数 ----------------------------");
    console.log(req.body);
    console.log("/trade/market 请求参数 ----------------------------");

    console.log(req.body.count,req.body.pageIndex);    

    //pageIndex 从 1 开始
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;

    //筛查
    let dataFilter = requirements.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    })

    let pageCount = Math.ceil(requirements.length / count);

    res.status(200).json({
        total:requirements.length,
        data:dataFilter,
        pageCount
    });
});

/**
 * 交易市场 检索
 */
 router.post('/purchase', function(req,res){
    console.log("/trade/purchase 请求参数 ----------------------------");
    console.log(req.body);
    console.log("/trade/purchase 请求参数 ----------------------------");


    if(Math.ceil(Math.random() * 10) > 3){
        res.status(200).json({
            isOk: true
        }).end();
    }else{
        res.status(405).json({
            message: '你的交易无法产生哦！错误原因，不告诉你'
        }).end();
    }
});


module.exports = router;