var express = require('express');
var router = express.Router();
var db_listCert = require('../../model/listCert')

/* GET admin home page. */
router.get(['/home','/cert'], function(req, res, next) {
    db_listCert.getListPopularCert()
        .then(function (certs) {
            console.log(certs)
            res.render('admin/home',{cert:certs});
        })
        .catch(function (error) {
            console.log(error)
        })
});

module.exports = router;
