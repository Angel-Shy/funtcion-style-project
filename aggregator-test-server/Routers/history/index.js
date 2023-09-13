let express = require('express');
let router = express.Router();

router.get('/progress', function (req, res) {
    console.log('获得的删除条件: ----------------------------- |'  );
    console.log(req.query);
    console.log('获得的删除条件: ----------------------------- |'  );

    res.status(200).json(
        {
            index:5784,//指令编号 指令表主键
            codeName:"削峰指令ACFD15239875", /* 指令简述*/
            createTime:"2021/12/6 15:41:12", /* 创建时间 */
            carryOutTime: "2021.12.8 15:15:32",/* 开始执行时间*/
            endTime:"2021/12/18 15:00:00", /*预计结束时间 */
            valueElectric: 4000,/* 电荷量 单位kw.h*/
            coin:"315.5", //积分数量
            contractCount :15, //合同数量
            progress:53, // 53/100 设置百分比  执行进度,
            code : 200
        }
    );
});

router.get('/contracts', function (req, res) {
    console.log('获得的删除条件: ----------------------------- |'  );
    console.log(req.query);
    console.log('获得的删除条件: ----------------------------- |'  );

    res.status(200).json(
        {
            nodes: ['aa11', 'aa14', 'as45', 'aaa12', 'asd45', 'A12', 'DC12', 'ER15', 'hh123', 'we2','rr45'], //节点简称
            coins: [7.12, 8, 12, 21.5, 11, 15, 25, 7.15, 14.2, 28.5, 5], //积分
            electric:[100,110,140,215,115,141,255,100,200,400,75], //电荷量,
            code : 200
        }
    );
});

router.get('/calendar', function (req, res) {
    console.log('获得的删除条件: ----------------------------- |'  );
    console.log(req.query);
    console.log('获得的删除条件: ----------------------------- |'  );

    res.status(200).json(
        {
            data:[
                {date:"2021/10/06", count: 5},
                {date:"2021/10/07", count: 2},
                {date:"2021/10/08", count: 5},
                {date:"2021/10/17", count: 7},
                {date:"2021/11/08", count: 4},
            ],
            code : 200
        }
    );
});


router.get('/life', function(req, res){
    console.log('获得的删除条件: ----------------------------- |'  );
    console.log(req.query);
    console.log('获得的删除条件: ----------------------------- |'  );
    /* "指令初始化","指令上链","链上广播","广播完成","智能调度","需求响应生成","合同上链","楼宇签署","等待需求响应完成","需求响应执行完毕","响应结果评估","积分发放","信誉分发放","指令完成"  */
    res.status(200).json({
       code : 200,
       life: [
            {
                name:"指令初始化",
                operationDay:[
                    {
                        date:"2022-03-31",
                        operations:[
                            {
                                index: 1,
                                dateTime:"2022/3/31 14:45:00",
                                message:"管理员李煜创建了 <code>削峰</code>指令!",
                                result: true
                            },
                            {
                                index: 2,
                                dateTime:"2022/3/31 14:50:00",
                                message: "本地数据库接收信息并存储！",
                                result: true
                            },
                            {
                                index: 3,
                                dateTime:"2022/3/31 14:51:00",
                                message: "聚合商节点(IP 145.25.15.101) 将指令信息提交区块链系统！",
                                result: true
                            }
                        ]
                    }
                ]
            },
            {
                name:"指令上链",
                operationDay:[
                    {
                        date:"2022-03-31",
                        operations:[
                            {
                                index: 4,
                                dateTime: "2022/3/31 14:52:00",
                                message:"本地区块链节点打包区块，并签署背书!",
                                result: true
                            }
                        ]
                    }
                ]

            },
            {
                name:"链上广播",
                operationDay:[
                    {
                        date: "2022-03-31",
                        operations:[
                            {
                                index: 5,
                                dateTime: "2022/3/31 14:52:00",
                                message:"本地区块链节点将执行信息通过区块链网络广播!",
                                result: false
                            },
                            {
                                index: 6,
                                dateTime: "2022/3/31 15:52:00",
                                message:"本地区块链节点将执行信息通过区块链网络广播!",
                                result: true
                            }
                        ]
                    }
                ]
            },
            {
                name:"广播完成",
                operationDay:[
                    {
                        date:"2022-03-31",
                        operations:[
                            {
                                index: 7,
                                dateTime: "2022/3/31 15:53:01",
                                message:"本地区块链节点将执行信息通过区块链网络广播!",
                                result: true
                            }
                        ]
                    }
                ]
            },
            {
                name:"智能调度",
                operationDay:[
                    {
                        date: "2022-03-31",
                        operations: [
                            {
                                index: 8,
                                dateTime: "2022/3/31 15:54:12",
                                message:"本地区块链节点将执行信息通过区块链网络广播!",
                                result: true
                            }
                        ]
                    }
                ]
            },
            {
                name:"需求响应生成",
                operationDay:[
                    {
                        date:"2022-03-31",
                        operations:[
                            {
                                index: 9,
                                dateTime:"2022/3/31 16:05:0",
                                message:" 生成合同 编号(5142) 乙方节点编号：(aa11) 电荷量：500kw.h 预计积分量: 35.5",
                                result: true
                            },
                            {
                                index: 10,
                                dateTime:"2022/3/31 16:06:14",
                                message: "编号节点 aa14 IP:174.25.12.11 发起电力互济广播! 争取电荷量: 300kw.h",
                                result: true
                            }
                        ]
                    },
                    {
                        date: "2022-04-01",
                        operations:[
                            {
                                index: 11,
                                dateTime:"2022-04-01 16:52:59",
                                message:" 节点 a154 aa12 aa48 aas45 aa11 响应电力互济广播！",
                                result: true
                            },
                            {
                                index: 12,
                                dateTime:"2022-04-01 17:55:14",
                                message: "生成合同 编号(5144) 乙方节点编号 aa45 电荷量：300kw.h 预计积分量: 21.3",
                                result: true
                            }
                        ]
                    }
                ]
            },
            {
                name:"合同上链",
                operationDay:[]
            },
            {
                name:"楼宇签署",
                operationDay:[]
            },
            {
                name:"等待需求响应完成",
                operationDay:[]
            },
            {
                name:"需求响应执行完毕",
                operationDay:[]
            },
            {
                name:"响应结果评估",
                operationDay:[]
            },
            {
                name:"积分发放",
                operationDay:[]
            },
            {
                name:"信誉分发放",
                operationDay:[]
            },
            {
                name:"指令完成",
                operationDay:[]
            }
        ]
    })
})


module.exports = router;