#### [聚合商接口文档 Project Interfaces Documentation](#)
`版本号：0.0.4`

-----

- [`1. HTTP状态码说明`](#1-HTTP状态码说明)
- [`2. 登陆首页接口`](#2-登陆首页接口)
- [`3. 后台首页接口`](#3-后台首页接口)
- [`4. 指令管理接口`](#4-指令管理接口)
- [`5. 合同管理接口`](#5-合同管理接口)
- [`6. 网络管理接口`](#6-网络管理接口)
- [`7. 区块检索接口`](#7-区块检索接口)
- [`8. 指令进度接口`](#8-指令进度接口)

-----

#### [1. HTTP状态码说明](#)
`项目前后端使用HTTP协议，HTTP状态码是用于说明从后端返回的HTTP Response报文状态的基本设置。常用的状态码如200，表示请求正常，（成功）服务器已成功处理了请求。
404，表示（未找到）服务器找不到请求的路径，500：（服务器内部错误）服务器遇到错误，无法完成请求。我们对前后端HTTP状态码约定如下：`

`200-300 [2xx]`:`表示请求正常接收，服务器成功接收请求，并且正常处理。`  
`300-400 [3xx]`:`表示要完成请求，需要进一步操作。通常，这些状态代码用来重定向。本系统设计并未考虑3XX端口使用。不做考虑`  
`400-500 [4xx]`:`表示客户端请求错误，例如请求参数数值不属于正常范围，ID已经存在，账号密码错误。同时，后端仍然后返回一个JSON 信息。表示错误原因。服务器对所有的4XX系状态码都只返回一个只
带一个message字段用于表示错误原因的HTTP响应报文。例如：`

```json
{
    "message": "账号或密码错误"
}
```
`500-5XX [5xx]`:`（服务器错误）这些状态代码表示服务器在尝试处理请求时发生内部错误。这些错误可能是服务器本身的错误，而不是请求出错。这种状态下不返回任何JSON。前端根据状态号表示为
服务器内部错误。`

`例子：[使用Express.JS 框架。测试版本]`
```javascript
router.post('/login', (req, res) => {
    let pwd = req.body.userPwd;
    let id = req.body.userId;
    if(id != 'admin' || pwd != '123456'){
        res.status(417).json({'message':'账号或者密码错误！' });
        return;
    }
    res.cookie('token', '20221589645123');
    //返回一个token
    res.status(200).json({'token': '201611418'});
});

```

#### [2. 登陆首页接口](#)
`系统首页仅仅拥有登陆接口`

##### 2.1 /user/login [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`登陆`|`/user/login`|`POST`|`200`|`417`|`用于系统登陆，参数类型 x-www-form-urlencoded`|

`请求参数`:
```javascript
{
  userId:"admin",
  password:"123456"
}
```
`正确返回参数： token 一个表示用户登陆状态的参数。用于登陆认证信息`
```javascript
{
  token:"C42EDEFC75871E4CE2146FCDA67D03DDA05CC26FDF93BC322",
  code:200
}
```
`错误返回参数`
```javascript
{
   message:'账号或者密码错误！', /*说明错误原因*/
   code:417
}
```

#### [3. 后台首页接口](#)
`系统首页接口主要用于表示系统状态，指令运行方式`

##### 3.1 /system/dashboard [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`系统首页展示栏`|`/system/dashboard`|`GET`|`200`|`无参数请求 只会5XX错误。`|`获取在线，节约电荷，碳排放减少，区块链积分，高度.`|

`请求参数`:`无`

`返回参数`:`系统首页展示栏`
```javascript
{
    nodes: {  /*节点*/
        online: 22,
        total:25
    },
    charge:{ /*已节约电荷*/
        unit:'kw·h',
        number:7115
    },
    co2:{ /* 减少碳排放 */
        unit: '公斤',
        number: 5585
    },
    credit:{ /* 区块链积分总量 */
        unit:'币',
        number:3156.5
    },
    blocks:{ /* 区块链高度 */
        unit:'块',
        number:512
    },
}
```

##### 3.2 /system/state [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`系统首页状态`|`/system/state`|`GET`|`200`|`无参数请求 只会5XX错误。`|`获取系统状态.`|

`请求参数`:`无`

`返回参数`:`系统首页展示栏`
```javascript
{
    systemState:'运行正常',
    internetStateMark:'良好', /* 网络状态*/
    company:'上海浦东供电公司', /*聚合商单位*/
    contracts:12, /* 今日产生合同数量 */
    createNewestDate:'2021/12/13 15:23:56', /*最新区块的生成时间*/
    blocks:10 /* 今日生成区块数量*/
}
```

##### 3.3 /system/direction [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`指令执行状态`|`/system/direction`|`GET`|`200`|`无参数请求 只会5XX错误。`|`获取指令执行进度信息.`|

`请求参数`:`无`

`返回参数`:`[状态1] 只有一个指令正在执行`
```javascript
{
    isImplementDirection: true, /* 是否在执行指令 */
    joinNodes: 15, /* 参与节点 */
    directionName:'削峰指令ACFD15239875', /* 指令名称 */
    startDateTime:'2021.12.8 15:15:32', /*开始执行时间 */
    progressValue: 50  /* 指令进度  50% */
}
```
`返回参数`:`[状态2] 没有指令正在执行`
```javascript
{
    isImplementDirection: false, /* 没执行指令  */
    joinNodes: 0,
    startDateTime:'2021.12.8 15:15:32', /* 当前时间 */
    directionName:'', 
    progressValue:0
}
```
`返回参数`:`[状态3] 多个指令正在执行`
```javascript
{
    isImplementDirection: true, /* 是否在执行指令 */
    joinNodes: 15, /* 参与节点 */
    directionName:'混合指令', /* 指令名称 */
    startDateTime:'2021.12.8 15:15:32', /*当前正在指令的最早开始执行时间 */
    progressValue: 98  /* 指令进度  98% */
}
```

##### 3.4 /system/electric [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`碳排放和电荷`|`/system/electric`|`GET`|`200`|`无参数请求 只会5XX错误。`|`获取近七周碳排放 电荷节约情况.`|

`请求参数`:`无`

`返回参数`:`两个数组`
```javascript
{
    electric:[220, 182, 191, 234, 290, 330, 310], /* 索引 6 表示当前周 索引 0 表示前六周 */
    co2:[120, 132, 101, 134, 90, 230, 210]
}
```

##### 3.5 /system/trade [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`碳排放和电荷`|`/system/trade`|`GET`|`200`|`无参数请求 只会5XX错误。`|`获取电力调控交易信息`|

`请求参数`:`无`

`返回参数`
```javascript
{
    electric: { value:3500, unit: 'kw.h' },  /* 当前所有节点可接收调控电力总和 */
    trade: {value: 32},  /* 今日新增交易笔数 */
    credit: 173.25000, /* 今日积分发出量 */  
    electricTrade: 2500, /* 今日电荷成交量 */
    creditPrice: 7.18500,  /* 积分/100kw.h [当前价格]  */
    companys: 5  /* 默认接收调控的单位数量之和 */
} 
```

##### 3.6 /block/top  [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`区块信息`|`/block/top`|`GET`|`200`|`无参数请求 只会5XX错误。`|`获取区块前TOP 10 区块`|

`请求参数`:`无`

`返回参数`:`按道理来说数组长度应该是10。`
```javascript
{
    data: [
    {
        blockIndex:512,
        blockHash:"2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb",
        dataHash:"6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d",
        beforeHash:"668278c1e80388ac99d3ea57cdfdfbaef7df9f7f41151816efe10f801845f8e6",
        createTime:'2021-11-19T09:16:46',
        channelName:"electricChannel",
        envelopeCount:1,
        data:"",
        dataJson:[{}]
    },
    {
        blockIndex:511,
        blockHash:"668278c1e80388ac99d3ea57cdfdfbaef7df9f7f41151816efe10f801845f8e6",
        dataHash:"64e604787cbf194841e7b68d7cd28786f6c9a0a3ab9f8b0a0e87cb4387ab0107",
        beforeHash:"08c00ce612ce237e773e3070ae5be1f3087c9aea5b7cb2dbb3109c00db7b9cc6",
        createTime:'2021-11-17T12:08:26',
        envelopeCount:2,
        data:"",
        dataJson: [{}]
    }
    /* ... */
    ]
}
```
#### [4. 指令管理接口](#)
`用于指令发布，和指令信息的查询，统计，展示。`

##### 4.1 /direction/issue [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`下发指令`|`/direction/issue`|`POST`|`200`|`417 参数错误`|`我需要下发一个指令 参数类型: x-www-form-urlencoded`|


`请求参数`
```javascript
{
  name: '李心悦',
  phone: '15982690985',
  sketch: '指令简述',  /* 例如：削峰指令ACFD15239875 */
  directionType: 0,  /* 请看参数说明 */
  startDate: '2022-03-01',
  startTime: '15:00',
  endDate: '2022-03-20',
  endTime: '15:00',
  electric: '1200',
  remark: '唉，我就是做一点测试数据而是！' /* 长备注 */
}


/* 参数说明: */
directionTypes:[
    {value: 0, name:'削峰指令'},
    {value: 1, name:'填谷指令'},
    {value: 2, name:'其他'},
]
```

`正确返回参数 [可以返回也可以不返回只需要状态码为2XX就可以了]`
```javascript
{
    isOk: true
}
```

`错误返回参数`
```javascript
{
   message: '表示参数错误信息！'
}
```

##### 4.2 /direction/state [可以对接]
`返回指令系统状态信息，例如总指令数量，上次下发指令时间，指令系统是否在执行指令`

|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`指令系统状态`|`/direction/state`|`GET`|`200`|`无参数错误只有 5XX`|`无`|

`请求参数`:`无`

`返回参数`:`[状态1 正在执行指令]`
```javascript
{
    count: 37, /* 指令总数 */
    dateTime:'2021/2/21 15:12:15', /* 上次下发指令时间 */
    directionSystemState: true, /* 当先执行或者没有执行指令 */
    directionKetch: '削峰指令ACFD15239875'  /* 如果只有一个指向，返回指令简述，多个指令返回 名称 ： 混合指令 */
}
```
`返回参数`:`[状态2 没有在执行的指令]`
```javascript
{
    count: 36,
    dateTime:'2021/2/21 15:12:15', /* 返回当前时间 */
    directionSystemState: false, /* 执行或者没有执行 */
    directionKetch: '' /* 空 */
}
```

##### 4.3 /direction/directions  [可以对接]
`对指令进行分页展示信息和简述！`

|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`指令检索`|`/direction/directions`|`POST`|`200`|`417`|`无`|

`请求参数`
```javascript
{
  directionState: 0,  /*  [Type：directionState ] 指令状态 */
  startDateTime: '1970-01-01T08:00',  /* 开始时间 */
  endDateTime: '2022-03-01T15:37', /* 结束时间 */
  electricNumberMore: 0, /* 电荷数值 大于 */
  electricNumberLess: 50000, /* 电荷数值 小于 */
  creditMore: 0,  /* 积分大于 数值 */
  creditLess: 1000, /* 积分小于 数值 */
  sortOne: 0, /* [Type: selectSort ] 下面有解释 */
  sortTwo: 0, /* [Type: selectSort ] 下面有解释 */
  sortType: 0, /* [Type sortType] 下面有解释 */
  directionType: 0, /* [Type: directionTypes] 下面有解释 */
  count: 10,  /* 关键参数: 每页数据条数 */
  pageIndex: 0  /* 请求第几页 */
}

//参数解释 一下参数需要前后端开后讨论
directionState: [
    {value:0, name:'全部指令'},
    {value:1, name:'链上广播'},
    {value:2, name:'下发合同'},
    {value:3, name:'等待执行完成'},
    {value:4, name:'指令完成'}
],
selectSort:[
    {value: 0, name:'默认排序'},
    {value: 1, name:'指令状态'},
    {value: 2, name:'减少电荷量'},
    {value: 3, name:'积分成交量'},
    {value: 4, name:'下发时间'},
    {value: 5, name:'持续时间'},
    {value: 6, name:'指令类型'},
],
sortType:[
    {value: 0, name:'默认排序'},
    {value: 1, name:'升序'},
    {value: 2, name:'降序'},
],
directionTypes:[
    {value: 0, name:'削峰指令'},
    {value: 1, name:'填谷指令'},
    {value: 2, name:'其他'},
]
```
`返回参数`:`[状态1 参数错误]`
```javascript
{
   message: '表示参数错误信息！'
}
```
`返回参数`:`[状态2 正常返回]`
```javascript
{
    total:37, /* 当前这个搜索条件下的指令总数 */
    data:[    
        {
            index:1,
            principalName:"李向峰",  /* 负责人*/
            codeName:"削峰指令ACFD15239875", /* 指令简述*/
            phone:"021-74155158",
            directionTypes:'削峰指令'
            createTime:"2021/12/6 15:41:12",
            carryOutTime: "2021.12.8 15:15:32",/* 开始执行时间*/
            endTime:"2021/12/18 15:00:00",
            valueElectric: 1000,/* 电荷 单位kw.h*/
            coin:"71.5",
			electricUnit:'kw'
            states :"锁定执行",
            mark:"良", /* 评价 */
            rate:7.15, /* 积分电荷兑换比*/
            detail:"按照上级要求，为了满足各地供电需要，而进行的电力平衡措施！请各位尽力配合，非常感谢大家的热心合作！"
        }
        /* ... */
    ],
    pageCount: 15  /* 总页数 */
}
```

##### 4.4 /direction/type [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`指令类型分布`|`/direction/type`|`GET`|`200`|`无参数请求 只会5XX错误。`|`获取指令类型分布，用于EChart饼图展示`|

`请求参数`:`无`

`返回参数`:`按道理来说数组长度应该是3。 并且只能是3。 原则上值只能改变 value的值。如果需要改变name。请申请组织本项目前后端相关人员开会讨论。`
```javascript
{
    data: [
        {value:10, name:'链上广播'},
        {value:2, name:'下发合同'},
        {value:7, name:'等待执行完成'},
        {value:0, name:'指令完成'}
    ]
}
```

##### 4.5 /direction/electric [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`各节点可调控电力资源`|`/direction/electric`|`GET`|`200`|`无参数请求 只会5XX错误。`|`获取各节点可调控电力资源，用于EChart展示`|

`请求参数`:`无`

`返回参数`:`注意各个节点的编号，请不超过5位字母长度，最好4位 建议采用 AA00 AA01 AA02....AB01 类似编号。`
```javascript
{
    nodes: ['A123', '1234', '234', '1235', '4456', '456', '786','1232', 'g1234', 's234', '123d5', '44a56', '456s', '78d6'],  /* 节点编号 */
    acceptableValue:[120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130] /* 请和上面节点编号一一对应 */
}
```


#### [5. 合同管理接口](#)
`三个接口合并一下吧`

##### 5.1 /contract/echart [可以对接]

|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`用于合同管理首页的EChart`|`/contract/echart`|`GET`|`200`|`无参数请求 只会5XX错误。`|`用于EChart展示`|

`请求参数`:`无`

`返回参数`:`good`
```javascript
{
    transactionType: [
        { value: 150, name: '需求指令合同' },
        { value: 14, name: '积分交易合同' },
        { value: 51, name: '电荷交易合同' },
    ],
    transactionVolume:{  /* 交易数量监督图 */
        total:[150, 14, 51, 215], /* 总的交易数量监督图 */
        month:[20, 12, 32, 64] /* 本月交易数量监督图 */
    },
    recentTransaction:{  /* 七日内交易监控图  索引0 表示今天 1表示昨天 懂的都懂。 */
        requirement:[0, 2, 0, 1, 0, 0, 0], /* 需求指令合同 */
        credit:[2, 3, 5, 4, 2, 4, 5],  /* 积分交易合同 */
        electric:[0, 1, 5, 4, 2, 0, 1] /* 电荷交易合同 */
    }
}
```

##### 5.2 /contract/contracts [可以对接]

|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`合同检索`|`/contract/contracts`|`GET`|`200`|`无参数请求 只会5XX错误。`|`分页展示`|

`请求参数`
```javascript
{
  contractState: 0, /* 合同状态 [Type: contractState] */
  contractType: 0, /* 合同类型 [Type: contractType] */
  sortOne: 0, /* [Type: selectSort] 排序1 学过数据库的都懂这啥意思 ORDER BY 列名1,列名2 */
  sortTwo: 0, /* [Type: selectSort] 排序2 学过数据库的都懂这啥意思 ORDER BY 列名1,列名2 */
  sortType: 0, /* 升序降序 [Type: sortType] */
  directionCode: -1, /* 指令编号 -1 默认为查询所有 不做单个查询  */
  blockId: -1, /* 区块索引 */
  pageIndex: 0, /* 请求页数 */
  count: 10, /* 每页数量 */
  initiator: '', /* 发起方编号 一般是聚合商编号 */
  receiver: '' /* 接受者编号 一般是节点编号 例如AA12 */
}

//参数类型解释
contractState:[
    {value: 0, name:'所有合同'},
    {value: 1, name:'草拟阶段'},
    {value: 2, name:'签署完成'},
    {value: 3, name:'区块链已记录'},
    {value: 4, name:'执行完毕'},
],
contractType:[
    {value: 0, name: '所有合同'},
    {value: 1, name: '需求指令合同'},
    {value: 2, name: '积分交易合同'},
    {value: 3, name: '电力交易合同'},

],
selectSort:[
    {value: 0, name:'默认排序'},
    {value: 1, name:'合同状态'},
    {value: 2, name:'合同类型'},
    {value: 3, name:'指令编号'},
    {value: 4, name:'区块编号'},
],
sortType:[
    {value: 0, name:'默认排序'},
    {value: 1, name:'升序'},
    {value: 2, name:'降序'},
]
```

`返回参数`:`[状态1 参数错误]`
```javascript
{
   message: '表示参数错误信息！'
}
```


`返回参数`:`[状态2 正确返回]`
```javascript
{
    data: [
    {
        index:10,
        id:'a74996fd6155df0af0238b2df7fcf1ae',
        belongDirection:2, /* 必须在Direction 有响应的index值 */
        blcokId:512, /*所属区块ID */
        transactionType:0, /* 0 指令合同 1 积分购买电荷 2 人民币兑换积分 3 混合事务*/
        transactionTypeName:"指令合同",
        initiatorType:"聚合商节点",/*合同发起人*/
        accepterType:"楼宇节点",
        initiator:"000001",/*合同发起人 编码*/
        accepter:"AAAA115",/*合同接收人*/
        detail:"",
        initiatorGiveValue:"200", /* 减少电荷 100/ 人民币 500 */
        accepterGiveValue:"14.3" /* 获得积分 71.5 / 积分 500*/,
        initialTime:"2021/12/9 14:00:00",/* 发起时间 */
        states:"已记录于区块",
    },, /* {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} */]
    pageCount: 2  /* 当前检索条件下的指令页数  */
    total: 14  /* 当前检索条件下的指令总数 */
}
```
#### [6. 网络管理接口](#)
`两个接口合并一下吧。两个EChart 图一个接口！减少请求次数。`

##### 6.1 /internet/echart [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`网络状态`|`/internet/echart`|`GET`|`200`|`无参数请求 只会5XX错误。`|`echart 展示！`|

`请求参数`:`无`

`返回参数`
```javascript
{
    nodesState:[{ value: 21, name: '在线节点' },{ value: 2, name: '离线节点' }],
    nodeCreditAndReputation:{
        nodes: ['AD11', 'AD112', 'AD122', 'DD12', 'QD12', 'DD12', 'ACD12', 'AVBD12', 'SAD12',  /* 节点编号 */
         'SAD12', 'CAD12', 'ADS12','AD11', 'AD112', 'AD122', 'DD12', 'QD12', 'DD12', 'ACD12',
          'AVBD12', 'SAD12', 'SAD12', 'CAD12', 'ADS12'],
        credit: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
        3.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3], /* 节点拥有的积分 */
        reputation:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,  /* 节点的信誉分： 记得要一一对应。 */
         2.3,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]            
    } 
}
```

##### 6.2 /internet/add [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`添加节点`|`/internet/add`|`POST`|`200`|`无参数请求 只会5XX错误。`|`echart 展示！`|

`请求参数`:`看看就懂了`
```javascript
{
  ipAddress: '121.56.75.122', /* IP地址 */
  realAddress: '上海市虹口区北苏州路20号上海大厦', /* 实际地址 */
  addTime: '2021/12/10 15:23:56', /* 事件 */
  phone: '17721953180', /*  电话 */
  reputation: '100'  /* 信誉分 */
}
```

`返回参数`:`[状态1 参数错误]`
```javascript
{
   message: '表示参数错误的信息！'
}
```

`返回参数`:`[状态2 添加成功]`
```javascript
{
   isOK: true
}
```

##### 6.3 /internet/nodes [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`节点检索`|`/internet/nodes`|`POST`|`200`|`417 参数错误。`|`分页展示`|


`请求参数`:`注意参数类型`
```javascript
{
  nodeState: 0,/* [Type: nodeState] */
  ipAddress: '', /* IP地址 */
  realAddress: '', /* 实际地址 请使用模糊查询*/
  phone: '', /* 电话号码 */
  creditMore: 0, /* 积分大于 */
  creditLess: 5000, /* 积分大于 */
  reputationMore: 0, /* 信誉分大于 */
  reputationLess: 1000, /* 信誉分小于 */
  sortOne: 0, /* [Type: selectSort] 排序1 学过数据库的都懂这啥意思 ORDER BY 列名1,列名2 */
  sortTwo: 0, /* [Type: selectSort] 排序2 学过数据库的都懂这啥意思 ORDER BY 列名1,列名2 */
  sortType: 0, /* [Type: sortType] 升序降序 [Type: sortType] */
  pageIndex: 0, /* 请求页数 */
  count: 10, /* 每页数量 */
}

//参数类型
nodeState:[
    {value: 0, name:'所有节点'},
    {value: 1, name:'在线节点'},
    {value: 2, name:'离线节点'},
],
selectSort:[
    {value: 0, name:'默认排序'},
    {value: 1, name:'节点状态'},
    {value: 2, name:'拥有积分'},
    {value: 3, name:'拥有信誉分'},
    {value: 4, name:'IP地址'},
],
sortType:[
    {value: 0, name:'默认排序'},
    {value: 1, name:'升序'},
    {value: 2, name:'降序'},
]

```

`返回参数`:`[状态1 参数错误]`
```javascript
{
   message: '表示参数错误信息！'
}
```


`返回参数`:`[状态2 正确返回]`
```javascript
{
    data: [
    {
        id:1, /* 节点编号，你懂的，一般是数据库里面的主键 */
        codeId:'AAAA111',/* 编号，这是用来看的 */
        ipAddress:"58.33.31.223",/* 当前IP地址 */
        address:"上海市浦东新区年家浜路518号万达广场", /* 地址 */
        credit:34, /* 积分  */
        reputation:60, /* 信誉分 */
        offLineTime:"0", /* 离线时长 */
        lastLife:"活跃中", /* 如果在线就是字符串 ：活跃中，不然就返回上次活跃时间 */
        states:"在线", /* 在线或者离线 */
        phone:"028-8526597", /* 电话 */
        addTime:"2021/12/10 15:23:56" /* 什么时候添加这个节点的 */
    },/*  {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} */]
    pageCount: 2  /* 当前检索条件下的节点页数 */
    total: 14  /* 当前检索条件下的节点总数 */
}
```

##### 6.4 /internet/node [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`单个节点检索`|`/internet/node`|`GET`|`200`|`417 参数错误。`|`获取单个节点的信息...`|

`请求参数`:`看看就懂了`
```javascript
{
  codeId: 'AAAA111', /* 节点编号 */
}
```

`返回参数`:`[状态1 参数错误]`
```javascript
{
   message: '表示参数错误信息！'
}
```


`返回参数`:`[状态2 正确返回]`
```javascript
{
    id:1, /* 节点编号，你懂的，一般是数据库里面的主键 */
    codeId:'AAAA111',/* 编号，这是用来看的 */
    ipAddress:"58.33.31.223",/* 当前IP地址 */
    address:"上海市浦东新区年家浜路518号万达广场", /* 地址 */
    credit:34, /* 积分  */
    reputation:60, /* 信誉分 */
    offLineTime:"0", /* 离线时长 */
    lastLife:"活跃中", /* 如果在线就是字符串 ：活跃中，不然就返回上次活跃时间 */
    states:"在线", /* 在线或者离线 */
    phone:"028-8526597", /* 电话 */
    addTime:"2021/12/10 15:23:56" /* 什么时候添加这个节点的 */
}
```

##### 6.5 /internet/delete [可以对接]
|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`删除某个节点`|`/internet/delete`|`DELETE`|`200`|`417 参数错误。`|`删除某个节点信息，请谨慎进行这个操作...`|

`请求参数`:`看看就懂了` `类型: params`
```javascript
{
  nodeId: '2', /* 节点编号 主键 */
}
```

`返回参数`:`[状态1 删除成功] 200`
```javascript
{
   message: '删除成功'
}
```

`返回参数`:`[状态2 删除失败] 417`
```javascript
{
   message: '删除失败的原因? 参数错误还是不允许删除！'
}
```

或者 删除失败！ 或者编号不存在！

#### [7. 区块检索接口](#)
`底层区块链数据接口`

##### 7.1 /block/blocks [可以对接]

|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`区块检索`|`/block/blocks`|`GET`|`200`|`无参数错误。只会服务器错误`|`分页展示`|


`请求参数`:`注意参数类型`
```javascript
{
  blockIndex: '', /* 区块索引 1 2 5 956 */
  blockHash: '', /* 区块Hash 请使用模糊查询 但凡数据hash，头部hash 满足的都返回 建议  */
  pageIndex: 0,
  count: 12,
  startDateTime: '1970-01-01T08:00', /* 返回从这个时间 */
  endDateTime: '2022-03-02T19:59' /* 到这个时间之内生成的所有的区块 */
}
```

`返回参数`:`[状态1 参数错误]`
```javascript
{
   message: '表示参数错误信息！'
}
```


`返回参数`:`[状态2 正确返回]`
```javascript
{
    data: [
    {
        blockIndex:512,
        blockHash:"2bf69aea77b14a16a7678e1b1ae4be31edf1f8db35a9da5d87aa867c68be87eb",
        dataHash:"6f1ce3544c919613d7f0cd47f18abdd8f77aedc0f380379edd99500c8406745d",
        beforeHash:"668278c1e80388ac99d3ea57cdfdfbaef7df9f7f41151816efe10f801845f8e6", /*  */
        createTime:'2021-11-19T09:16:46',
        channelName:"electricChannel", /* 交易通道。可以返回也可以不返回。如果有的话 */
        envelopeCount:1,/*区块交易个数*/
        data:"", /* 区块交易具体数据 */
        dataJson:[]
    },,/*  {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} */]
    pageCount: 52  /* 当前检索条件下的区块页数 */
    total: 512  /* 当前检索条件下的区块总数 */
}
```



##### 7.2 /block/echart [可以对接]

|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`区块检索`|`/block/echart`|`GET`|`200`|`无参数错误。只会服务器错误`|`EChart 数据展示。用于区块链浏览器！`|


`请求参数`:`无`

`返回参数`
```javascript
{
    blockNet:{
        netState:"网络正常",
        online: 21,
        allNode: 23,
        offLineNode: 2,
        number: 512,
        dayBlocks: 5, /* 今日产生区块量 */
        weekBlocks: 25, /* 本周产生区块量 */
        mathematic: "PBFT共识算法",
        TPS: `1100.0 事务/秒`,  /* 额标TPS */
        Hash: SHA-256, /* 信息摘要算法 */
        midSize: 15.845Kb /* 区块大小中位数 */
    },
    nodes: ['AD11', 'AD112', 'AD122', 'DD12', 'QD12', 'DD12', 'ACD12', 'AVBD12', 'SAD12',  /* 聚合商节点编号 + 节点编号 */
         'SAD12', 'CAD12', 'ADS12','AD11', 'AD112', 'AD122', 'DD12', 'QD12', 'DD12', 'ACD12',
          'AVBD12', 'SAD12', 'SAD12', 'CAD12', 'ADS12']
}

```

#### [8 指令进度接口](#)

##### 8.1 /history/progress(测试阶段 请于前端讨论)
`指令执行进度信息， 根据指令的主键号: index, 查询指令的执行信息`

|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`指令执行进度信息`|`/history/progress`|`GET`|`200`|`参数错误：指令编号不存在，除此之外，会5XX错误。`|`查询指令的执行信息`|

`请求参数`
```javascript
{
    index:5784,//指令编号 指令表主键
}
```
`返回参数`：`[状态1 一切正常]`
```javascript
{
    index:5784,//指令编号 指令表主键
    principalName:"李向峰",  /* 负责人*/
    codeName:"削峰指令ACFD15239875", /* 指令简述*/
    createTime:"2021/12/6 15:41:12", /* 创建时间 */
    carryOutTime: "2021.12.8 15:15:32",/* 开始执行时间*/
    endTime:"2021/12/18 15:00:00", /*预计结束时间 */
    valueElectric: 4000,/* 电荷量 单位kw.h*/
    coin:"315.5", //积分数量
    contractCount :15, //合同数量
    progress:53, // 53/100 设置百分比  执行进度
    detail:"按照上级要求，为了满足各地供电需要，而进行的电力平衡措施！请各位尽力配合，非常感谢大家的热心合作！"
}
```

`返回参数`:`[状态2 参数错误]`
```javascript
{
   message: '表示参数错误信息！'
}
```

##### 8.2 /history/contracts(测试阶段 请于前端讨论)
`用于EChart展示每个合同的数值。`

|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`合同数值信息`|`/history/contracts`|`GET`|`200`|`无参数只会5XX错误。`|`查询指令下辖的合同信息`|

`请求参数`:`无`

`返回参数`
```javascript
{
    nodes: ['aa11', 'aa14', 'as45', 'aaa12', 'asd45', 'A12', 'DC12', 'ER15', 'hh123', 'we2','rr45'] //节点简称
    coins: [7.12, 8, 12, 21.5, 11, 15, 25, 7.15, 14.2, 28.5, 5], //积分
    electric:[100,110,140,215,115,141,255,100,200,400,75] //电荷量
}
```

##### 8.3 /history/calendar(测试阶段 请于前端讨论)
`用于展示指令的操作日历`

|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`操作日历`|`/history/calendar`|`GET`|`200`|`无参数只会5XX错误。`|`查询指令的操作历史`|

`请求参数`
```javascript
{
    index:5784,//指令编号 指令表主键
}
```

`返回参数`
```javascript
{
    /* 数组长度为 60 即 60天*/
    data:[
        {date:"2022/3/5", count: 5},
        {date:"2022/3/6", count: 0},
        {date:"2022/3/7", count: 1},
        {date:"2022/3/8", count: 4},
        /* .... */
    ]
}
```


`返回参数`:`[状态2 参数错误]`
```javascript
{
   message: '表示参数错误信息！'
}
```


##### 8.4 /history/life(测试阶段 请于前端讨论)
`指令生命周期操作`

|`接口名称`|`路由`|`Method 方法`|`正确状态码`|`错误状态码`|`说明`|
|:---|:---|:---|:---|:---|:---|
|`操作日历`|`/history/life`|`GET`|`200`|`无参数只会5XX错误。`|`指令生命周期操作`|

`请求参数`:`指令ID`
```javascript
{
   index: '12' /* 指令 id  */
}
```

`返回参数`:`[状态1 参数错误]`
```javascript
{
   message: '表示参数错误信息！'
}
```

`返回参数`:`[状态2 正确]按道理这个数组长度应该有 14`
```javascript
{
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
            /*....*/
            {
                name:"需求响应生成",
                operationDay:[
                    {
                        date:"2022-03-31",
                        operations:[
                            {
                                index: 10,
                                dateTime:"2022/3/31 16:05:0",
                                message:" 生成合同 编号(5142) 乙方节点编号：(aa11) 电荷量：500kw.h 预计积分量: 35.5",
                                result: true
                            },
                            {
                                index: 11,
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
                                index: 12,
                                dateTime:"2022-04-01 16:52:59",
                                message:" 节点 a154 aa12 aa48 aas45 aa11 响应电力互济广播！",
                                result: true
                            },
                            {
                                index: 13,
                                dateTime:"2022-04-01 17:55:14",
                                message: "生成合同 编号(5144) 乙方节点编号 aa45 电荷量：300kw.h 预计积分量: 21.3",
                                result: true
                            }
                        ]
                    }
                ]
            }, 
            {
                name:"积分发放",
                operationDay: []
            }
            /* ... */
        ]
}
```


-----
`创建时间`: `[2022/2/28 17:58]` 