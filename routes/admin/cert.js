var express = require('express');
var router = express.Router();
var db_listCert = require('../../model/listCert')

/* GET admin home page. */
router.route('/cert/:id')
    .get( function(req, res, next) {
        let idCert = req.params.id
        db_listCert.getCertById(idCert)
            .then(function (cert) {
                delete cert[0].id
                res.render('admin/cert/certDetail',{cert:cert[0]});
            })
            .catch(function (error) {
        
            })
    })
    .post(function (req, res, next) {
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
    })
;

module.exports = router;
