var express = require('express');
var router = express.Router();
var ecc = require('../../../help/ECC/ECC')
var help = require('../../../help/helper')
/*Edit Don Hang*/
router.get('/donhang',help.isLoggedIn, function(req, res, next) {
    res.render('side/user/donhang');
});
module.exports = router;