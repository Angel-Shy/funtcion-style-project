var express = require('express');
var router = express.Router();
var DirectionsData = require('./datas');
let instructions = require('./instructions');

/**
 * /direction/about
 */
  
//检索指令信息
router.get('/waiting', function(req, res){
    console.log('请求参数: ----------------------------- |'  );
    console.log(req.query);
    console.log('请求参数: ----------------------------- |'  );

    res.status(200).json({
        length:DirectionsData.length,
        data:DirectionsData
    });
});


//获取
router.get('/instructions', function(req, res){
    res.status(200).json({
        total:instructions.length,
        data:instructions,
    });
});

//获取
router.get('/progress', function(req, res){
    console.log('请求参数: ----------------------------- |'  );
    console.log(req.query);
    console.log('请求参数: ----------------------------- |'  );
    
    res.status(200).json({
       progress: [
            {
                name: '指令初始化',
                state: 1, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: '2022/8/3 00:00:46'
            },
            {
                name: '指令上链',
                state: 1, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: '2022/8/3 00:10:46'
            },
            {
                name: '链上广播',
                state: 1, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: '2022/8/3 00:20:46'
            },
            {
                name: '广播完成',
                state: 1, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: '2022/8/3 05:20:46'
            },
            {
                name: '智能调度',
                state: 1, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: '2022/8/3 12:12:54'
            },
            {
                name: '需求响应生成',
                state: 1, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: '2022/8/3 14:12:54'
            },
            {
                name: '合同上链',
                state: 1, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: '2022/8/3 16:12:54'
            },
            {
                name: '楼宇签署',
                state: 4, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: '' //返回当前时间也是可以的
            },
            {
                name: '等待需求响应完成',
                state: 3, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: ''
            },
            {
                name: '需求响应执行完毕',
                state: 3, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: ''
            },
            {
                name: '响应结果评估',
                state: 3, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: ''
            },
            {
                name: '积分发放',
                state: 3, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: ''
            },
            {
                name: '信誉分发放',
                state: 3, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: ''
            },
            {
                name: '指令完成',
                state: 3, // 1 已完成 2. 执行中  3.待执行
                finishDataTime: ''
            }
        ]
    });
});

module.exports = router




