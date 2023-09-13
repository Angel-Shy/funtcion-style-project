let express = require('express');
let router = express.Router();
let ContractData = require('./vData');
let reportDatas =  require('./reportData');

/* 节点信息 */
router.get('/basic', function(req, res){
    let userInfo = {
        isOnline: true,
        lastReportDateTime: '2022/6/02 15:40:12',//上次上报时间
        address: '成都市成华区中铁瑞城大厦1254号', //真实地址
        points: 11511.64652 ,//拥有的积分
        reputation: 102.564 ,//信誉分
        waitPoint:1554646.12 ,//待获得积分
        contractCount:32 ,//参与合同数量
    }

    if(Math.ceil(Math.random() * 10) > 0){
        res.status(200).json(userInfo).end();
    }else{
        res.status(405).json({
            message: '错误信息'
        }).end();
    }
});

//上报
router.post('/report', function(req, res){
    console.log('report:检索条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('report:检索条件: ----------------------------- |'  );

    if(Math.ceil(Math.random() * 10) > 3){
        res.status(200).json({
            isOk: true
        }).end();
    }else{
        res.status(417).json({
            message: '错误了哦！你懂吗？谢谢哦！'
        }).end();
    }
});

/**
 * /dashboard/contracts
 */
 router.post('/contracts', function (req, res) {
    console.log('检索条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('检索条件: ----------------------------- |'  );

    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;

    //数据筛选
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

//
router.post('/reports', function (req, res) {
    console.log('检索条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('检索条件: ----------------------------- |'  );

    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;

    //数据筛选
    let dataFilter = reportDatas.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    })

    let pageCount = Math.ceil(reportDatas.length / count);

    res.status(200).json({
        total:reportDatas.length,
        data:dataFilter,
        pageCount
    });
});


router.get('/year', function(req, res){
    console.log('请求参数: ----------------------------- |'  );
    console.log(req.query);
    console.log('请求参数: ----------------------------- |'  );

    if(Math.ceil(Math.random() * 10) > 0){

        if(req.query.year == '2022'){
            res.status(200).json({
                quarterly: [
                    { value: 12, name: '第一季度' },
                    { value: 23, name: '第二季度' },
                    { value: 5, name: '第三季度' },
                    { value: 0, name: '第四季度' }
                ]
            }).end();
        }else{
            res.status(200).json({
                quarterly: [
                    { value: 31, name: '第一季度' },
                    { value: 38, name: '第二季度' },
                    { value: 42, name: '第三季度' },
                    { value: 53, name: '第四季度' }
                ]
            }).end();
        }


    }else{
        res.status(405).json({
            message: '错误信息'
        }).end();
    }
});


router.get('/electric', function(req, res){
    
    if(Math.ceil(Math.random() * 10) > 0){
        res.status(200).json({
            finishRate: (Math.random() * 100).toFixed(2), //表示89.12% 完成质量
            totalElectricValue: 2590, //总共得到了多少任务量
            ElectricUnit: 'kw',
            actualFinishElectricValue: 2100, //实际完成电荷量
            waitingFinishElectricValue: 270, //待完成电荷量
            months:['前六月', '前五月', '前四月', '前三月', '前二月', '前一月', '今月'],
            values:[ 857, 784, 982, 102, 145, 175, 451 ]
        }).end();
    }else{
        res.status(405).json({
            message: '错误信息'
        }).end();
    }
});


router.get('/statistics', function(req, res){
    
    if(Math.ceil(Math.random() * 10) > 0){
        res.status(200).json({
            //指令ID
            cmdIdCollection: ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110','111', '112','113','114','115','116','117','118'],
            points: [95, 97, 84, 75, 94, 92, 99,75, 94, 92, 99, 104,99,75, 94, 92, 99, 104],
            reputation: [93, 73, 45, 78, 94, 56, 84, 45, 78, 94, 88, 94,99,75, 94, 92, 99, 104]
        }).end();
    }else{
        res.status(405).json({
            message: '错误信息'
        }).end();
    }
});

module.exports = router;