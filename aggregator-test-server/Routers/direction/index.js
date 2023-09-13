var express = require('express');
var router = express.Router();
var DirectionsData = require('./datas');

/**
 * /direction/about
 */
router.post('/issue', function (req, res) {
    console.log("----------------------------");
    console.log(req.body);
    console.log("----------------------------");
    if(req.body.directionType == 0){
        res.status(200).json({
            isOk: true,
            code : 200
        }).end();
    }else{
        res.status(405).json({
            message: '就随便错点啥！好玩，啊！',
            code : 200
        }).end();
    }
});


router.post('/state', function (req, res) {
    const num = Math.ceil((Math.random() * 100));
    if(num > 40){
        res.status(200).json({
            count: 37,
            dateTime:'2021/2/21 15:12:15',
            directionSystemState: true, /* 执行或者没有执行 */
            directionKetch: '削峰指令ACFD15239875' ,
            code : 200
        }).end();
    }else{
        res.status(200).json({
            count: 36,
            dateTime:'2021/2/21 15:12:15',
            directionSystemState: false, /* 执行或者没有执行 */
            directionKetch: '' ,
            code : 200
        }).end();
    }

});

router.get('/type', function (req, res) {
    res.status(200).json(
        {
            data: [
                {value:10, name:'链上广播'},
                {value:2, name:'下发合同'},
                {value:7, name:'等待执行完成'},
                {value:0, name:'指令完成'}
            ],
            code : 200
        }
    ).end();
});

router.get('/electric', function (req, res) {
    res.status(200).json(
        {
            code : 200,
            nodes: ['A123', '1234', '234', '1235', '4456', '456', '786','1232', 'g1234', 's234', '123d5', '44a56', '456s', '78d6'],  /* 节点编号 */
            acceptableValue:[120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130] /* 请和上面节点编号一一对应 */
        }
    ).end();
});


//检索指令信息
router.post('/directions', function(req, res){
    console.log('检索条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('检索条件: ----------------------------- |'  );
    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;

    let dataFilter = DirectionsData.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    })

    let pageCount = Math.ceil(DirectionsData.length / count);

    res.status(200).json({
        total:DirectionsData.length,
        data:dataFilter,
        pageCount,
        code : 200
    });
});


module.exports = router




