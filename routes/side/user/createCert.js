var express = require('express');
var router = express.Router();
var ecc = require('../../../help/ECC/ECC')
/*Edit Don Hang*/
router.route('/cert/dangky')
    .get(function(req, res, next) {
        res.render('side/user/dangky_cert');
    })
    .post(function (req,res,next) {
       console.log(req.body)
    });
module.exports = router;
