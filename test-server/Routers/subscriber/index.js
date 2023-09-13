let express = require('express');
let router = express.Router();

/* 登录了哦 */
router.post('/login', (req, res) => {
    let id = req.body.userId;
    let pwd = req.body.userPwd;

    console.log("请求参数：");
    console.log(req.body);

    if(id != 'admin' || pwd != '123456'){
        res.status(411).json({'message':'账号或者密码错误了！' });
        return;
    }
    res.cookie('token', '20221589645123');
    //返回一个token
    res.status(200).json({
        'tokens': '20221589645123',
        'timeout': (new Date(Date.now() + 600000)).toLocaleString()
    });
});

/*  注销啦  */
router.post('/logout', (req, res) => {
    console.log("/subscriber/logout 注销请求参数----------------------------");
    console.log(req.body);
    console.log("----------------------------");
    res.status(200).json({'ok': true});
});


/* 修改密码 */
 router.post('/alter', function (req, res) {
    console.log("/subscriber/alter 请求参数----------------------------");
    console.log(req.body);
    console.log("----------------------------");
    if(Math.ceil(Math.random() * 10) > 3){
        res.status(200).json({
            isOk: true
        }).end();
    }else{
        res.status(405).json({
            message: '我也不知道是什么错误，反正就是错误了！'
        }).end();
    }
});

/* 个人资产 */
router.get('/assets', function(req, res){
    console.log("/subscriber/alter 请求参数----------------------------");
    console.log("----------------------------");

    let userInfo = {
        id:2,
        codeId:'AAAA112',
        address:"上海市浦东新区浦东南路1888号浦东大酒店",
        points:125,
        freezingPoints:25,
        availablePoints:100,
        reputation:60,
        offLineTime:"0",
        electricityToBeExecuted:1500, //待执行电荷量
        electricityUnit: 'kw.h',
        states:"在线",
        phone:"028-85264432",
    }

    if(Math.ceil(Math.random() * 10) > 0){
        res.status(200).json(userInfo).end();
    }else{
        res.status(405).json({
            message: '你的token 已经过期，无法加载个人信息！'
        }).end();
    }
});

module.exports = router;
