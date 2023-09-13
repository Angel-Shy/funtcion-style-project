module.exports = [
    {
        transactionId:1 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASSDSDSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 123, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'ASDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区年家浜路518号万达广场',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:3	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '1SHKUSDKL'
    },
    {
        
        transactionId:2 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS',//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:null,//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:2	,//enum 1 正常 2 已取消	 3. 被拒绝 甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '1SHKUSDKL'
    },
    {
        
        transactionId:3 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD3'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: null ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:null,//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '1SHKUSDKL'
    },
    {
        
        transactionId:4 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD4'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS',//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:2	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '2SHKUSDKL'
    },
    {
        
        transactionId:5 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD5'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJSHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:3	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '2SHKUSDKL'
    },
    {
        
        transactionId:6 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD6'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHSADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '2SHKUSDKL'
    },
    {
        
        transactionId:7 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD7'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:3	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '2SHKUSDKL'
    },
    {
        
        transactionId:8 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD8'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        requirementCodeId: '2SHKUSDKL',
        reason:"你的价格我无法承担哦！",
    },
    {
        
        transactionId:9 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD9'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        requirementCodeId: '2SHKUSDKL',
        reason:"你的价格我无法承担哦！",
    },
    {
        
        transactionId:10 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD10'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:2	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '2SHKUSDKL'
    },
    {
        
        transactionId:11 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD11'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '2SHKUSDKL'
    },
    {
        
        transactionId:12 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD12'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        requirementCodeId: '2SHKUSDKL',
        reason:"你的价格我无法承担哦！",
    },
    {
        
        transactionId:13 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD13'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '2SHKUSDKL'
    },
    {
        
        transactionId:14 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '2SHKUSDKL'
    },
    {
        
        transactionId:15 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '2SHKUSDKL'
    },
    {
        
        transactionId:16 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '2SHKUSDKL'
    },
    {
        
        transactionId:17 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        reason:"你的价格我无法承担哦！",
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        requirementCodeId: '2SHKUSDKL'
    },
    {
        
        transactionId:18 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:1000, //decimal	电荷量
        requirementId:'1SDJHADS',//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:5.56,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:14	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '3SHKUSDKL'
    },
    {
        
        transactionId:19 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	14,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '3SHKUSDKL'
    },
    {
        
        transactionId:20 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '3SHKUSDKL'
    },
    {
        
        transactionId:21 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS',//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '3SHKUSDKL'
    },
    {
        
        transactionId:22 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '3SHKUSDKL'
    },
    {
        
        transactionId:23 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '3SHKUSDKL'
    },
    {
        
        transactionId:24 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	15,//用户表_ID 外键	合同的甲方
        partyB:13	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '3SHKUSDKL'
    },
    {
        
        transactionId:25 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	14,//用户表_ID 外键	合同的甲方
        partyB:16	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '3SHKUSDKL'
    },
    {
        
        transactionId:26 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:300, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.5,	//decimal	积分量
        partyA:	14,//用户表_ID 外键	合同的甲方
        partyB:16	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '3SHKUSDKL'
    },
    {
        
        transactionId:27 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:500, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:2.53,	//decimal	积分量
        partyA:	12,//用户表_ID 外键	合同的甲方
        partyB:16	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:2	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '3SHKUSDKL'
    },
    {
        
        transactionId:28 , //bigint or int 自增类型 数据库主键 pk	唯一标识一个交易
        codeId: 'SIMASFGADFSLDIANSD2'	,//string hash unique 展示作用	存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要
        cmdId: 124, //index 指令表主键	标识交易所属指令
        electricityValue:250, //decimal	电荷量
        requirementId:'1SDJHADS' ,//外键 所属需求	标书交易所属需求，需求指向一个指令
        electricityUnit:"kw.h",	//enum string 可能取值: kw.h	用电量单位
        point:1.435,	//decimal	积分量
        partyA:	13,//用户表_ID 外键	合同的甲方
        partyB:14	,//用户表_ID 外键	合同的乙方
        partyAAddress:'上海市浦东新区吴迪大厦',//甲方地址
        partyBAddress:'上海市浦东新区浦东南路1888号浦东大酒店',//乙方地址
        partyACode: 'AAA112'	,//用户表 编号	合同的甲方编号
        partyBCode:'AAA113'	,//用户表 编号	合同的乙方编号
        type:3	,//enum 合同类型	电力合同 / 积分合同
        addTime:'2022/7/22/ 19:58:09'	 ,//datetime	合同创建时间
        partyASubscribe: '2022/7/23/ 19:58:09' ,//datetime	甲方签署时间
        partyBSubscribe: '2022/7/22/ 19:58:09',//datetime	乙方签署时间
        endTime:'2022/7/25 12:00:00'	,//datetime	签署截止时间
        expirationTime:	'2022/7/25 12:00:00',//datetime	指令结束时间 就是交易过期时间
        partyASignature:'2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb',//string	签名
        partyBSignature:'6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d',//string	签名
        directionStartTime:'2022/7/25/ 12:00:00'	,//datetime	指令开始执行时间
        directionEndTime:'2022/7/26/ 12:00:00'	,//datetime	指令结束执行时间
        directionCreateTime:'2022/7/22/ 12:00:00', //指令创建时间
        directionType:'削峰',
        state:1	,//enum 1 正常 2 已取消	甲方没有签署之前，是可以撤销的
        reason:"你的价格我无法承担哦！",
        requirementCodeId: '3SHKUSDKL'
    }
]