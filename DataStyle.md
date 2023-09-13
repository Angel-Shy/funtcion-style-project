### [二期项目数据结构设计](#)

------

#### [1. 交易需求表](#)
`存储交易需求信息的表格 ` `mysql 5.7`

|`字段名`|`类型`|`说明`|
|:----|:----|:----|
|`requirementId`|`long int`|`需求id 自增 pk`|
|`codeId`|`varchar(256)`|`编号`|
|`requirementType`|`enum 1,2`|`1 可以协商 2 不可以协商`|
|`transactionType`|`enum 3,2`|`3 电力交易 2 积分交易`|
|`cmdId`|`long int  forigen key `|`指令ID`|
|`endDateTime`|`datetime`|`需求有效截止时间 时间格式 2022/5/15 12:50:12`|
|`publishDateTime`|`datetime`|`发起时间  时间格式 2022/5/15 12:50:12`|
|`partyA`|`用户表_ID 外键`|`合同的甲方`|
|`partyACode`|`用户表 编号`|`合同的甲方编号`|
|`electricValue`|`decimal`|`电荷量`|
|`point`|`decimal`|`积分`|
|`electricUnit`|`varchar`|`单位`|
|`state`|`enum `|`状态 1 未撤销 2 撤销`|
|`leftElectricValue`|`decimal`|`剩余电荷`|
|`leftPoint`|`decimal`|`剩余积分`|


#### [2. 通知信息表](#)
`存储通知信息表`  `mysql 5.7`

|`字段名`|`类型`|`说明`|
|:----|:----|:----|
|`notificationId`|`long int `|`通知ID 自动 pk`|
|`sender`|`varchar`|`用户表主键 表示是哪个用户发出的消息 `|
|`recipient`|`varchar`|`用户表主键 表示消息是谁来接收`|
|`message`|`varchar`|`通知的信息`|
|`notificationType`|`enum int`|`通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息`|
|`state`|`enum int`|`1 已查看 2 未查看`|
|`publishDateTime`|`datetime`|`通知发出时间`|

#### [3. 交易合同表](#)
`存储交易合同信息的表格`  `mysql 5.7`

| `字段名称`               | `数据类型`                        | `意义解释`                                         |
|:---------------------|:------------------------------|:-----------------------------------------------|
| `transactionId`              | `bigint or int 自增类型 数据库主键 pk` | `唯一标识一个交易`                                     |
| `codeId`               | `string hash unique 展示作用`     | `存储在header里面 交易编号 唯一标识一个交易 制作方法 以index字符串形式为前缀 以时间为信息生成摘要` |
| `cmdId`        | `index 指令表主键`                 | `标识交易所属指令`                                     |
| `electricityValue`        | `decimal`                     | `电荷量`                                          |
| `requirementId`| `外键 所属需求`                  | `标书交易所属需求，需求指向一个指令`                            |
| `electricityUnit`    | `enum string 可能取值: kw.h`      | `用电量单位`                                        |
| `point`             | `decimal`                     | `积分量`                                          |
| `partyA`             | `用户表_ID 外键`                   | `合同的甲方`                                        |
| `partyB`             | `用户表_ID 外键`                   | `合同的乙方`                                        |
| `partyACode`         | `用户表 编号`                      | `合同的甲方编号`                                      |
| `partyBCode`         | `用户表 编号`                  | `合同的乙方编号`                                      |
| `type`               | `enum 合同类型`                   | `3 电力合同 / 2 积分合同`                             |
| `addTime`            | `datetime`                    | `合同创建时间`                                       |
| `partyASubscribe`    | `datetime`                    | `甲方签署时间`                                       |
| `partyBSubscribe`    | `datetime`                    | `乙方签署时间`                                       |
| `endTime`            | `datetime`                    | `签署截止时间`                                       |
| `expirationTime`     | `datetime`                    | `指令结束时间 就是交易过期时间`                              |
| `partyASignature`    | `string`                      | `签名`                                           |
| `partyBSignature`    | `string`                      | `签名`                                           |
| `directionStartTime` | `datetime`                    | `指令开始执行时间`                                     |
| `directionEndTime`   | `datetime`                    | `指令结束执行时间`                                     |
| `state`   | `enum 1. 正常 2. 已取消 3. 被拒绝`                    | `甲方没有签署之前，是可以撤销的`                                     |
| `reason` | `string` | `被拒绝的原因` |

