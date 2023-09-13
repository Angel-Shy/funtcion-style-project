var express = require('express')
var router = express.Router()

/**
 * /system/about
 */
router.get('/state', function (req, res) {
    res.status(200).json(
        {
            systemState:'运行正常',
            internetStateMark:'良好',
            company:'上海浦东供电公司',
            contracts:12,
            createNewestDate:'2021/12/13 15:23:56',
            blocks:10,
            code : 200
        }
    );
});


router.get('/trade', function (req, res) {
    res.status(200).json(
        {
            electric: { value:3500, unit: 'kw.h' },  /* 当前所有节点可接收调控电力总和 */
            trade: {value: 32},  /* 今日新增交易笔数 */
            credit: 173.25000, /* 今日积分发出量 */  
            electricTrade: 2500, /* 今日电荷成交量 */
            creditPrice: 7.18500,  /* 积分/100kw.h [当前价格]  */
            companys: 5  /* 默认接收调控的单位数量之和 */,
            code : 200
        } 
    );
});

router.get('/dashboard', function (req, res) {
    res.status(200).json(
        {
            nodes: {
                online: 22,
                total:25
            },
            charge:{
                unit:'kw·h',
                number:7115
            },
            co2:{
                unit: '公斤',
                number: 5585
            },
            credit:{
                unit:'币',
                number:3156.5
            },
            blocks:{
                unit:'块',
                number:512
            },
            code : 200
        }

    );
});

router.get('/direction', function (req, res) {
    const num = Math.ceil((Math.random() * 100));
    if(num > 20){
        res.status(200).json(
            {
                isImplementDirection: true,
                joinNodes: 15,
                directionName:'削峰指令ACFD15239875',
                startDateTime:'2021.12.8 15:15:32',
                progressValue:num,
                code : 200
            }
        );
    }else{
        res.status(200).json(
            {
                isImplementDirection: false,
                joinNodes: 0,
                startDateTime:'2021.12.8 15:15:32',
                directionName:'',
                progressValue:0,
                code : 200
            }
        );
    }

})

router.get('/electric', function (req, res) {
    res.status(200).json(
        {
            electric:[220, 182, 191, 234, 290, 330, 310],
            co2:[120, 132, 101, 134, 90, 230, 210],
            code : 200
        }
    );
});


module.exports = router




