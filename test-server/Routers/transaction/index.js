let express = require('express');
let router = express.Router();

let transactions = require('./transactions.js');

router.post('/transactions', function(req, res){
    console.log('transactions:检索条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('transactions:检索条件: ----------------------------- |'  );
    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    

    //pageIndex 从 1 开始
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;

    //筛查
    let dataFilter = transactions.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    })

    let pageCount = Math.ceil(transactions.length / count);

    res.status(200).json({
        total:transactions.length,
        data:dataFilter,
        pageCount
    });
});

//检索甲方为自己且当前有效的甲方未签署的且未撤销的交易
router.post('/erequest', function(req, res){
    console.log("/trade/erequest 请求参数 ----------------------------");
    console.log(req.body);
    console.log("/trade/erequest 请求参数 ----------------------------");

    let trans__ = transactions.filter( (obj, idx) => {
        if(obj.partyA == 12 && obj.state == 1 && obj.type == 3){
            return obj;
        }
    });

    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    


    //pageIndex 从 1 开始
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;
    //筛查
    let dataFilter = trans__.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    });

    let pageCount = Math.ceil(trans__.length / count);

    res.status(200).json({
        total:trans__.length,
        data:dataFilter,
        pageCount
    });
});

router.post('/epublish', function(req, res){
    console.log("/trade/epublish 请求参数 ----------------------------");
    console.log(req.body);
    console.log("/trade/epublish 请求参数 ----------------------------");

    let trans__ = transactions.filter( (obj, idx) => {
        if(obj.partyA == 12  && obj.type == 3){
            return obj;
        }
    });

    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    


    //pageIndex 从 1 开始
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;
    //筛查
    let dataFilter = trans__.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    });

    let pageCount = Math.ceil(trans__.length / count);

    res.status(200).json({
        total:trans__.length,
        data:dataFilter,
        pageCount
    });
});


router.post('/refuse', function(req,res){
    console.log("/trade/erefuse 111 请求参数 ----------------------------");
    console.log(req.body);
    console.log("/trade/erefuse 111 请求参数 ----------------------------");


    if(Math.ceil(Math.random() * 10) > 5){
        res.status(200).json({
            isOk: true
        }).end();
    }else{
        res.status(405).json({
            message: '错误啦，错误原因，不告诉你！'
        }).end();
    }
});


router.post('/agree', function(req,res){
    console.log("/trade/eagree 请求参数 ----------------------------");
    console.log(req.body);
    console.log("/trade/eagree 请求参数 ----------------------------");


    if(Math.ceil(Math.random() * 10) > 5){
        res.status(200).json({
            isOk: true
        }).end();
    }else{
        res.status(405).json({
            message: '错误啦，错误原因，不告诉你！'
        }).end();
    }
});

router.post('/cancel', function(req,res){
    console.log("/trade/ecancel 请求参数 ----------------------------");
    console.log(req.body);
    console.log("/trade/ecancel 请求参数 ----------------------------");


    if(Math.ceil(Math.random() * 10) > 5){
        res.status(200).json({
            isOk: true
        }).end();
    }else{
        res.status(405).json({
            message: '错误啦，错误原因，不告诉你！'
        }).end();
    }
});

//检索甲方为自己且当前有效的甲方未签署的且未撤销的积分交易
router.post('/crequest', function(req, res){
    console.log("/trade/crequest 请求参数 ----------------------------");
    console.log(req.body);
    console.log("/trade/crequest 请求参数 ----------------------------");

    let trans__ = transactions.filter( (obj, idx) => {
        if(obj.partyA == 12 && obj.state == 1 && obj.type == 2){
            return obj;
        }
    });

    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    


    //pageIndex 从 1 开始
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;
    //筛查
    let dataFilter = trans__.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    });

    let pageCount = Math.ceil(trans__.length / count);

    res.status(200).json({
        total:trans__.length,
        data:dataFilter,
        pageCount
    });
});


router.post('/cpublish', function(req, res){
    console.log("/trade/cpublish 请求参数 ----------------------------");
    console.log(req.body);
    console.log("/trade/cpublish 请求参数 ----------------------------");

    let trans__ = transactions.filter( (obj, idx) => {
        if(obj.partyA == 12  && obj.type == 2){
            return obj;
        }
    });

    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    


    //pageIndex 从 1 开始
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;
    //筛查
    let dataFilter = trans__.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    });

    let pageCount = Math.ceil(trans__.length / count);

    res.status(200).json({
        total:trans__.length,
        data:dataFilter,
        pageCount
    });
});

module.exports = router;