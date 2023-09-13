const path = require('path');
const app = require('./app');

const userRouter = require('./Routers/User/index');
const systemRouter = require('./Routers/system');
const direction = require('./Routers/direction');
const contract = require('./Routers/contract');
const internet = require('./Routers/internet');
const block = require('./Routers/block');
const history = require('./Routers/history');

/* 路由注册 */
app.use('/user', userRouter);
app.use('/system',systemRouter);
app.use('/direction', direction);
app.use('/contract', contract);
app.use('/internet', internet);
app.use('/block', block);
app.use('/history', history);

app.get('/', (req, res, next)=> {
    res.sendFile(path.join(__dirname, 'public/index.html'), err => {
        if (err) next(err);
    });
});


app.use((req,res)=>{
    res.redirect('/static/404.html');
});


const PORT = 17001;

app.listen(PORT);

console.log('server is running at http://127.0.0.1:' + PORT);
