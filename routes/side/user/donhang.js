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
module.exports = router;