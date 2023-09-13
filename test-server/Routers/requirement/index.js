let express = require('express');
let router = express.Router();

let requirements = require('./requirements.js');
let kickerRequirements = require('../trade/requirements.js');

router.post('/requirements', function(req, res){
    console.log('requirements:检索条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('requirements:检索条件: ----------------------------- |'  );
    //我只要页数
    console.log(req.body);

    //pageIndex 从 1 开始
    let count = req.body.count;
    let pageIndex = req.body.pageIndex - 1;

    //筛查
    let dataFilter = requirements.filter((obj, i)=> {
        if( i >= pageIndex * count && i < (pageIndex + 1)* count){
            return obj;
        } 
    })

    let pageCount = Math.ceil(requirements.length / count);

    res.status(200).json({
        total:requirements.length,
        data:dataFilter,
        pageCount
    });
});

router.delete('/revoke', function(req, res){
    console.log('revoke:检索条件: ----------------------------- |'  );
    console.log(req.body);
    console.log('revoke:检索条件: ----------------------------- |'  );

    if(Math.ceil(Math.random() * 10) > 3){
        let not = kickerRequirements.findIndex( v => v.requirementId == req.body.requirementId);
        if(not != null){
            kickerRequirements.splice(not, 1);   
        }
        res.status(200).json({
            isOk: true
        }).end();
    }else{
        res.status(417).json({
            message: '无法删除，该需求已经产生了的交易！'
        }).end();
    }

});

//获得自己的需求
router.get('/yours', function(req, res){
    //筛查
    console.log('requirement/yours:检索条件: ----------------------------- |'  );
    console.log(req.query);
    console.log('requirement/yours:检索条件: ----------------------------- |'  );
    let dataFilter = requirements.map((obj, idx, ary)=> {
        return {
            requirementId: obj.requirementId,
            codeId: obj.codeId
        };
    })

    res.status(200).json({
        total:dataFilter.length,
        data:dataFilter,
    });
});

//获取非自己发布的需求
router.get('/others', function(req, res){
    console.log('requirement/others:检索条件: ----------------------------- |'  );
    console.log(req.query);
    console.log('requirement/others:检索条件: ----------------------------- |'  );
   

    let dataFilter = requirements.map((obj, idx, ary)=> {
        return {
            requirementId: obj.requirementId,
            codeId: obj.codeId
        };
    })

    res.status(200).json({
        total:dataFilter.length,
        data:dataFilter,
    });
});



module.exports = router;