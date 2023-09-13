module.exports = [
    {
        notificationId:1,
        senderCode: 'AAA111'	,
        recipientCode:'AAA112'	,
        message:"有人发出了新的交易需求"	,
        notificationType:3	,
        state:	2,
        publishDateTime:'2022/7/18 20:20:20'	
    },
    {
        notificationId:2,//long int	通知ID 自动 pk
        senderCode: 'AAA111'	,//	varchar	用户表主键 表示是哪个用户发出的消息
        recipientCode:'AAA113'	,//	varchar	用户表主键 表示消息是谁来接收
        message:"有人发不了新的交易需求"	,//	varchar	通知的信息
        notificationType:3	,//	enum int	通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息
        state:	2,//	enum int	1 已查看 2 未查看
        publishDateTime:'2022/7/18 20:20:20'	,//	datetime	通知发出时间
    },
    {
        notificationId:3,//long int	通知ID 自动 pk
        senderCode: 'AAA111'	,//	varchar	用户表主键 表示是哪个用户发出的消息
        recipientCode:'AAA113'	,//	varchar	用户表主键 表示消息是谁来接收
        message:"有人发不了新的交易需求"	,//	varchar	通知的信息
        notificationType:3	,//	enum int	通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息
        state:	2,//	enum int	1 已查看 2 未查看
        publishDateTime:'2022/7/18 20:20:20'	,//	datetime	通知发出时间
    },
    {
        notificationId:4,//long int	通知ID 自动 pk
        senderCode: 'AAA112'	,//	varchar	用户表主键 表示是哪个用户发出的消息
        recipientCode:'AAA114'	,//	varchar	用户表主键 表示消息是谁来接收
        message:"有人向你发起了积分合同"	,//	varchar	通知的信息
        notificationType:1	,//	enum int	通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息
        state:	2,//	enum int	1 已查看 2 未查看
        publishDateTime:'2022/7/18 20:20:20'	,//	datetime	通知发出时间
    },
    {
        notificationId:5,//long int	通知ID 自动 pk
        senderCode: 'AAA113'	,//	varchar	用户表主键 表示是哪个用户发出的消息
        recipientCode:'AAA116'	,//	varchar	用户表主键 表示消息是谁来接收
        message:"你的交易请求被拒绝了！"	,//	varchar	通知的信息
        notificationType:3	,//	enum int	通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息
        state:	2,//	enum int	1 已查看 2 未查看
        publishDateTime:'2022/7/19 20:20:20'	,//	datetime	通知发出时间
    },
    {
        notificationId:6,//long int	通知ID 自动 pk
        senderCode: 'AAA113'	,//	varchar	用户表主键 表示是哪个用户发出的消息
        recipientCode:'AAA121'	,//	varchar	用户表主键 表示消息是谁来接收
        message:"你的交易请求被拒绝了！"	,//	varchar	通知的信息
        notificationType:4	,//	enum int	通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息
        state:	2,//	enum int	1 已查看 2 未查看
        publishDateTime:'2022/7/21 07:53:85'	,//	datetime	通知发出时间
    },
    {
        notificationId:7,//long int	通知ID 自动 pk
        senderCode: 'AAA113'	,//	varchar	用户表主键 表示是哪个用户发出的消息
        recipientCode:'AAA119'	,//	varchar	用户表主键 表示消息是谁来接收
        message:"你的交易请求被拒绝了！"	,//	varchar	通知的信息
        notificationType:4	,//	enum int	通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息
        state:	2,//	enum int	1 已查看 2 未查看
        publishDateTime:'2022/7/21 07:53:85'	,//	datetime	通知发出时间
    },
    {
        notificationId:8,//long int	通知ID 自动 pk
        senderCode: 'AAA113'	,//	varchar	用户表主键 表示是哪个用户发出的消息
        recipientCode:'AAA117'	,//	varchar	用户表主键 表示消息是谁来接收
        message:"有人发出了新的交易需求"	,//	varchar	通知的信息
        notificationType:3	,//	enum int	通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息
        state:	2,//	enum int	1 已查看 2 未查看
        publishDateTime:'2022/7/21 07:53:85'	,//	datetime	通知发出时间
    },
    {
        notificationId:9,//long int	通知ID 自动 pk
        senderCode: 'AAA113'	,//	varchar	用户表主键 表示是哪个用户发出的消息
        recipientCode:'AAA117'	,//	varchar	用户表主键 表示消息是谁来接收
        message:"有人发出了新的交易需求"	,//	varchar	通知的信息
        notificationType:3	,//	enum int	通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息
        state:	2,//	enum int	1 已查看 2 未查看
        publishDateTime:'2022/7/21 07:53:85'	,//	datetime	通知发出时间
    },
    {
        notificationId:10,//long int	通知ID 自动 pk
        senderCode: 'AAA113'	,//	varchar	用户表主键 表示是哪个用户发出的消息
        recipientCode:'AAA117'	,//	varchar	用户表主键 表示消息是谁来接收
        message:"有人发出了新的交易需求"	,//	varchar	通知的信息
        notificationType:3	,//	enum int	通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息
        state:	2,//	enum int	1 已查看 2 未查看
        publishDateTime:'2022/7/21 07:53:85'	,//	datetime	通知发出时间
    },
    {
        notificationId:11,//long int	通知ID 自动 pk
        senderCode: 'AAA113'	,//	varchar	用户表主键 表示是哪个用户发出的消息
        recipientCode:'AAA111'	,//	varchar	用户表主键 表示消息是谁来接收
        message:"有人发出了新的交易需求"	,//	varchar	通知的信息
        notificationType:3	,//	enum int	通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息
        state:	2,//	enum int	1 已查看 2 未查看
        publishDateTime:'2022/7/21 07:53:85'	,//	datetime	通知发出时间
    },
    {
        notificationId:12,//long int	通知ID 自动 pk
        senderCode: 'AAA113'	,//	varchar	用户表主键 表示是哪个用户发出的消息
        recipientCode:'AAA125'	,//	varchar	用户表主键 表示消息是谁来接收
        message:"有人发出了新的交易需求"	,//	varchar	通知的信息
        notificationType:3	,//	enum int	通知类型 1 有人向你发起积分合同 2 有人向你发起了电力合同 3 新的交易需求 4 拒绝信息
        state:	2,//	enum int	1 已查看 2 未查看
        publishDateTime:'2022/7/21 07:53:85'	,//	datetime	通知发出时间
    },

];