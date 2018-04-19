var express = require('express');
var router = express.Router();
var ecc = require('../../../help/ECC/ECC')
var help = require('../../../help/helper')
var db_model = require('../../../model/db_model')
var db_listCert = require('../../../model/listCert')

/*Edit Don Hang*/
router.get('/donhang',help.isLoggedIn, function(req, res, next) {
    db_listCert.getCertUser(req.user.Id_user).then(function (result) {
        res.render('side/user/donhang',{user:req.user,ca:result});
    })
});

router.get('/donhang/:id',help.isLoggedIn, function(req, res, next) {
    let id = req.params.id
    db_listCert.getCertById(id).then(function (result) {
        delete result[0].id
        res.render('side/user/donHangDetail',{user:req.user,cert:result[0]});
    });
});

router.post('/donhang/update',help.isLoggedIn, function(req, res, next) {
    let data = req.body
    db_listCert.getCertById(data.Identity).then(function (result) {
        if(result.length!=0){
            db_listCert.updateCert(data.Identity,{validate:data.validate}).then(function (result) {
                res.json(true)
            }).catch(function (error) {
                res.json(false)
            })
        }
    });
});
module.exports = router;