var express = require('express')
var router = express.Router()

/**
 * /user/about
 */
router.get('/about', function (req, res) {
    res.send('About birds');
})

/**
 * /user/login
 */
router.post('/login', (req, res) => {
    let pwd = req.body.userPwd;
    let id = req.body.userId;
    if(id != 'admin' || pwd != '123456'){
        res.status(411).json({message:'账号或者密码错误！' }).end();
        return;
    }
    //返回一个token
    res.status(200).json({token: '201611418', code : 200}).end();
});


module.exports = router




