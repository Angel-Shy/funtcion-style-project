let express = require('express');
const { route } = require('express/lib/application');
let router = express.Router();
let blocks = require('./fdata');

router.post('/blocks', function(req, res){
    console.log('blocks:检索条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('blocks:检索条件: ----------------------------- |'  );
    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;

    let dataFilter = blocks.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    })

    let pageCount = Math.ceil(blocks.length / count);

    res.status(200).json({
        total:blocks.length,
        data:dataFilter,
        pageCount,
        code : 200
    });
});



router.get('/top', function(req, res){
    let dataFilter = blocks.filter((obj, i)=> {
        if( i >= 0  && i < 10 ){
            return obj;
        } 
    })

    res.status(200).json({
        data:dataFilter,
        code : 200
    });
});


router.get('/echart', function(req, res){
    res.status(200).json({
        blockNet:{
            netState:"网络正常",
            online: 21,
            allNode: 23,
            offLineNode: 2,
            number: 512,
            dayBlocks: 5, /* 今日产生区块量 */
            weekBlocks: 25, /* 本周产生区块量 */
            mathematic: "PBFT共识算法",
            TPS: '1100.0 事务/秒',  /* 额标TPS */
            Hash: 'SHA-256', /* 信息摘要算法 */
            midSize: '15.845Kb' /* 区块大小中位数 */
        },
        code : 200,
        nodes: ['AD12', 'AA112', 'SD123', 'DDX12', 'QD12', 'ADD12', 'ACD12', 'AVSBD', 'BDD12', 'ASDQQG', '4KISD' ] /* 聚合商节点编号 + 节点编号 */
    });
})

module.exports = router;

