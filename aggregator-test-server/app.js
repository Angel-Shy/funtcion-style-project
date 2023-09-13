const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon');
const path = require('path');
const morgan = require('morgan');

/* 开启跨域 */
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type,authentication-code,authorization");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
});

/* 请求体解析 */
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
express.text();

/*静态资源配置*/
app.use('/static',express.static('public')); //设置静态资源

/*cookie session*/
app.use(cookieParser());

app.use(favicon(path.join(__dirname, 'public', 'icon.png')));

//日志
app.use(morgan(':date :method :url :status :res[content-length] - :response-time ms'));

module.exports = app;
