const path = require('path');
const app = require('./app');

const subscriberRouter = require('./Routers/subscriber');
const tradeRouter = require('./Routers/trade');
const directionRouter = require('./Routers/direction');
const requirementRouter = require('./Routers/requirement');
const transactionRouter = require('./Routers/transaction');
const notificationsRouter = require('./Routers/notice');
const dashBoardRouter = require('./Routers/dashboard');

/* 路由注册 */
app.use('/subscriber', subscriberRouter);9
app.use('/trade', tradeRouter);
app.use('/direction', directionRouter);
app.use('/requirement', requirementRouter);
app.use('/transaction', transactionRouter);
app.use('/notice', notificationsRouter);
app.use('/dashboard', dashBoardRouter);

app.get('/', (req, res, next)=> {
    res.sendFile(path.join(__dirname, 'public/index.html'), err => {
        if (err) next(err);
    });
});


app.use((req,res)=>{
    res.redirect('/static/404.html');
});


const PORT = 17002;

app.listen(PORT);

console.log('server is running at http://127.0.0.1:' + PORT);
