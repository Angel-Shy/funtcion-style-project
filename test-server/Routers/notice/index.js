let express = require('express');
let router = express.Router();

let notifications = require('./notifications.js');
let notification_ts = require('./notices.js');
const notices = require('./notices.js');

router.post('/notifications', function(req, res){
    console.log('notifications:检索条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('notifications:检索条件: ----------------------------- |'  );
    //我只要页数
    console.log(req.body.count,req.body.pageIndex);    

    //pageIndex 从 1 开始
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;

    //筛查
    let dataFilter = notifications.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    })

    let pageCount = Math.ceil(notifications.length / count);

    res.status(200).json({
        total:notifications.length,
        data:dataFilter,
        pageCount
    });
});


router.get('/waiting',  function(req, res){
    console.log('waiting: 路由 ----------------------------- |'  );

    //筛查
    let dataFilter = notification_ts.filter((obj, i)=> {
        if(obj.state == 2){
            return obj;
        }
    })

    res.status(200).json({
        notifications:dataFilter,
        count:dataFilter.length
    });
});

router.delete('/delete',  function(req, res){
    console.log('delete: 条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('delete: 条件: ----------------------------- |'  );
    //筛查

    if(Math.ceil(Math.random() * 10) > 0){

        if(req.body.deleteType == 'Single'){
            let not = notification_ts.findIndex( v => v.notificationId == req.body.notificationId);
            if(not != null){
                notification_ts.splice(not, 1);   
            }
        }
        if(req.body.deleteType == 'All'){
            notification_ts = [];
        }

        res.status(200).json({
            isOk: true
        });
    }else{
        res.status(417).json({
            message: "该消息已经被删除了！"
        });
    }
});





module.exports = router;