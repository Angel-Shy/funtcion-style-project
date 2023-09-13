let express = require('express');
let router = express.Router();
let nodes = require('./data');


/**
 * /internet/add
 */
 router.post('/add', function (req, res) {
    console.log("internet/add 请求参数----------------------------");
    console.log(req.body);
    console.log("----------------------------");
    if(Math.ceil(Math.random() * 10) > 7){
        res.status(200).json({
            isOk: true,
            code : 200
        }).end();
    }else{
        res.status(405).json({
            message: '我也不知道是什么错误，反正就是错误了！',
            code : 417
        }).end();
    }
});


/**
 * /internet/echart
 */
 router.get('/echart', function (req, res) {
    res.status(200).json({
        nodesState:[{ value: 21, name: '在线节点' },{ value: 2, name: '离线节点' }],
        nodeCreditAndReputation:{
            nodes: ['AD11', 'AD112', 'AD122', 'DD12', 'QD12', 'DD12', 'ACD12', 'AVBD12', 'SAD12', 'SAD12', 'CAD12', 'ADS12','AD11', 'AD112', 'AD122', 'DD12', 'QD12', 'DD12', 'ACD12', 'AVBD12', 'SAD12', 'SAD12', 'CAD12', 'ADS12'],
            credit: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            reputation:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        code : 200
    });
});



/**
 * /internet/nodes
 */
        
router.post('/nodes', function(req, res){
    console.log('检索条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('检索条件: ----------------------------- |'  );
    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;

    let dataFilter = nodes.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    })

    let pageCount = Math.ceil(nodes.length / count);

    res.status(200).json({
        total:nodes.length,
        data:dataFilter,
        pageCount,
        code : 200
    });
});



router.delete('/delete', function(req, res){
    console.log('获得的删除条件: ----------------------------- |'  );
    console.log(req.query);
    console.log('获得的删除条件: ----------------------------- |'  );
    //我只要页数
    if(Math.ceil(Math.random() * 10) > 7){
        res.status(200).json({
            isOk: true,
            code : 200
        });
    }else{
        res.status(511).json({
            message: '我不允许你删除它！ 你懂吗？',
            code : 417
        });
    }

});


router.get('/node', function(req, res){
    console.log('获得的检索条件: ----------------------------- |'  );
    console.log(req.query);
    console.log('检索条件: ----------------------------- |'  );

    res.status(200).json({
        id:1, /* 节点编号，你懂的，一般是数据库里面的主键 */
        codeId:'AAAA111',/* 编号，这是用来看的 */
        ipAddress:"58.33.31.223",/* 当前IP地址 */
        address:"上海市浦东新区年家浜路518号万达广场", /* 地址 */
        credit:34, /* 积分  */
        reputation:60, /* 信誉分 */
        states:"正常运行中", /* 在线或者离线 */
        phone:"028-8526597", /* 电话 */
        addTime:"2021/12/10 15:23:56", /* 什么时候添加这个节点的 */
        code : 200
    })
});


module.exports = router;