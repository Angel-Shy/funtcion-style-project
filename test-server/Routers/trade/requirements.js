module.exports = [
    {
        requirementId:1,
        codeId:'1SHKUSDKL',
        requirementType:1,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:2,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:123,	//long int forigen key	指令ID
        endDateTime: '2022/7/25 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/20 12:00:00', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:1	,//用户表_ID 外键	合同的甲方
        partyACode:'AA111', //用户表 编号	合同的甲方编号
        electricValue: 1000,//	decimal	电荷量
        point:5.8,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:1000,	//decimal	剩余电荷
        leftPoint: 4.0	//decimal	剩余积分
    },
    {
        requirementId: 2,
        codeId:'2SHKUSDKL',
        requirementType:2,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:2,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:123,	//long int forigen key	指令ID
        endDateTime: '2022/7/25 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/20 12:00:00', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:2	,//用户表_ID 外键	合同的甲方
        partyACode:'AA112', //用户表 编号	合同的甲方编号
        electricValue: 1000,//	decimal	电荷量
        point:7.5,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:1000,	//decimal	剩余电荷
        leftPoint: 7.5	//decimal	剩余积分
    },
    {
        requirementId: 3,
        codeId:'3SHKUSDKL',
        requirementType:1,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:3,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:124,	//long int forigen key	指令ID
        endDateTime: '2022/7/25 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/20 12:00:00', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:2	,//用户表_ID 外键	合同的甲方
        partyACode:'AB112', //用户表 编号	合同的甲方编号
        electricValue: 1000,//	decimal	电荷量
        point:7.5,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:500,	//decimal	剩余电荷
        leftPoint: 3.5	//decimal	剩余积分
    },    {
        requirementId: 4,
        codeId:'4SHKUSDKL',
        requirementType:2,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:3,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:123,	//long int forigen key	指令ID
        endDateTime: '2022/7/25 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/20 12:00:00', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:2	,//用户表_ID 外键	合同的甲方
        partyACode:'AB112', //用户表 编号	合同的甲方编号
        electricValue: 1000,//	decimal	电荷量
        point:7.5,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:600,	//decimal	剩余电荷
        leftPoint: 4.5	//decimal	剩余积分
    },
    {
        requirementId: 5,
        codeId:'5SHKUSDKL',
        requirementType:1,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:2,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:123,	//long int forigen key	指令ID
        endDateTime: '2022/7/25 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/20 12:00:00', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:2	,//用户表_ID 外键	合同的甲方
        partyACode:'AA114', //用户表 编号	合同的甲方编号
        electricValue: 1200,//	decimal	电荷量
        point:9.5,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:800,	//decimal	剩余电荷
        leftPoint: 5.5	//decimal	剩余积分
    },
    {
        requirementId: 6,
        codeId:'6SHKUSDKL',
        requirementType:1,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:2,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:123,	//long int forigen key	指令ID
        endDateTime: '2022/7/25 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/20 12:00:00', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:2	,//用户表_ID 外键	合同的甲方
        partyACode:'AA117', //用户表 编号	合同的甲方编号
        electricValue: 1300,//	decimal	电荷量
        point:7.5,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:900,	//decimal	剩余电荷
        leftPoint: 5.5	//decimal	剩余积分
    },
    {
        requirementId: 7,
        codeId:'7SHKUSDKL',
        requirementType:2,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:3,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:123,	//long int forigen key	指令ID
        endDateTime: '2022/7/25 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/20 12:00:00', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:4	,//用户表_ID 外键	合同的甲方
        partyACode:'AA113', //用户表 编号	合同的甲方编号
        electricValue: 1200,//	decimal	电荷量
        point:10.5,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:1000,	//decimal	剩余电荷
        leftPoint: 7.7	//decimal	剩余积分
    },
    {
        requirementId: 8,
        codeId:'8SHKUSDKL',
        requirementType:1,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:3,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:122,	//long int forigen key	指令ID
        endDateTime: '2022/7/24 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/19 12:00:00', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:4	,//用户表_ID 外键	合同的甲方
        partyACode:'AA113', //用户表 编号	合同的甲方编号
        electricValue: 1200,//	decimal	电荷量
        point:9.5,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:1000,	//decimal	剩余电荷
        leftPoint: 7.7	//decimal	剩余积分
    },
    {
        requirementId: 9,
        codeId:'9SHKUSDKL',
        requirementType:2,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:3,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:123,	//long int forigen key	指令ID
        endDateTime: '2022/7/24 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/19 12:00:00', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:4	,//用户表_ID 外键	合同的甲方
        partyACode:'AA113', //用户表 编号	合同的甲方编号
        electricValue: 1000,//	decimal	电荷量
        point:7.5,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:1000,	//decimal	剩余电荷
        leftPoint: 7.5	//decimal	剩余积分
    },
    {
        requirementId: 10,
        codeId:'10SHKUSDKL',
        requirementType:2,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:3,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:122,	//long int forigen key	指令ID
        endDateTime: '2022/7/24 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/19 11:11:28', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:4	,//用户表_ID 外键	合同的甲方
        partyACode:'AA120', //用户表 编号	合同的甲方编号
        electricValue: 1600,//	decimal	电荷量
        point:17.7,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:1600,	//decimal	剩余电荷
        leftPoint: 17.7	//decimal	剩余积分
    },
    {
        requirementId: 11,
        codeId:'11SHKUSDKL',
        requirementType:1,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:3,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:122,	//long int forigen key	指令ID
        endDateTime: '2022/7/24 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/19 11:11:28', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:4	,//用户表_ID 外键	合同的甲方
        partyACode:'AA120', //用户表 编号	合同的甲方编号
        electricValue: 1600,//	decimal	电荷量
        point:17.7,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:1600,	//decimal	剩余电荷
        leftPoint: 17.7	//decimal	剩余积分
    },
    {
        requirementId: 12,
        codeId:'12SHKUSDKL',
        requirementType:1,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:3,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:123,	//long int forigen key	指令ID
        endDateTime: '2022/7/24 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/19 11:11:28', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:4	,//用户表_ID 外键	合同的甲方
        partyACode:'AA120', //用户表 编号	合同的甲方编号
        electricValue: 1600,//	decimal	电荷量
        point:17.7,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:1600,	//decimal	剩余电荷
        leftPoint: 17.7	//decimal	剩余积分
    },
    {
        requirementId: 13,
        codeId:'13SHKUSDKL',
        requirementType:2,	//enum 1,2	1 可以协商 2 不可以协商
        transactionType:3,	//enum 3,2	3 电力交易 2 积分交易
        cmdId:123,	//long int forigen key	指令ID
        endDateTime: '2022/7/24 12:00:00', //datetime	需求有效截止时间 时间格式 2022/5/15 12:50:12
        publishDateTime: '2022/7/19 11:11:28', //	datetime	发起时间 时间格式 2022/5/15 12:50:12
        partyA:4	,//用户表_ID 外键	合同的甲方
        partyACode:'AA120', //用户表 编号	合同的甲方编号
        electricValue: 1600,//	decimal	电荷量
        point:15.7,//	decimal	积分
        electricUnit:'kw',	//varchar	单位
        state: 1,	//enum	状态 1 未撤销 2 撤销
        leftElectricValue:1600,	//decimal	剩余电荷
        leftPoint: 17.7	//decimal	剩余积分
    }
    
];